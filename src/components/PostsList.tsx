import React from "react";
import { List } from "antd";
import { Post } from "../types/types";

function PostList({ posts}: any) {
console.log("POST LIST");
  
  return (
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          pageSize: 5,
        }}
        dataSource={posts as Post[]}
        renderItem={(post: Post) => (
          <List.Item key={post.id as string}>
            <List.Item.Meta
              title={post.title}
              description={`User ID: ${post.userId}`}
            />
            <p>{post.body}</p>
          </List.Item>
        )}
      />
  );
}

export default React.memo(PostList);
