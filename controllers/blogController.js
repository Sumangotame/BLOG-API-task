import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    if (!title || !description) return res.status(400).json({ msg: "Title and Description are required" });

    const blog = await Blog.create({ title, description, tags });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const { title, tag, sortBy, page = 1, limit = 10 } = req.query;
    let query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (tag) query.tags = { $in: [tag] };

    let sortOption = { createdDate: -1 };
    if (sortBy === "asc") sortOption = { createdDate: 1 };
    if (sortBy === "desc") sortOption = { createdDate: -1 };

    const blogs = await Blog.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({ total, page: parseInt(page), limit: parseInt(limit), data: blogs });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Blog not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Blog not found" });
    res.json({ msg: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: "Comment text required" });

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    blog.comments.push({ text });
    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
