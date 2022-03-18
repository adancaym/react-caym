import { RouteCustom } from '../index';
import { PublicLayout } from '../../layout/public/PublicLayout';
import { Login } from '../../layout/public/Login';


export const PublicRoutes: RouteCustom[] = [
    {
        label: "Inicio",
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                index: true, element: <Login />
            }
        ]
    }
]