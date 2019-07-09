import { Component, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';
import { PhotoService } from 'src/app/services/photo.service';
import { User } from '../../models/user';
import { InputPromptService } from '../input-prompt/input-prompt.service';
import { SamplePhotos } from 'src/app/models/sample-photos';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  user: User;
  allPhotos: Photo[] = SamplePhotos;

  constructor(
    private photoService: PhotoService,
    private inputPrompt: InputPromptService,
  ) { }

  ngOnInit(): void {

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
