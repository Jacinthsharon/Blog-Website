import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = ({ refreshBlogs, editingBlog }) => {
  const [title, setTitle] = useState(editingBlog ? editingBlog.title : '');
  const [content, setContent] = useState(editingBlog ? editingBlog.content : '');
  const [author, setAuthor] = useState(editingBlog ? editingBlog.author : '');
  const [image, setImage] = useState(editingBlog ? editingBlog.image : null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editingBlog) {
        
        await axios.put(`http://localhost:5000/api/blogs/${editingBlog._id}`, formData);
      } else {
        
        await axios.post('http://localhost:5000/api/blogs', formData);
      }
      refreshBlogs();
      setTitle('');
      setContent('');
      setAuthor('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting the blog', error);
    }
  };

  return (
    <div>
      <h2>{editingBlog ? 'Edit Blog' : 'Add Blog'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Author:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Image:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </div>
        <button type="submit">{editingBlog ? 'Update Blog' : 'Add Blog'}</button>
      </form>
    </div>
  );
};

export default BlogForm;
