// src/A
import React from "react";
// Import Routes and Route from react-router-dom to define your application's routes
import { Routes, Route } from "react-router-dom";

// Import your UI components
import Navbar from "./components/Navbar"; // Will create this next
import Footer from "./components/Footer"; // Will create this after Navbar

// Import your page components (these will be created in subsequent steps)
import AuthForm from "./pages/AuthForm"; // Handles both Login and Register
import HomePage from "./pages/HomePage"; // Displays all blog posts
import CreatePostPage from "./pages/CreatePostPage"; // Form to create a new post
import SinglePostPage from "./pages/SinglePostPage"; // Displays a single post
import MyPostsPage from "./pages/MyPostsPage"; // Displays posts by the logged-in user

// Import the ProtectedRoute component (will create this soon)
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    // This div acts as the main container for your entire application.
    // 'flex flex-col min-h-screen' ensures it takes full viewport height and
    // its children (Navbar, main, Footer) stack vertically, with 'main' growing to fill space.
    <div className="flex flex-col min-h-screen">
      {/* Navbar component will be displayed at the top of every page */}
      <Navbar />

      {/* The 'main' tag will contain your page-specific content.
          'flex-grow' ensures it takes up all available vertical space between Navbar and Footer. */}
      <main className="flex-grow">
        {/* Routes component acts as a container for all your individual Route definitions.
            It listens to URL changes and renders the first <Route> that matches. */}
        <Routes>
          {/* --- Public Routes ---
              These routes do NOT require a user to be logged in. */}
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm />} />

          {/* --- Protected Routes ---
              These routes DO require a user to be logged in.
              We wrap the page component with <ProtectedRoute> to enforce this.
              The ProtectedRoute component will handle redirection if the user is not authenticated. */}

          {/* Home Page: Displays all blog posts. It's protected as per your backend setup. */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Create Post Page: Form for creating new blog posts. */}
          <Route
            path="/create-post"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />

          {/* Single Post Page: Displays a specific blog post by its ID. */}
          <Route
            path="/posts/:postId" // ':postId' is a URL parameter that will capture the post's ID
            element={
              <ProtectedRoute>
                <SinglePostPage />
              </ProtectedRoute>
            }
          />

          {/* My Posts Page: Displays posts created by the currently logged-in user. */}
          <Route
            path="/my-posts"
            element={
              <ProtectedRoute>
                <MyPostsPage />
              </ProtectedRoute>
            }
          />

          {/* --- Catch-all Route for 404 Not Found ---
              This route should always be the last one, as it matches any path not matched by previous routes. */}
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center min-h-[calc(100vh-120px)] text-gray-600 text-2xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer component will be displayed at the bottom of every page */}
      <Footer />
    </div>
  );
}

export default App;
