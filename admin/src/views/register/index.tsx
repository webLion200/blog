import {FC, useReducer} from "react";
import { Form, Input, Button, message } from 'antd';
import { useRequest } from 'ahooks';
import { useHistory } from "react-router-dom";
import { telRegx } from "../../utils/index";
import { Post } from "../../utils/request";
import './index.css'
type UserInfoProps = {}
const initState = {
  userName: '',
  telPhone: '',
  password: ''
} as UserInfoType
const reducer = (state: UserInfoType, action: { type: string; payload: any; }) => {
  switch(action.type) {
    case 'userName':
      return {...state, userName: action.payload};
    case 'telPhone':
      return {...state, telPhone: action.payload};
    case 'password':
      return {...state, password: action.payload};
    default: 
      return state;
  }
}
const Register: FC<UserInfoProps> = (props) => {
  const history = useHistory()

  const [state, dispatch] = useReducer(reducer, initState)
  const submit = async () => {
    const { userName, telPhone, password } = state
    const {err} = await Post('/register', {
      userName, 
      telPhone, 
      password 
    })
    if(!!err) {
      message.error(err.message)
      return
    }
    history.push("/login")
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
            label="手机号"
            name="telPhone"
            rules={[
              { 
                required: true,
                validator: (_, value) => {
                  if(!value) {
                    return Promise.reject(new Error("请输入手机号"));
                  } else if(!telRegx.test(value)) {
                    return Promise.reject(new Error("请输入正确的手机号"));
                  }
                  return Promise.resolve()
                }    
              }
            ]}
          >
            <Input name="telPhone" type="number" onChange={handleChangeInput}/>
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
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register