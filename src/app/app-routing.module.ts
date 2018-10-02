import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Vgg16Component } from './vgg16/vgg16.component';
import { HomeComponent } from './home/home.component';
import { Vgg19Component } from './vgg19/vgg19.component';
import { ResNetComponent } from './res-net/res-net.component';
import { InceptionComponent } from './inception/inception.component';
import { DenseNet121Component } from './dense-net121/dense-net121.component';
import { DenseNet169Component } from './dense-net169/dense-net169.component';
import { AllModelsComponent } from './all-models/all-models.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'vgg16', component: Vgg16Component },
  { path: 'vgg19', component: Vgg19Component },
  { path: 'resNet', component: ResNetComponent },
  { path: 'inception', component: InceptionComponent },
  { path: 'denseNet121', component: DenseNet121Component },
  { path: 'denseNet169', component: DenseNet169Component },
  { path: 'allModels', component: AllModelsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
