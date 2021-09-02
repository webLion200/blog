import { FC, Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { useMount } from "ahooks";
import request from "./utils/request";

const App: FC = () => {
  useMount(() => {
    request.setDefaultHost('http://127.0.0.1:7001/')
  })
  
  return (
    <Router>
      <Suspense fallback={<Spin />}>
        {renderRoutes(routes)}
      </Suspense>
    </Router>
  );
}

export default App;
