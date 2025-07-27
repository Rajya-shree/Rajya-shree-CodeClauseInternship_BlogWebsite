import React, { useState, useEffect, useRef } from "react";
import "./BlogCard.css";

const SMALL_IMAGE_WIDTH_THRESHOLD = 300; // px
const SMALL_IMAGE_HEIGHT_THRESHOLD = 200; // px

const BlogCard = ({ post, onLike, onDislike }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallImage, setIsSmallImage] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      // Check if image is small by natural dimensions
      if (
        imgRef.current.naturalWidth < SMALL_IMAGE_WIDTH_THRESHOLD ||
        imgRef.current.naturalHeight < SMALL_IMAGE_HEIGHT_THRESHOLD
      ) {
        setIsSmallImage(true);
      } else {
        setIsSmallImage(false);
      }
    }
  }, [post.image]); // Re-run if image changes

  // Compose dynamic classes for hover and small image states
  const cardClassNames = [
    "blog-card",
    isHovered ? "hovered" : "",
    isSmallImage ? "small-image" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={cardClassNames}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="content">
        <span className="category">{post.category || "Uncategorized"}</span>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div className="meta">
          <span className="author">{post.author || "Anonymous"}</span>
          <span className="date">
            {post.date || new Date().toLocaleDateString()}
          </span>
        </div>
        <div className="actions">
          <button onClick={() => onLike(post.id)}>👍 {post.likes}</button>
          <button onClick={() => onDislike(post.id)}>👎 {post.dislikes}</button>
        </div>
      </div>
      <div className="image-container">
        {post.image ? (
          <img
            ref={imgRef}
            src={post.image}
            alt={post.title}
            className="blog-image"
            draggable={false}
          />
        ) : (
          <div className="no-image-placeholder">No Image</div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
