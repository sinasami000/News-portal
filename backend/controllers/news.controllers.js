import News from '../models/News.model.js';

export const allPublishedNews = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, author } = req.query;
    const query = { isPublished: true };

    if (category) query.category = category;
    if (author) query.author = author;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const total = await News.countDocuments(query);
    const news = await News.find(query)
      .populate('author', 'name avatar email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      news
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


export const topNewses =  async (req, res) => {
  try {
    const news = await News.find({ isPublished: true })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const singleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name avatar bio email');
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found.' });
    }
    // Increment views
    news.views += 1;
    await news.save();

    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const createNews =  async (req, res) => {
  try {
    const { title, content, excerpt, category, image, tags } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ success: false, message: 'Title, content, and category are required.' });
    }

    const news = await News.create({
      title,
      content,
      excerpt,
      category,
      image,
      tags: tags || [],
      author: req.user._id
    });

    await news.populate('author', 'name avatar');
    res.status(201).json({ success: true, message: 'News created successfully!', news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateNews =  async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found.' });
    }

    if (news.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this news.' });
    }

    const { title, content, excerpt, category, image, tags, isPublished } = req.body;
    Object.assign(news, { title, content, excerpt, category, image, tags, isPublished });
    await news.save();
    await news.populate('author', 'name avatar');

    res.json({ success: true, message: 'News updated successfully!', news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteNews =  async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found.' });
    }

    if (news.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this news.' });
    }

    await news.deleteOne();
    res.json({ success: true, message: 'News deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}