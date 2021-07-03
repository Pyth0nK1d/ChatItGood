import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnDemandPreloadService {

  private subject = new Subject<OnDemandPreloadOptions>();

  // Obtenemos el Observable de nuestro Subject
  state = this.subject.asObservable();

  constructor() { }

  // Obtener las opciones de Precarga de una determinada ruta
  onDemandPreload(routePath: string){
    const preloadOptions = new OnDemandPreloadOptions(routePath, true);
    this.subject.next(preloadOptions);
  }



}

// Clase de precarga
export class OnDemandPreloadOptions {
  constructor(public routePath: string, public preload: boolean = true){}
}
