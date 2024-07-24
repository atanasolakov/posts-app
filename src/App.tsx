import "./App.css";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Spin } from "antd";
import DropdownFilter from "./components/DropdownFilter";
import PostForm from "./components/PostForm";
import PostsList from "./components/PostsList";
import useFilteredPosts from "./hooks/useFilteredPosts";
import useAxiosFetch from "./hooks/useAxiosFetch";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  let baseUrl = "https://jsonplaceholder.typicode.com/posts";
  const { data, userIds, fetchError, isLoading } = useAxiosFetch(baseUrl)
  const filteredPosts = useFilteredPosts(posts, userId);

  useEffect(() => {
    setPosts(data as []);
  }, [data]);

  const handleChange = (value: any) => {
    setUserId(value);
  };

  const handleAddPost = (newPost: any) => {
    setPosts((prevPosts) => [newPost, ...prevPosts] as any);
  };
  return (
    <main className="App">
      <header className="App-header">
        <h1 className="App-title">Typicode Posts</h1>
      </header>
      <div className="content">
        <DropdownFilter userIds={userIds} onChange={handleChange} /> 
        
        <PostForm onAddPost={handleAddPost} />
      </div>
      <div className="posts-section">
        {loading ? (
          <div className="spinner-container">
            <Spin size="large" />
          </div>
        ) : (
          <PostsList posts={filteredPosts} />
        )}
      </div>
    </main>
  );
};

export default App;
