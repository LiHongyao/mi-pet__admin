import React from 'react';
import Cookie from '../../utils/cookie'
import { Row, Col, Form, Input, Button, message } from 'antd';
import { useHistory } from 'umi'
import Api from '../../api'

import './index.scss';



const Login = () => {

  const history = useHistory();

  const [form] = Form.useForm();

  const onLogin = (values:any) => {
    Api.user.login(values).then(res => {
      message.success('登录成功');
      sessionStorage.isLogin = true;
      Cookie.set('token', res.data);
      history.push('/dashboard')
    })
  };

  



  return (
    <div className="login">
      <div className="content">
        <Row justify="center">
          <Col>
              <img src={require('../../layout/images/logo.png')} alt="" className="logo" />
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <h1 className="title">i觅宠 - 后台管理系统</h1>
          </Col>
        </Row>
        <Form
          
          form={form}
          name="basic"
          onFinish={onLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '账号不能为空' }]}
          >
            <Input placeholder="请输入账号" autoComplete="on"  />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password placeholder="请输入密码" autoComplete="on"  />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
