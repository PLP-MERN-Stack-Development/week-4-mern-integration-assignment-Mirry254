import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/posts', formData);
      alert("✅ Post created!");
      setFormData({ title: '', content: '', author: '', image: '' });
    } catch (err) {
      alert("❌ Failed to create post.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
      <h2>➕ Create a New Post</h2>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <br />
      <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} required />
      <br />
      <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
      <br />
      <input type="text" name="image" placeholder="Image URL (optional)" value={formData.image} onChange={handleChange} />
      <br />
      <button type="submit">Submit Post</button>
    </form>
  );
}
