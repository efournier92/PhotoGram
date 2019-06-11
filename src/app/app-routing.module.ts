import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { GalleryComponent } from './components/gallery/gallery.component';

const routes: Routes =
  [
    {
      path: '',
      component: GalleryComponent,
    },
    {
      path: 'auth',
      component: AuthComponent,
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
