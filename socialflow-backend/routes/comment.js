const express = require('express');
const mongoose = require('mongoose');
const commentRouter = express.Router();
const Comment = mongoose.model('Comment');
const Post = mongoose.model('Post');
const isLoggedIn = require('../middlewares/isLoggedIn');
const sendResponse = require('../utilities/response');

// Create comment
commentRouter.post('/create/:postId', isLoggedIn, async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.postId;

        if (!text) {
            return sendResponse(res, false, 'Comment text is required', null, 400);
        }

        // Check if post exists
        const post = await Post.findById(postId);
        if (!post) {
            return sendResponse(res, false, 'Post not found', null, 404);
        }

        const newComment = new Comment({
            post: postId,
            user: req.user._id,
            text
        });

        const savedComment = await newComment.save();
        await savedComment.populate('user', 'name');

        return sendResponse(res, true, 'Comment created successfully', savedComment);
    } catch (err) {
        console.error(err);
        return sendResponse(res, false, 'Server error', null, 500);
    }
});

// Get comments for a post
commentRouter.get('/:postId', isLoggedIn, async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
            .populate('user', 'name')
            .sort('-createdAt');

        return sendResponse(res, true, 'Comments retrieved successfully', comments);
    } catch (err) {
        console.error(err);
        return sendResponse(res, false, 'Server error', null, 500);
    }
});

// Delete comment
commentRouter.delete('/:commentId', isLoggedIn, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return sendResponse(res, false, 'Comment not found', null, 404);
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return sendResponse(res, false, 'Not authorized to delete this comment', null, 401);
        }

        await comment.deleteOne();
        return sendResponse(res, true, 'Comment deleted successfully');
    } catch (err) {
        console.error(err);
        return sendResponse(res, false, 'Server error', null, 500);
    }
});

module.exports = commentRouter;