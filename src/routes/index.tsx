import type { RouteObject } from "react-router-dom";
import { Dashboarroutes } from './dashboard/DashboardRoutes';
import { PublicRoutes } from './public/PublicRoutes';

export interface RouteCustom extends RouteObject {
    label: string
    path: string,
}


export const routes: RouteCustom[] = [
    ...PublicRoutes,
    ...Dashboarroutes
];