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


const Call = ({}) => {
  const [form] = Form.useForm();

  const onFinish = async values => {
    console.log(values);
    let customer = null
    try {
      customer = await RegalVoiceService.createCustomerAndCall(values);
    } catch(e) {
      let error = formatError(e)
      message.error(error.message)
    }

    if (customer) {
      form.resetFields();
      message.success("Call successfully put through.")
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Layout>
    <h1>Send Call</h1>
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="submit" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Layout>
  )
};

export default Call;
