// src/components/Footer.jsx

import React from "react";

const Footer = () => {
  return (
    // Footer container with Tailwind CSS for styling.
    // bg-gray-800: dark gray background
    // text-white: white text color
    // p-6: padding
    // mt-auto: pushes the footer to the bottom if the main content is short
    // shadow-inner: adds a subtle inner shadow
    <footer className="bg-gray-800 shadow-inner mt-auto p-6 text-white">
      {/* Container for content inside the footer, centered text, and gray-400 text color. */}
      <div className="mx-auto text-gray-400 text-center container">
        {/* Copyright information, dynamically updated to the current year */}
        <p>
          &copy; {new Date().getFullYear()} My Blog App. All rights reserved.
        </p>
        {/* Small descriptive text about the technologies used */}
        <p className="mt-2 text-sm">
          Built with React, Tailwind CSS, Node.js, Express, and MongoDB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
