import { useEffect, useState } from "react";

const useFilteredPosts = (posts: any, userId: string) => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (posts.length > 0) {
      const filtered = posts
        .filter((post: any) => userId === "" || post.userId === parseInt(userId))
        .sort((a: any, b: any) => b.id - a.id)
        .slice(0, 20);
      setFilteredPosts(filtered);
    }
  }, [posts, userId]);

  return filteredPosts;
};

export default useFilteredPosts;
