import React, { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";

const categories = ["All", "Tech", "Life", "Business"];

const App = () => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("blogPosts");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const addPost = (post) => {
    
    if (!post.category) post.category = "Tech";

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  };

  const handleLike = (id) => {
    const updated = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updated);
    localStorage.setItem("blogPosts", JSON.stringify(updated));
  };

  const handleDislike = (id) => {
    const updated = posts.map((post) =>
      post.id === id ? { ...post, dislikes: post.dislikes + 1 } : post
    );
    setPosts(updated);
    localStorage.setItem("blogPosts", JSON.stringify(updated));
  };

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div
      className="app-container"
      onMouseMove={(e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 100;
        const y = (e.clientY / innerHeight - 0.5) * 100;
        document.documentElement.style.setProperty("--mouse-x", `${x}%`);
        document.documentElement.style.setProperty("--mouse-y", `${y}%`);
      }}
    >
      <h1>💡 React Blog App</h1>
      <BlogForm onAddPost={addPost} categories={categories} />
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <BlogList
        posts={filteredPosts}
        onLike={handleLike}
        onDislike={handleDislike}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </div>
  );
};

export default App;
