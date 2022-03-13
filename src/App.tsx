import React from 'react';
import './App.css';
import {DashboardLayout} from "./layout/dashboard/DashboardLayout";
import {PublicLayout} from "./layout/public/PublicLayout";
import {useSelector} from "react-redux";
import {StateApp} from "./redux/Types";
import {Login} from "./layout/public/Login";
import {Crud} from "./components/Crud";
import {Menus} from "./api/backend/Menus";
import {MenuCreate, MenuResponse} from "./api/Types";

function App() {

    const auth = useSelector(({auth}: StateApp) => auth)
    const controller = new Menus();

    return (
        <>
            {auth && auth.user ?
                <DashboardLayout>
                    <Crud<Menus, MenuResponse, MenuCreate> controller={controller} />
                </DashboardLayout> :
                <PublicLayout>
                    <Login/>
                </PublicLayout>
            }
        </>
    );
}

export default App;
