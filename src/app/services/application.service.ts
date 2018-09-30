import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) { }

  onUpload(fileSelected) {
    const file = fileSelected;
    const filePath = '/test/';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);


    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
   
    console.log(this.uploadPercent);
    return fileRef.getDownloadURL();

  }
}
