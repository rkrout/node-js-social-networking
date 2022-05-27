const router = require('express').Router()
const { db } = require('../utils/database')
const { requireAuth } = require('../utils/middlewares')

router.get('/:query/search', requireAuth, async (req, res) => {
    const limit = Number(req.query.limit) || 10
    
    const offset = Number(req.query.offset) || 0

    const { query } = req.params

    const users = await db('SELECT id, name, profileImage FROM users WHERE name LIKE ? LIMIT ? OFFSET ?', [`%${query}%`, limit, offset])

    res.json(users)
})

router.get('/:userId', requireAuth, async (req, res) => {
    const { userId } = req.params
    
    const { currentUserId } = req.local

    const [user] = await db('SELECT users.id, users.name AS userName, users.profileImage, users.coverImage, (SELECT COUNT(followers.followingId) FROM followers WHERE followers.followingId = ?) AS totalFollowers, (SELECT COUNT(followers.followerId) FROM followers WHERE followers.followerId = ?) AS totalFollowings, (SELECT COUNT(posts.userId) FROM posts WHERE posts.id = ?) AS totalPosts, EXISTS(SELECT 1 FROM followers WHERE followers.followingId = ? AND followers.followerId = ?) AS isFollowing FROM users WHERE users.id = ? LIMIT 1', [userId, userId, userId, userId, currentUserId, userId])
    
    res.json(user)
})

router.post('/:userId/followers', requireAuth, async (req, res) => {
    const { userId } = req.params

    const { currentUserId } = req.local

    const errors = {}

    const [user] = await db('SELECT 1 FROM users WHERE id = ? LIMIT 1', [userId])

    if (!user) 
    {
        errors.userId = 'User id does not exist'
    }
    else 
    {
        const [following] = await db('SELECT 1 FROM followers WHERE followerId = ? AND followingId = ? LIMIT 1', [currentUserId, userId])

        if (following) 
        {
            errors.userId = 'Aleady following the user'
        }
    }

    if(Object.keys(errors).length > 0)
    {
        return res.status(400).json(errors)
    }

    await db('INSERT INTO followers (followingId, followerId) VALUES (?, ?)', [userId, currentUserId])

    res.status(201).json({ message: 'Follow the user successfully' })
})

router.delete('/:userId/followers', requireAuth, async (req, res) => {
    const { userId } = req.params

    const { currentUserId } = req.local

    await db('DELETE FROM followers WHERE followingId = ? AND followerId = ?', [userId, currentUserId])

    res.json({ message: 'Unfollow the user successfully' })
})

router.get('/:userId/posts', requireAuth, async (req, res) => {
    const { currentUserId } = req.local

    const { userId } = req.params

    const limit = Number(req.query.limit) || 10
    
    const offset = Number(req.query.offset) || 0
    
    const posts = await db(`SELECT users.id AS userId, users.name AS userName, users.profileImage, posts.description, posts.image, posts.postedAt, (SELECT COUNT(likes.postId) FROM likes WHERE likes.postId = posts.id) AS totalLikes, (SELECT COUNT(comments.postId) FROM comments WHERE comments.postId = posts.id) AS totalComments, EXISTS(SELECT 1 FROM likes WHERE likes.userId = ? AND likes.postId = posts.id LIMIT 1) AS isLiked FROM posts INNER JOIN users ON users.id = posts.userId WHERE posts.userId = ? LIMIT ? OFFSET ?`, [currentUserId, userId, limit, offset])

    res.json(posts)
})

module.exports = router