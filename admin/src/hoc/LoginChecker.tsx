import { FC } from "react";
import { useHistory } from 'react-router-dom';
import { useMount } from "ahooks";
interface LoginCheckerProps {
  isLogin?: boolean;
}

const LoginChecker:FC<LoginCheckerProps> = (props) => {
  let history = useHistory();

  useMount(() => {
    if (!props.isLogin) {
      history.push('/login');
    }
  })

  return <>{props.children}</>
}

export default LoginChecker