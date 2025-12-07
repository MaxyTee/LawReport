// components/ImageComponent.jsx
import React from "react";
import "./ImageComponent.css";

const ImageComponent = ({
  src,
  alt,
  className = "",
  overlay = false,
  children,
}) => {
  return (
    <div className={`image-container ${className}`}>
      <img src={src} alt={alt} className="image-content" />
      {overlay && <div className="image-overlay"></div>}
      {children && <div className="image-content-text">{children}</div>}
    </div>
  );
};

export default ImageComponent;
