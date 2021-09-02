import { lazy } from 'react';
import type { RouteConfig } from 'react-router-config';
const Login = lazy(() => import('./views/login'));
const Register = lazy(() => import('./views/register'));

const routeConfig: RouteConfig[] = [
  // 注册页
  {
    name: '登录',
    path: '/',
    component: Login,
    exact: true
  },
  // 注册页
  {
    name: '注册',
    path: '/register',
    component: Register,
  },
];

export default routeConfig;
