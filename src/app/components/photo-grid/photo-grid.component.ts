import { Component, OnInit } from '@angular/core';
import { Photos } from '../photo/sample-photos';
import { Photo } from '../photo/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../auth/user';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss']
})
export class PhotoGridComponent implements OnInit {
  allPhotos: Photo[] = Photos;
  user: User;

  constructor(
    private photoService: PhotoService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.userObservable.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.loadAllPhotos();
  }

  onInputFileChange(files: any) {
    this.photoService.uploadPhoto(files[0], "");
  }

  loadAllPhotos(): void {
    this.photoService.getAllPhotos().valueChanges().subscribe(
      (photos: Array<Photo>) => {
        // this.allPhotos = photos;
        console.log('photos', this.allPhotos);
      }
    );
  }
}
