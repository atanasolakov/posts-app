import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";

const PostForm = ({ onAddPost }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const newPost = {
        id: Date.now(),
        title: values.title,
        body: values.body,
        userId: parseInt(values.userId, 10),
      };

      onAddPost(newPost);
      form.resetFields();
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Create New Post"
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>
        <Form.Item
          name="body"
          label="Body"
          rules={[{ required: true, message: "Please input the body!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter post content" />
        </Form.Item>
        <Form.Item
          name="userId"
          label="User ID"
          rules={[{ required: true, message: "Please input the User ID!" }]}
        >
          <Input placeholder="Enter your User ID" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Post
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PostForm;
