import gql from "graphql-tag";
import React, { Component, useState, useEffect } from "react";

import RegalVoiceService from "#root/api/apiClient";
import Layout from "../Shared/Layout"

import { Table } from 'antd';

const customerCols = [
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
    sorter: (a, b) => a.first_name.length - b.first_name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
];

const callCols = [
  {
    title: 'Call',
    dataIndex: 'callSid',
    key: 'callSid',
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

const Admin = ({}) => {
  let [customers, setCustomers] = useState([]);
  let [calls, setCalls] = useState([]);

  async function fetchCustomers() {
    setCustomers(await RegalVoiceService.fetchCustomers());
  }

  async function fetchCalls() {
    setCalls(await RegalVoiceService.fetchCalls());
  }

  useEffect(() => {
    fetchCustomers()
    fetchCalls()
  }, [])

  return (
    <Layout>
      <h1>Customers ({customers.length})</h1>
      {/* <Button >Hello World</Button> */}
      <Table columns={customerCols} dataSource={customers} />
      <h1>Calls ({calls.length})</h1>
      {/* <Button >Hello World</Button> */}
      <Table columns={callCols} dataSource={calls} />
    </Layout>
  )
};

export default Admin;
