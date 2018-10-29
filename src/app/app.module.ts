import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Vgg16Component } from './vgg16/vgg16.component';
import { HomeComponent } from './home/home.component';
import { ApplicationService } from './services/application.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Vgg19Component } from './vgg19/vgg19.component';
import { ResNetComponent } from './res-net/res-net.component';
import { InceptionComponent } from './inception/inception.component';
import { DenseNet121Component } from './dense-net121/dense-net121.component';
import { DenseNet169Component } from './dense-net169/dense-net169.component';
import { AllModelsComponent } from './all-models/all-models.component';
import { Cifar100Component } from './cifar100/cifar100.component';
import { Cifar10Component } from './cifar10/cifar10.component';
import { TransferModelComponent } from './transfer-model/transfer-model.component';

@NgModule({
  declarations: [
    AppComponent,
    Vgg16Component,
    HomeComponent,
    Vgg19Component,
    ResNetComponent,
    InceptionComponent,
    DenseNet121Component,
    DenseNet169Component,
    AllModelsComponent,
    Cifar100Component,
    Cifar10Component,
    TransferModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModulesPro.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
    
  ],
  providers: [ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
