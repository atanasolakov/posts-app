import "./App.css";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import PostsList from "./components/PostsList";
import DropdownFilter from "./components/DropdownFilter";
import PostForm from "./components/PostForm";
import { Spin } from "antd";

function App() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const uniqueUserIds = [
        ...new Set(response.data.map((post) => post.userId)),
      ];
      setUserIds(uniqueUserIds);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching all posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const filtered = posts
        .filter((post) => userId === "" || post.userId === parseInt(userId))
        .sort((a, b) => b.id - a.id)
        .slice(0, 20);
      setFilteredPosts(filtered);
    }
  }, [posts, userId]);

  const handleChange = useCallback((value) => {
    setUserId(value);
  }, []);

  const handleAddPost = useCallback((newPost) => {
    setFilteredPosts((prevPosts) => [newPost, ...prevPosts]);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
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
          <PostsList posts={filteredPosts} />
        )}
      </div>
    </main>
  );
}

export default App;
