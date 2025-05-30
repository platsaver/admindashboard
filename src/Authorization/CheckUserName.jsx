import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import '@ant-design/v5-patch-for-react-19';

const CheckUsername = ({ onNext }) => {
  const [generatedCode, setGeneratedCode] = useState('Loading...');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if deviceID exists in localStorage
    const storedDeviceID = localStorage.getItem('deviceID');

    if (storedDeviceID) {
      setGeneratedCode(storedDeviceID);
      form.setFieldsValue({ code: storedDeviceID });
    } else {
      // Generate new deviceID using FingerprintJS
      FingerprintJS.load()
        .then((fp) => fp.get())
        .then((result) => {
          const deviceID = result.visitorId;
          setGeneratedCode(deviceID);
          localStorage.setItem('deviceID', deviceID); // Store in localStorage
          form.setFieldsValue({ code: deviceID });
        })
        .catch((error) => {
          console.error('Error generating fingerprint:', error);
          setGeneratedCode('Error generating code');
          message.error('Failed to generate device ID');
        });
    }
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/check-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: values.username, 
          device_id: values.code 
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to check username');
      }

      message.success('Username exists! Proceeding...');
      onNext({ 
        username: values.username, 
        device_id: values.code, 
        access_code: result.access_code 
      });
    } catch (error) {
      console.error('API call failed:', error);
      message.error(error.message || 'Failed to check username!');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill in all required fields correctly!');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input disabled={loading} />
        </Form.Item>

        <Form.Item label="Your Device ID" name="code">
          <pre
            style={{
              background: '#f5f5f5',
              padding: '8px',
              borderRadius: '4px',
              margin: 0,
            }}
          >
            {generatedCode}
          </pre>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CheckUsername;