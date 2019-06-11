import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent implements OnInit {
  @Input()
  allPhotos: Photo[];
  user: User;

  constructor(
    private authService: AuthService,
    private photoService: PhotoService,
  ) { }

  ngOnInit() {
    this.photoService.allPhotosObservable.subscribe(
      (photos: Photo[]) => this.allPhotos = photos
    )
  }
}
