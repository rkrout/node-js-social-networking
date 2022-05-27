const router = require('express').Router()
const path = require('path')
const { db } = require('../utils/database')
const { requireAuth } = require('../utils/middlewares')
const { unlink } = require('fs/promises')
const { posix } = require('path')

router.post('/', requireAuth, async (req, res) => {
    let { description } = req.body

    const { image } = req.files || {}

    const { currentUserId } = req.local

    const date = new Date()

    const postedAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    
    let imagePath = ''

    const errors = {}

    if (!description && !image) 
    {
        errors.nonField = 'Either description or image is required'
    }

    if(description)
    {
        if(typeof description !== 'string')
        {
            errors.description = 'Descriptin must be a string'
        }
        else 
        {
            description = description.trim()

            if(description.length < 2 || description.length > 500)
            {
                errors.description = 'Descriptin must be within 2-500 characters'
            }
        }
    }

    if (image) 
    {
        if (image.mimetype !== 'image/png' && image.mimetype !== 'image/jpg' && image.mimetype !== 'image/jpeg') 
        {
            errors.image = 'Only jpeg, jpg and png images are allowed'
        } 
        else if (image.size > 50000 || image.size < 2000) 
        {
            errors.image = 'Image must be within 2KB to 50KB'
        }
    }

    if (image) 
    {
        const imageName = Math.random().toString(32) + path.extname(image.name)
        image.mv(`uploads/${imageName}`)
        imagePath = `${req.protocol}://${req.headers.host}/${imageName}`    
    }

    await db('INSERT INTO posts (description, image, userId, postedAt) VALUES (?, ?, ?, ?)', [description, imagePath, currentUserId, postedAt])

    res.status(201).json({ message: 'Post added successfully'})
})

router.delete('/:postId', requireAuth, async (req, res) => {
    const { currentUserId } = req.local

    const { postId } = req.params

    const [post] = await db('SELECT image FROM posts WHERE id = ? AND userId = ? LIMIT 1', [postId, currentUserId])

    if (!post) 
    {
        return res.status(404).json({ message: 'Post does not exists' })
    }

    if(post.image)
    {
        await unlink(`uploads/${post.image.replace(`${req.protocol}://${req.headers.host}/`, '')}`)
    }

    await db('DELETE FROM posts WHERE id = ? AND userId = ?', [postId, currentUserId])

    res.json({ message: 'Post deleted successfully' })
})

router.get('/timelines', requireAuth, async(req, res) => {
    const { currentUserId } = req.local

    const limit = Number(req.query.limit) || 10
    
    const offset = Number(req.query.offset) || 0

    const posts = await db('SELECT users.id AS userId, users.name AS userName, users.profileImage, posts.id, posts.description, posts.postedAt, posts.image, (SELECT COUNT(likes.postId) FROM likes WHERE likes.postId = posts.id) AS totalLikes, (SELECT COUNT(comments.postId) FROM comments WHERE comments.postId = posts.id) AS totalComments, EXISTS(SELECT 1 FROM likes WHERE likes.postId = posts.id AND likes.userId = ?) AS isLiked FROM followers INNER JOIN users ON users.id = followers.followingId INNER JOIN posts ON posts.userId = users.id WHERE followers.followerId = ? ORDER BY posts.id DESC LIMIT ? OFFSET ?', [currentUserId, currentUserId, limit, offset])

    res.json(posts)
})

router.post('/:postId/likes', requireAuth, async (req, res) => {
    const { currentUserId } = req.local

    const { postId } = req.params

    const [post] = await db('SELECT 1 FROM posts WHERE id = ? LIMIT 1', [postId])

    if (!post) {
        return res.status(404).json({ message: 'Post does not exist' })
    }

    const [like] = await db('SELECT 1 FROM likes WHERE postId = ? AND userId = ? LIMIT 1', [postId, currentUserId])

    if (like) {
        return res.status(409).json({ message: 'Already liked the post' })
    }

    await db('INSERT INTO likes (postId, userId) VALUES (?, ?)', [postId, currentUserId])

    res.status(201).json({ message: 'Liked the post' })
})

router.delete('/:postId/likes', requireAuth, async (req, res) => {
    const { currentUserId } = req.local

    const { postId } = req.params

    await db('DELETE FROM likes WHERE postId = ? AND userId = ?', [postId, currentUserId])
    
    res.json({ message: 'Liked removed' })
})

router.get('/:postId/comments', requireAuth, async (req, res) => {
    const { currentUserId } = req.local

    const { postId } = req.params

    const limit = Number(req.query.limit) || 10
    
    const offset = Number(req.query.offset) || 0

    const comments = await db(`SELECT  users.id AS userId, users.name AS userName, users.profileImage, comments.id, comments.comment, comments.commentedAt, IF(comments.userId = ?, true, false) AS isCommented FROM comments INNER JOIN users ON users.id = comments.userId WHERE comments.postId = ? ORDER BY comments.id DESC LIMIT ? OFFSET ?`,  [currentUserId, postId, limit, offset])

    res.json(comments)
})

router.post('/:postId/comments', requireAuth, async (req, res) => {
    const { currentUserId } = req.local

    const { postId } = req.params

    let { comment } = req.body

    const date = new Date()

    const commentedAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    const errors = {}

    const [post] = await db('SELECT 1 FROM posts WHERE id = ? LIMIT 1', [postId])

    if (!post) 
    {
        errors.postId = 'Post id does not exists'
    }

    if (!comment) 
    {
        errors.comment = 'Comment is required'
    }
    else if (typeof comment !== 'string') 
    {
        errors.comment = 'Comment must be a string'
    }
    else 
    {
        comment = comment.trim()

        if(comment.length < 2 || comment.length > 200)
        {
            errors.comment = 'Comment must be within 2-200 characters'
        }
    }

    if(Object.keys(errors).length > 0)
    {
        return res.status(400).json(errors)
    }

    const result = await db('INSERT INTO comments (comment, postId, userId, commentedAt) VALUES (?, ?, ?, ?)', [comment, postId, currentUserId, commentedAt])

    const payload = {
        id: result.insertId,
        commentedAt: commentedAt
    }

    res.status(201).json(payload)
})

router.delete('/comments/:commentId', requireAuth, async (req, res) => {
    const { currentUserId } = req.local
    
    const { commentId } = req.params

    await db('DELETE FROM comments WHERE id = ? AND userId = ?', [commentId, currentUserId])

    res.json({ message: 'Comment deleted' })
})

module.exports = router