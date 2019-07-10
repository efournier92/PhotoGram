import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Photo } from '../models/photo';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
  ) {
    // this.loadAllPhotos();
  }

  // loadAllPhotos(): AngularFireList<Photo> {
  //   this.allPhotos = this.db.list('photos');
  //   this.allPhotos.valueChanges().subscribe(
  //     (photos: Photo[]) => {
  //       if (photos.length > 0)
  //         this.updateAllPhotos(photos);
  //     }
  //   )
  //   return this.allPhotos;
  // }

  uploadPhoto(file: any, description: string): PhotoUpload {
    let photo: Photo = new Photo();
    photo.id = this.db.createPushId();
    photo.description = description;
    const fileExtension = file.name.split('.').pop();
    const photoPath = `photos/${photo.id}.${fileExtension}`;
    const fileRef: AngularFireStorageReference = this.storage.ref(photoPath);
    const task: AngularFireUploadTask = this.storage.upload(photoPath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(
          (url: string) => {
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
