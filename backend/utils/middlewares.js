const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports.requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    
    const { ACCESS_TOKEN_SECRECT } = process.env

    if (authorization && authorization.startsWith('Bearer ')) 
    {
        const token = authorization.substring(7, authorization.length)

        const { currentUserId } = jwt.verify(token, ACCESS_TOKEN_SECRECT)

        req.local = { currentUserId }
    }
    else
    {
        return res.status(401).json({ message: 'Unauthenticated' })
    }

    next()
}