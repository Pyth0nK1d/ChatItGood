import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  public getImage(imagename: string): Observable<any> {
    return this.storage.ref(imagename).getDownloadURL();
  }

  public createImage(path: string, file: any, metadata?: any){
    return this.storage.upload(path, file, {customMetadata: metadata});
  }
}
