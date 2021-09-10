import { FC } from "react";
import { renderRoutes, RouteConfig } from 'react-router-config';

import { RouteTypes } from './types'

type RouterProps = {
  normalRoutes: RouteConfig[];
  authorizedRoutes: RouteConfig[];
  notFoundRoutes: RouteConfig[];
};

const AclRouter:FC<RouterProps> = (props) => {
  const {normalRoutes, authorizedRoutes, notFoundRoutes} = props
  const routes: RouteConfig[]= [...normalRoutes, ...authorizedRoutes, ...notFoundRoutes]
  return (
    renderRoutes(routes)
  )
}

export default AclRouter