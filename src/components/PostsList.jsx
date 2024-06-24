import React from "react";
import { List } from "antd";

function PostList({ posts }) {

  
  return (
    <>
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          pageSize: 5,
        }}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item key={post.id}>
            <List.Item.Meta
              title={post.title}
              description={`User ID: ${post.userId}`}
            />
            <p>{post.body}</p>
          </List.Item>
        )}
      />
      </>
  );
}

export default PostList;
