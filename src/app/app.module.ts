import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule,
} from '@angular/material';
import { PhotoComponent } from './components/photo/photo.component';


@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
