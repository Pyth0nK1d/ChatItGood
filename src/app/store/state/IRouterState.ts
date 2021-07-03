import { Params } from "@angular/router";

export default interface IRouterState {
    url: string;
    queryParams: Params;
    params: Params;
}