const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const { db } = require('../utils/database')
const { requireAuth } = require('../utils/middlewares')
const { isEmail } = require('../utils/functions')
const { unlink } = require('fs/promises')
const { DEFAULT_COVER_IMAGE, DEFAULT_PROFILE_IMAGE } = require('../utils/constants')
require('dotenv').config()

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const { ACCESS_TOKEN_SECRECT, REFRESH_TOKEN_SECRECT } = process.env

    if(!email)
    {
        return res.status(400).json({ message: 'Email is required' })
    }
    if(typeof email !== 'string')
    {
        return res.status(400).json({ message: 'Email must be a string' })
    }

    if(!password)
    {
        return res.status(400).json({ message: 'Password is required' })
    }
    if(typeof password !== 'string')
    {
        return res.status(400).json({ message: 'Password must be a string' })
    }

    const [user] = await db('SELECT id, password FROM users WHERE email = ? LIMIT 1', [email])

    if (!user || !await bcrypt.compare(password, user.password)) 
    {
        return res.status(400).json({ message: 'Invalid email or password' })
    }

    const accessToken = jwt.sign({ currentUserId: user.id }, ACCESS_TOKEN_SECRECT, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ currentUserId: user.id }, REFRESH_TOKEN_SECRECT)

    res.json({ 
        accessToken,
        refreshToken
    })
})

router.post('/', async (req, res) => {
    let { name, email, password } = req.body
    
    const errors = {}
   
    if(!name)
    {
        errors.name = 'Name is required'
    }
    else if(typeof name !== 'string')
    {
        errors.name = 'Name must be a string'
    }
    else 
    {
        name = name.trim()

        if(name.length < 2 || name.length > 20)
        {
            errors.name = 'Name must be within 2-20 characters' 
        }
    }

    if(!email)
    {
        errors.email = 'Email is required'
    }
    else if(typeof email !== 'string')
    {
        errors.email = 'Email must be a string'
    }
    else 
    {
        email = email.trim()

        if(!isEmail(email))
        {
            errors.email = 'Invalid email'
        }
        else 
        {
            const [user] = await db('SELECT 1 FROM users WHERE email = ? LIMIT 1', [email])

            if(user)
            {
                errors.email = 'Email already taken'
            }
        }
    }

    if(!password)
    {
        errors.password = 'Password is required'
    }
    else if(typeof password !== 'string')
    {
        errors.password = 'Password must be a string'
    }
    else if(password.length < 8 || password.length > 20)
    {
        errors.password = 'Password must be within 8-20 characters'
    }
    else 
    {
        password = await bcrypt.hash(password, 10)
    }

    if(Object.keys(errors).length > 0)
    {
        return res.status(400).json(errors)
    }

    await db('INSERT INTO users (name, email, password, profileImage, coverImage) VALUES (?, ?, ?, ?, ?)', [name, email, password, DEFAULT_PROFILE_IMAGE, DEFAULT_COVER_IMAGE])

    res.status(201).json({ message: 'Sign up successfull' })
})

router.patch('/change-password', requireAuth, async (req, res) => {
    let { oldPassword, newPassword } = req.body

    const { currentUserId } = req.local

    const errors = {}

    if(!oldPassword)
    {
        errors.oldPassword = 'Old password is required'
    }
    else if(typeof oldPassword !== 'string')
    {
        errors.oldPassword = 'Old password must be a string'
    }
    else 
    {
        const [user] = await db('SELECT password FROM users WHERE id = ? LIMIT 1', [currentUserId])

        if(!await bcrypt.compare(oldPassword, user.password))
        {
            errors.oldPassword = 'Old password does not match'
        }
    }
    
    if(!newPassword)
    {
        errors.newPassword = 'New password is required'
    }
    else if(typeof newPassword !== 'string')
    {
        errors.newPassword = 'New password must be a string'
    }
    else if(newPassword.length < 8 || newPassword.length > 20)
    {
        errors.newPassword = 'New password must be within 8-20 characters' 
    }
    
    if(Object.keys(errors).length > 0)
    {
        return res.status(400).json(errors)
    }

    newPassword = await bcrypt.hash(newPassword, 10)

    await db('UPDATE users SET password = ? WHERE id = ?', [newPassword, currentUserId])

    return res.json({ message: 'Password updated successfully' })
})

router.patch('/change-email', requireAuth, async (req, res) => {
    let { newEmail, password } = req.body

    const { currentUserId } = req.local

    const errors = {}

    if(!newEmail)
    {
        errors.newEmail = 'New email is required'
    }
    else if(typeof newEmail !== 'string')
    {
        errors.newEmail = 'New email must be a string'
    }
    else if(!isEmail(newEmail))
    {
        errors.newEmail = 'Invalid email'
    }
    else 
    {
        newEmail = newEmail.trim().toLocaleLowerCase()

        const [user] = await db('SELECT 1 FROM users WHERE email = ? AND id != ? LIMIT 1', [newEmail, currentUserId])

        if(user)
        {
            errors.newEmail = 'Email already taken'
        }
    }

    if(!password)
    {
        errors.password = 'password is required' 
    }
    else if(typeof password !== 'string')
    {
        errors.password = 'Password must be a string'
    }
    else 
    {
        const [user] = await db('SELECT password FROM users WHERE id = ? LIMIT 1', [currentUserId])

        if (!await bcrypt.compare(password, user.password)) 
        {
            errors.password = 'Password does not match'
        }
    }

    if(Object.keys(errors).length > 0)
    {
        return res.status(400).json(errors)
    }

    await db('UPDATE users SET email = ? WHERE id = ?', [newEmail, currentUserId])

    res.json({ message: 'Email changed successfully' })
})

