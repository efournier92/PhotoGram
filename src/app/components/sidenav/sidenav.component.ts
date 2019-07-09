import { Component, OnInit, Input } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  allPhotos: Photo[] = new Array<Photo>();
  user: User;

  constructor(
    private photoService: PhotoService,
  ) { }

  ngOnInit(): void {

  }
}
