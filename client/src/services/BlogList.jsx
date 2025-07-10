import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from your backend
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <h2>📝 Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available yet...</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small><strong>Author:</strong> {post.author}</small>
          </div>
        ))
      )}
    </div>
  );
}
