const express = require('express');
const { auth, admin } = require('../middlewares/auth');
const Blog = require('../models/Blog');
const User = require('../models/User');
const router = express.Router();

// Create a new blog (Admin only)
router.post('/', auth, admin, async (req, res) => {
  const { title, content, blogType } = req.body;

  try {
    if (!title || !content || !blogType) {
      return res.status(400).json({ error: "All fields (title, content, blogType) are required" });
    }

    const newBlog = new Blog({
      title,
      content,
      blogType,
      author: req.user.id,
    });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch blogs (Admins see all blogs, users see blogs based on their preferences)
router.get('/', auth, async (req, res) => {
  try {
    // Get the logged-in user's data
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // If the user is an admin, fetch all blogs
    let filter = {};
    if (!user.isAdmin) {
      // Non-admin users: Filter blogs based on visibleBlogTypes
      filter = { blogType: { $in: user.visibleBlogTypes } };
    }

    // Fetch blogs based on the filter
    const blogs = await Blog.find(filter).populate('author', 'name');

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Read a specific blog by ID (Admins see all, users see only if allowed)
router.get('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // Check if the user is allowed to view the blog
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.isAdmin && !user.visibleBlogTypes.includes(blog.blogType)) {
      return res.status(403).json({ error: "Access denied to this blog type" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a blog (Admin only)
router.put('/:id', auth, admin, async (req, res) => {
  const { title, content, blogType } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (blogType) blog.blogType = blogType;

    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a blog (Admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    await blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
