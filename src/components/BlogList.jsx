import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({
  posts,
  onLike,
  onDislike,
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div>
      {/* Category Tabs */}
      {/* <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-button ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div> */}

      <div className="blog-list">
        {posts.length === 0 ? (
          <p>No blog posts for this category yet. Add one!</p>
        ) : (
          posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onLike={onLike}
              onDislike={onDislike}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
