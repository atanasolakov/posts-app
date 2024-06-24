import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostsList from "./components/PostsList";
import DropdownFilter from "./components/DropdownFilter";
import PostForm from "./components/PostForm";
import { Spin } from "antd";
import { useMemo } from "react";
import { useCallback } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const uniqueUserIds = [
        ...new Set(response.data.map((post) => post.userId)),
      ];
      setUserIds(uniqueUserIds);
    } catch (error) {
      console.error("Error fetching all posts", error);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const filteredPosts = response.data
        .filter((post) => userId === "" || post.userId === parseInt(userId))
        .slice(-20)
      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback((value) => {
    setUserId(value);
  }, []);

  const handleAddPost = useCallback((newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, []);

    const MemoizedPostsList = useMemo(() => {
      return React.memo(PostsList);
    }, []);

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
          <MemoizedPostsList posts={posts} />
        )}
      </div>
    </main>
  );
}

export default App;
