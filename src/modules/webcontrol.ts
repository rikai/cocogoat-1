/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-params */
import mitt from 'mitt'
import { stringify } from 'qs'
import Fly from 'flyio/dist/npm/fly'
import type { Fly as FlyType, FlyError } from 'flyio'
export interface IWindow {
    hWnd: number
    title: string
    classname: string
    width: number
    height: number
    x: number
    y: number
}
export class CocogoatWebControl {
    port = 32333
    token = ''
    hwnd = 0
    version = ''
    ev = mitt()
    client: FlyType = new Fly()
    ws: WebSocket | undefined
    MOUSEEVENTF_ABSOLUTE = 0x8000
    MOUSEEVENTF_LEFTDOWN = 0x0002
    MOUSEEVENTF_LEFTUP = 0x0004
    MOUSEEVENTF_MIDDLEDOWN = 0x0020
    MOUSEEVENTF_MIDDLEUP = 0x0040
    MOUSEEVENTF_MOVE = 0x0001
    MOUSEEVENTF_RIGHTDOWN = 0x0008
    MOUSEEVENTF_RIGHTUP = 0x0010
    MOUSEEVENTF_WHEEL = 0x0800
    MOUSEEVENTF_XDOWN = 0x0080
    MOUSEEVENTF_XUP = 0x0100
    MOUSEEVENTF_HWHEEL = 0x01000
    constructor(_port = 32333) {
        this.port = _port
        this.client.config.baseURL = `http://localhost:${this.port}`
        this.client.interceptors.request.use((request) => {
            if (this.token) {
                request.headers['Authorization'] = `Bearer ${this.token}`
            }
            if (request.headers['Content-Type'] === '') {
                delete request.headers['Content-Type']
            }
            return request
        })
        this.client.interceptors.response.use(undefined, (e) => {
            const er = e as unknown as FlyError
            if (er.status === 410) {
                console.warn('Control stopped by user')
                return new Error('ECANCEL')
            }
            return e
        })
    }
    async check(): Promise<boolean> {
        try {
            const { data } = await this.client.get(
                '/',
                {},
                {
                    timeout: 800,
                },
            )
            this.version = data.version
            return true
        } catch (e) {
            return false
        }
    }
    async authorize() {
        if (this.ws) {
            return true
        }
        try {
            const { data } = await this.client.post('/token')
            this.token = data.token
            this.hwnd = data.hwnd || 0
            const ws = new WebSocket(`ws://localhost:${this.port}/ws/${this.token}`)
            ws.onmessage = (e) => {
                const data = JSON.parse(e.data)
                this.ev.emit(data.id || data.action, data.data)
            }
            ws.onclose = () => {
                this.ws = undefined
            }
            await new Promise((resolve) => {
                ws.onopen = resolve
            })
            this.ws = ws
            return true
        } catch (e) {
            const er = e as FlyError
            if (er.status === 401) {
                return false
            }
            throw e
        }
    }
    wsInvoke(method: string, path: string, querystring?: Record<string, any>) {
        if (!this.ws) throw new Error('WebSocket not connected')
        const url = path + (querystring ? `?${stringify(querystring)}` : '')
        const id = Math.round(Date.now() * 1000 + Math.random() * 1000).toString(16)
        const reqjson = {
            id,
            action: 'api',
            data: {
                url,
                method,
            },
        }
        const resp = new Promise((resolve) => {
            this.ev.on(id, resolve)
        })
        this.ws.send(JSON.stringify(reqjson))
        return resp as Promise<{
            status: number
            body: any
        }>
    }
    async mouse_event(dwFlags: number, dx: number, dy: number, dwData: number, repeat = 1) {
        return this.wsInvoke('POST', '/api/mouse_event', {
            dwFlags,
            dx,
            dy,
            dwData,
            repeat,
        })
    }
    async keybd_event(bVk: number, bScan: number, dwFlags: number) {
        return this.wsInvoke('POST', '/api/keybd_event', {
            bVk,
            bScan,
            dwFlags,
        })
    }
    async sendMessage(hWnd: number, Msg: number, wParam: number, lParam: number) {
        return this.wsInvoke('POST', '/api/SendMessage', {
            hWnd,
            Msg,
            wParam,
            lParam,
        })
    }
    async SetCursorPos(x: number, y: number) {
        return this.wsInvoke('POST', '/api/SetCursorPos', {
            x,
            y,
        })
    }
    async listWindows(): Promise<IWindow[]> {
        return (await this.wsInvoke('GET', '/api/windows')).body
    }
    async getWindow(id: number): Promise<IWindow> {
        return (await this.wsInvoke('GET', '/api/windows/' + id)).body
    }
    async activeWindow(id: number) {
        return await this.wsInvoke('PATCH', '/api/windows/' + id)
    }
    async getMonitor(): Promise<IWindow> {
        return (await this.wsInvoke('GET', '/api/monitors')).body
    }
    async toAbsolute(
        hWnd: number,
        x: number,
        y: number,
        { dx = 1, dy = 1, window = null as IWindow | null } = { dx: 1, dy: 1, window: null as IWindow | null },
    ) {
        const win = window || (await this.getWindow(hWnd))
        const xdelta = dx === 1 ? 1 : win.width / dx
        const ydelta = dy === 1 ? 1 : win.height / dy
        return { x: x * xdelta + win.x, y: y * ydelta + win.y, win }
    }
}
