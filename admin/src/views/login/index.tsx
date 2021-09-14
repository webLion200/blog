import {FC, useReducer} from "react";
import { Form, Input, Button, message } from 'antd';
import { useRequest, useMount, useLocalStorageState } from 'ahooks';
import { useHistory } from "react-router-dom";
import { Post } from "../../utils/request";
import { loginApi } from "../../api";
import './index.css'
type UserInfoProps = {
  isLogin?: boolean
}
const initState = {
  userName: '',
  telPhone: '',
  password: ''
} as UserInfoType
const reducer = (state: UserInfoType, action: { type: string; payload: any; }) => {
  switch(action.type) {
    case 'userName':
      return {...state, userName: action.payload};
    case 'password':
      return {...state, password: action.payload};
    default: 
      return state;
  }
}
const Login: FC<UserInfoProps> = (props) => {
  let history = useHistory()
  useMount(() => {
    if(props.isLogin) {
      history.push('/');
    }
  })

  const [state, dispatch] = useReducer(reducer, initState)
  const [token, setToken] = useLocalStorageState('token', '')
  const submit = async () => {
    const { userName, password } = state
    const { res, err } = await loginApi({ userName, password })
    if(!!err) {
      message.error(err.message)
      return
    }
    setToken(res as string)
    history.push("/")
  }

  const { run } = useRequest(submit, {
    throttleInterval: 500,
    manual: true
  })

  const onFinish = () => {
    run()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const handleChangeInput = (e: any) => {
    const value = e.target.value
    const name = e.target.name
    dispatch({type: name, payload: value})
  }

  return (
    <div className="container">
      <div className="form-wrapper">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="userName"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input name="userName" maxLength={20} onChange={handleChangeInput}/>
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              { 
                required: true,
                validator: (_, value) => {
                  if(!value) {
                    return Promise.reject(new Error("请输入密码"));
                  } else if(value.length > 15) {
                    return Promise.reject(new Error("密码最多15位"));
                  }
                  return Promise.resolve()
                }    
              }
            ]}
          >
            <Input.Password name="password" onChange={handleChangeInput}/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login