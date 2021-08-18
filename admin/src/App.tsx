import { FC, Suspense } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import { Spin } from 'antd';
import 'antd/dist/antd.css';

const App: FC = () => {
  return (
    <Router>
      <Suspense fallback={<Spin />}>
        {renderRoutes(routes)}
      </Suspense>
    </Router>
  );
}

export default App;
