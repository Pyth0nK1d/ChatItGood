import { ActionReducerMap } from '@ngrx/store';
import { IAppStore } from '../IAppStore';
import { routerReducer } from '@ngrx/router-store';

export const RootReducer: ActionReducerMap<IAppStore> = {
    routerState: routerReducer,
};