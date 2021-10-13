import { FC } from "react";
import { useHistory } from 'react-router-dom';
import { useMount, useLocalStorageState } from "ahooks";
import request from '../utils/request'
interface LoginCheckerProps {
  isLogin?: boolean;
}

const LoginChecker:FC<LoginCheckerProps> = (props) => {
  let history = useHistory();
  const [token] = useLocalStorageState('token')
  useMount(() => {
    if (!token) {
      history.push('/login');
    }
  })
  
  request.setCommonHeader({ Authorization: 'Bearer ' + token })
  return <>{props.children}</>
}

export default LoginChecker