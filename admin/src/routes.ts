import { lazy } from 'react';
import type { RouteConfig } from 'react-router-config';
const Register = lazy(() => import('./views/register'));

const routeConfig: RouteConfig[] = [
  // 注册页
  {
    name: '注册',
    path: '/register',
    component: Register,
  },
];

export default routeConfig;
