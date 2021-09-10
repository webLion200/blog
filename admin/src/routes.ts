import { lazy } from 'react';
import type { RouteConfig } from 'react-router-config';
const Login = lazy(() => import('./views/login'));
const Register = lazy(() => import('./views/register'));
const NoteBooks = lazy(() => import('./views/notebooks'));

const routeConfig: RouteConfig[] = [
  // 注册页
  {
    path: '/',
    exact: true,
    component: NoteBooks,
  },
  {
    name: '登录',
    path: '/login',
    component: Login,
    exact: true
  },
  // 注册页
  {
    name: '注册',
    path: '/register',
    component: Register,
  },
  // 首页
  {
    path: '/notebooks',
    component: NoteBooks
  },
];

export default routeConfig;
