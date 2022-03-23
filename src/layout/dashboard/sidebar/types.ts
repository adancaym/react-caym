export interface ShowProps {
    show: boolean;
}
export interface MatchProps {
    match: boolean;
}

export interface NavigationProps extends ShowProps {
    submenu?: boolean;
}
