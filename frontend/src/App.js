import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null); 

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog', error);
    }
  };

  const updateBlog = async (id, updatedBlog) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, updatedBlog);
      fetchBlogs(); 
    } catch (error) {
      console.error('Error updating blog', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Blogging Platform</h1>
      <BlogForm refreshBlogs={fetchBlogs} editingBlog={editingBlog} setEditingBlog={setEditingBlog} updateBlog={updateBlog} />
      <BlogList blogs={blogs} deleteBlog={deleteBlog} setEditingBlog={setEditingBlog} />
    </div>
  );
};

export default App;
