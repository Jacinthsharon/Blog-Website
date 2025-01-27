import React from 'react';

const BlogList = ({ blogs, deleteBlog, setEditingBlog }) => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-item" style={{ border: '1px solid #ddd', marginBottom: '20px', padding: '20px', borderRadius: '8px' }}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <p className="author">By {blog.author}</p>
          {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />}
          <div className="action-buttons" style={{ marginTop: '10px' }}>
            {}
            <button 
              onClick={() => setEditingBlog(blog)} 
              style={{ 
                backgroundColor: '#3498db', 
                padding: '8px 16px', 
                fontSize: '14px', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Edit
            </button>

            {}
            <button 
              onClick={() => deleteBlog(blog._id)} 
              style={{
                backgroundColor: '#e74c3c', 
                padding: '8px 16px', 
                fontSize: '14px', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
