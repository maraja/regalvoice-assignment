import gql from "graphql-tag";
import React, { Component, useState, useEffect } from "react";

import { Form, Input, Button, Select, message } from 'antd';

import Layout from '../Shared/Layout'
import RegalVoiceService from "#root/api/apiClient";
import {formatError} from '#root/api/formatError'


const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 16, span: 8 },
};


const LoginForm = (props) => {
  let [authenticated, setAuthenticated] = useState(false);

  const [form] = Form.useForm();

  async function authenticate(values) {
    let result = null
    try {
      result = await RegalVoiceService.authenticate(values)
    } catch(e) {
      let error = formatError(e)
      message.error(error.message)
    }

    if (result.data.success == true) {
      message.success("Admin successfully authenticated!")
      setAuthenticated(true)
    } else {
      message.error("Something went wrong")
    }
  }

  const onReset = () => {
    form.resetFields();
  };

  return !authenticated ? (
    <Layout>
    <h1>Admin Login</h1>
    <Form {...layout} form={form} name="control-hooks" onFinish={authenticate}>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="password" rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="submit" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Layout>
  ) : <React.Fragment>{props.children}</React.Fragment>
};

export default LoginForm;
