import React, { useState } from "react";

const BlogForm = ({ onAddPost, categories }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[1] || "Tech");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = {
      id: Date.now(),
      title,
      content,
      category,
      author,
      image,
      likes: 0,
      dislikes: 0,
    };
    onAddPost(newPost);
    setTitle("");
    setContent("");
    setCategory(categories[1] || "Tech");
    setAuthor("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {/* Author */}
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      {/* Image URL */}
      <input
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        {categories
          .filter((c) => c !== "All")
          .map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
      </select>
      <button type="submit">Post</button>
    </form>
  );
};

export default BlogForm;
