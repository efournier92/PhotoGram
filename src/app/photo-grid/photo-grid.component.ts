import { Component, OnInit } from '@angular/core';
import { Photos } from './photo/sample-photos';
import { Photo } from './photo/photo';

@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss']
})
export class PhotoGridComponent implements OnInit {
  allPhotos: Photo[] = Photos;

  constructor() { }

  ngOnInit() {
  }
}
