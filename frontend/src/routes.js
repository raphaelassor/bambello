import { Home } from './pages/Home'
import { Workspace } from './pages/Workspace'
import { LoginSignup } from './pages/LoginSignup'
import { BoardApp } from './pages/BoardApp'

export const routes = [
    {
        path: '/board/:boardId',
        component: BoardApp,
    },
    {
        path: '/login',
        component: LoginSignup,
    },
    {
        path: '/signup',
        component: LoginSignup,
    },
    {
        path: '/workspace',
        component: Workspace,
    },
    {
        path: '/',
        component: Home,
    }
]