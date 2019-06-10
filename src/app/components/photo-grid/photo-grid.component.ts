import { Component, OnInit } from '@angular/core';
import { Photos } from '../../models/sample-photos';
import { Photo } from '../../models/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';
import { ConfirmPromptService } from '../input-prompt/input-prompt.service';

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
    private confirmPrompt: ConfirmPromptService,
  ) { }

  ngOnInit() {
    this.authService.userObservable.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.loadAllPhotos();
  }

  loadAllPhotos(): void {
    this.photoService.getAllPhotos().valueChanges().subscribe(
      (photos: Array<Photo>) => {
        this.allPhotos = photos;
        console.log('photos', this.allPhotos);
      }
    );
  }

  onInputFileChange(files: any) {
    this.promptForPhotoDescription(files);
  }

  promptForPhotoDescription(files: any): void {
    const dialogRef = this.confirmPrompt.openDialog(
      "",
    );
    dialogRef.afterClosed().subscribe(
      (confirmedAction: boolean) => {
        if (confirmedAction) {
          this.photoService.uploadPhoto(files[0], "");
        }
      }
    )
  }
}