router.patch('/', requireAuth, async (req, res) => {
    let { name } = req.body

    let { profileImage, coverImage } = req.files || {}

    const { currentUserId } = req.local

    const errors = {}

    if(!name)
    {
        errors.name = 'Name is required'
    }
    else if(typeof name !== 'string')
    {
        errors.name = 'Name must be a string'
    }
    else 
    {
        name = name.trim()

        if(name.length < 2 || name.length > 20)
        {
            errors.name = 'Name must be within 2-20 characters'
        }
    }

    if (profileImage) 
    {
        if (profileImage.mimetype !== 'image/png' && profileImage.mimetype !== 'image/jpg' && profileImage.mimetype !== 'image/jpeg') 
        {
            errors.profileImage = 'Only jpeg, jpg and png images are allowed'
        } 
        else if (profileImage.size > 50000 || profileImage.size < 2000) 
        {
            errors.profileImage = 'Profile image must be within 2KB to 50KB'
        }
    }

    if (coverImage) 
    {
        if (coverImage.mimetype !== 'image/png' && coverImage.mimetype !== 'image/jpg' && coverImage.mimetype !== 'image/jpeg') 
        {
            errors.coverImage = 'Only jpeg, jpg and png images are allowed'
        } 
        else if (coverImage.size > 50000 || coverImage.size < 2000) 
        {
            errors.coverImage = 'Cover image must be within 2KB to 50KB'
        }
    }

    if(Object.keys(errors).length > 0)
    {
        return res.status(400).json(errors)
    }

    const [user] = await db('SELECT profileImage, coverImage FROM users WHERE id = ? LIMIT 1', [currentUserId])

    let profileImagePath = user.profileImage
    if (profileImage) 
    {
        const profileImageName = Math.random().toString(32) + path.extname(profileImage.name)
        profileImage.mv(`uploads/${profileImageName}`)
        profileImagePath = `${req.protocol}://${req.headers.host}/${profileImageName}`
    }

    let coverImagePath = user.coverImage
    if (coverImage) 
    {
        const coverImageName = Math.random().toString(32) + path.extname(coverImage.name)
        coverImage.mv(`uploads/${coverImageName}`)
        coverImagePath = `${req.protocol}://${req.headers.host}/${coverImageName}`
    }

    await db('UPDATE users SET name = ?, profileImage = ?, coverImage = ?', [name, profileImagePath, coverImagePath])

    if (user.profileImage !== DEFAULT_PROFILE_IMAGE && profileImage) 
    {
        await unlink(`uploads/${user.profileImage.replace(`${req.protocol}://${req.headers.host}/`, '')}`)
    }

    if (user.coverImage !== DEFAULT_COVER_IMAGE && coverImage) 
    {
        await unlink(`uploads/${user.coverImage.replace(`${req.protocol}://${req.headers.host}/`, '')}`)
    }

    res.json({ profileImagePath, coverImagePath })
})

router.patch('/refresh-token', async (req, res) => {
    const { authorization } = req.headers

    const { REFRESH_TOKEN_SECRECT, ACCESS_TOKEN_SECRECT } = process.env
    
    if (authorization && authorization.startsWith('Bearer ')) 
    {
        const token = authorization.substring(7, authorization.length)

        const { currentUserId } = jwt.verify(token, REFRESH_TOKEN_SECRECT)

        const accessToken = jwt.sign({ currentUserId }, ACCESS_TOKEN_SECRECT, { expiresIn: '1h' })

        return res.json({ accessToken })
    }

    return res.status(401).json({ message: 'Unauthorized' })
})

router.get('/followings', requireAuth, async (req, res) => {
    const { currentUserId } = req.local

    const limit = Number(req.query.limit) || 10
    
    const offset = Number(req.query.offset) || 0

    const followings = await db(`SELECT users.id,users.name,users.profileImage FROM followers INNER JOIN users ON users.id = followers.followingId WHERE followers.followerId = ? ORDER BY followers.id  LIMIT ? OFFSET ?`, [currentUserId, limit, offset])

    res.json(followings)
})

router.get('/followers', requireAuth, async(req, res) => {
    const { currentUserId } = req.local
   
    const limit = Number(req.query.limit) || 10
    
    const offset = Number(req.query.offset) || 0
    
    const followers = await db(`SELECT users.id, users.name, users.profileImage FROM followers INNER JOIN users ON users.id = followers.followerId WHERE followers.followingId = ? ORDER BY followers.id DESC LIMIT ? OFFSET ?`, [currentUserId, limit, offset])

    res.json(followers)
})

module.exports = router
