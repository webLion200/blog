import type { RouteConfig } from 'react-router-config';

export interface RouteTypes extends RouteConfig {
  permissions: string[];
  unauthorized: Function;
  breadcrumb: string[];
} 