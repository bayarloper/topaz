import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogPanel = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  interface BlogPost {
    ID: number;
    title: string;
    content: string;
    image: string;
  }

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get<BlogPost[]>(
        "http://localhost:3001/api/blogpost"
      );
      setBlogPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const handleDelete = async (postId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) {
      return; // If user cancels the confirmation, do nothing
    }

    try {
      await axios.delete(`http://localhost:3001/api/blogpost/${postId}`);
      // After successful deletion, fetch the updated list of blog posts
      fetchBlogPosts();
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {selectedPost ? (
        <div className="border p-4 mb-4">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="mb-2"
          />
          <h2 className="text-xl font-semibold mb-2">{selectedPost.title}</h2>
          <p>{selectedPost.content}</p>
          <button
            onClick={() => setSelectedPost(null)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mt-2"
          >
            Back to List
          </button>
        </div>
      ) : (
        blogPosts.map((post) => (
          <div key={post.ID} className="border p-4 mb-4">
            <img src={post.image} alt={post.title} className="mb-2" />
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p>{post.content}</p>
            <div className="flex mt-2">
              <button
                onClick={() => setSelectedPost(post)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.ID)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogPanel;
