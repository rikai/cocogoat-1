import * as localStorageImpl from './impl/localStorage'
import { debouncedSingleSync } from './sync'
export function get(user: string) {
    return localStorageImpl.get(user)
}
export function set(user: string, data: unknown) {
    const now = new Date()
    const last = localStorageImpl.set(user, data, now)
    debouncedSingleSync({ user, data, now, last })
}
export function del(user: string) {
    const now = new Date()
    const last = localStorageImpl.del(user)
    debouncedSingleSync({ user, data: null, now, last })
}
export function list() {
    return localStorageImpl.list()
}
export function currentUser(user?: string): string {
    const now = new Date()
    if (user) {
        const [_user, last] = localStorageImpl.currentUser(user, now)
        debouncedSingleSync({ user: 'currentUser', data: _user, now, last })
    }
    return localStorageImpl.currentUser(user, now)[0]
}
