import {DashboardLayout} from '../../layout/dashboard/DashboardLayout';
import {RouteCustom} from '../index';

import {CrudGroups, CrudMenus, CrudUsers} from "./Cruds";


export const Dashboarroutes: RouteCustom[] = [
    {
        label: 'Inicio',
        path: '/admin',
        element: <DashboardLayout/>,
        children: [
            {
                index: true, element: <h1>Inicio</h1>
            },
            {
                path: 'menus', element: <CrudMenus/>
            },
            {
                path: 'users', element: <CrudUsers/>
            },
            {
                path: 'groups', element: <CrudGroups/>
            },
        ]

    }
]
