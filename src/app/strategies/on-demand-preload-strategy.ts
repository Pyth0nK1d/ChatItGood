import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { OnDemandPreloadOptions, OnDemandPreloadService } from '../services/preload-modules-strategy/on-demand-preload.service';

/**
 * Esta es una estrategia de precargado de módulos para aquellas rutas
 * que dispongan de una clave "data" con un valor a true dentro de "preload"
 * 
 * Es decir, sirve para precargar los módulos con preload a true.
 */


 @Injectable({ // Debe ser inyectable para recibir los preload
    providedIn: 'root',
    deps: [OnDemandPreloadService]
})
export class OnDemandPreloadStrategy implements PreloadingStrategy {


    private preloadOptions$: Observable<OnDemandPreloadOptions>;

    constructor(private onDemandPreloadService: OnDemandPreloadService){
        this.preloadOptions$ = this.onDemandPreloadService.state;
    }





    preload(route: Route, load: () => Observable<any>): Observable<any> {
        
        return this.preloadOptions$.pipe(
            mergeMap(
                preloadOptions => {
                    const shouldPreload = this._checkPathPreload(route, preloadOptions);
                    // Sacamos por consola si precargamos o no las rutas
                    console.log(`${shouldPreload ? '' : 'NO'} PRECARGAMOS ${route.path}`);

                    return shouldPreload ? load() : EMPTY;
                }
            )
        )

    }


    private _checkPathPreload(route: Route, preloadOptions: OnDemandPreloadOptions) {
        return (
            route.data &&
            route.data.preload &&
            [route.path, '*'].includes(preloadOptions.routePath) &&
            preloadOptions.preload
        )
    }



}

