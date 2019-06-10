import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Photo } from '../models/photo';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../models/user';

export interface PhotoUpload {
  photo: Photo;
  task: AngularFireUploadTask;
  onUrlAvailable: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  allPhotos: AngularFireList<Photo>;
  user: User;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {
    this.authService.userObservable.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
  }

  private allPhotosSource: BehaviorSubject<Photo[]> = new BehaviorSubject([]);
  allPhotosObservable: Observable<Photo[]> = this.allPhotosSource.asObservable();

  updateAllPhotosEvent(photos: Photo[]): void {
    this.allPhotosSource.next(photos);
  }

  getAllPhotos(): AngularFireList<Photo> {
    this.allPhotos = this.db.list('photos');
    return this.allPhotos;
  }

  createPhoto(photoFile: any): void {
    let photo = new Photo();
    photo.id = this.db.createPushId();
    photo.ownerId = "";
    photo.description = 'Test Photo';
    this.updatePhoto(photo);
  }

  updatePhoto(photo: Photo): void {
    let photosDb = this.db.list('photos');
    photosDb.update(photo.id, photo);
  }

  deletePhoto(photo: Photo): void {
    this.allPhotos.remove(photo.id);
    this.storage.storage.refFromURL(photo.url).delete();
  }

  uploadPhoto(file: any, description: string): PhotoUpload {
    let photo: Photo = new Photo();
    const fileExtension = file.name.split('.').pop();
    photo.id = this.db.createPushId();
    photo.ownerId = "";
    photo.description = description;
    photo.path = `photos/${photo.id}.${fileExtension}`;

    const fileRef: AngularFireStorageReference = this.storage.ref(photo.path);
    const task: AngularFireUploadTask = this.storage.upload(photo.path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(
          url => {
            const photosDb: AngularFireList<Object> = this.db.list('photos');
            photo.url = url;
            photosDb.update(photo.id, photo);
            photoUploadSource.next(url);
          }
        )
      })
    ).subscribe()

    const photoUploadSource = new BehaviorSubject('');
    const onUrlAvailable = photoUploadSource.asObservable();

    let upload = new Object as PhotoUpload;
    upload.task = task;
    upload.photo = photo;
    upload.onUrlAvailable = onUrlAvailable;

    return upload;
  }
}
