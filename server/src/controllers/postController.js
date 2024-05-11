const Post = require("../models/postModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchError = require("../utils/catchError");
const fs = require("fs-extra");
const Comment = require("../models/commentModel");

exports.createPost = catchError(async (req, res, next) => {
  const photos = [];

  if (req.files) {
    req.files.forEach((photo) => photos.push(photo.filename));
  }

  const post = await Post.create({
    content: req.body.content,
    user: req.user._id,
    photos,
  });

  res.status(201).json(post);
});

exports.getAllPost = catchError(async (req, res, next) => {
  let query = {};

  if (req.query.userId) {
    console.log("ok");
    query.user = req.query.userId;

    const user = await User.findById(req.query.userId);

    if (!user) {
      return next(
        new AppError(`User with id ${req.query.userId} is not exist.`, 404)
      );
    }
  }

  const posts = await Post.find(query);

  res.status(200).json(posts);
});

exports.deletePost = catchError(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.postId);

  if (!post) {
    return next(
      new AppError(`No post found with id ${req.params.postId}.`, 404)
    );
  }

  await Comment.deleteMany({ post: post._id });

  post.photos.forEach(async (photo) => {
    await fs.remove(`./public/images/${photo}`);
  });

  res.status(204).json({
    message: "Post is successfully deleted.",
  });
});