import {Crud} from "../../components/Crud";
import {Menus} from "../../api/backend/Menus";
import {GroupCreate, GroupResponse, MenuCreate, MenuResponse, UserCreate, UserFull} from "../../api/Types";
import {Users} from "../../api/backend/Users";
import {Groups} from "../../api/backend/Groups";

export const CrudMenus = ()=> <Crud<Menus, MenuResponse, MenuCreate> controller={new Menus()}/>
export const CrudUsers = ()=> <Crud<Users, UserFull, UserCreate> controller={new Users()} />
export const CrudGroups = ()=> <Crud<Groups, GroupResponse, GroupCreate> controller={new Groups()}/>
