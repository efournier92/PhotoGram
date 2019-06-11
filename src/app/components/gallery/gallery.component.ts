import { Component, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';
import { ConfirmPromptService } from '../input-prompt/input-prompt.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class PhotoGridComponent implements OnInit {
  allPhotos: Photo[];
  user: User;

  constructor(
    private photoService: PhotoService,
    private authService: AuthService,
    private confirmPrompt: ConfirmPromptService,
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

  onInputFileChange(files: any): voidw {
    this.promptForPhotoDescription(files);
  }

  promptForPhotoDescription(files: any): void {
    const dialogRef = this.confirmPrompt.openDialog(
      "",
    );
    dialogRef.afterClosed().subscribe(
      (photoDescription: string) => {
        this.photoService.uploadPhoto(files[0], photoDescription);
      }
    )
  }
}
