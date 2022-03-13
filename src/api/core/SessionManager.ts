
export class SessionManager {

    getItem(key: string): any {
        const item = sessionStorage.getItem(key);
        if (item) return JSON.parse(item)
        else return null;
    }

    setItem(key: string, item: any): void {
        return sessionStorage.setItem(key, JSON.stringify(item))
    }

    getToken(): string {
        const state = this.getItem('state')
        return state.auth?.token || '';
    }
}
