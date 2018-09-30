import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Vgg16Component } from './vgg16/vgg16.component';
import { HomeComponent } from './home/home.component';
import { Vgg19Component } from './vgg19/vgg19.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'vgg16', component: Vgg16Component },
  { path: 'vgg19', component: Vgg19Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
