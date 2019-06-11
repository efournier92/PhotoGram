import { Component, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';
import { InputPromptService } from '../input-prompt/input-prompt.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  allPhotos: Photo[];
  user: User;

  constructor(
    private photoService: PhotoService,
    private authService: AuthService,
    private inputPrompt: InputPromptService,
  ) { }

  ngOnInit(): void {
    this.authService.currentUserObservable.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.loadAllPhotos();
  }

  loadAllPhotos(): void {
    this.photoService.allPhotosObservable.subscribe(
      (photos: Photo[]) => {
        this.allPhotos = photos;
      }
    );
  }

  onInputFileChange(files: any): void {
    this.promptForPhotoDescription(files);
  }

  promptForPhotoDescription(files: any): void {
    const dialogRef = this.inputPrompt.openDialog();
    dialogRef.afterClosed().subscribe(
      (photoDescription: string) => {
        this.photoService.uploadPhoto(files[0], photoDescription);
      }
    )
  }
}
