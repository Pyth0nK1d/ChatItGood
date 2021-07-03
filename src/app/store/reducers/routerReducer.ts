import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import IRouterState from "../state/IRouterState";

export interface State {
    router: RouterReducerState<IRouterState>;
}

export const rootReducer: ActionReducerMap<State> = {
    router: routerReducer,
}