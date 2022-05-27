const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(cors())
app.use(express.static('uploads'))

app.use('/api/v1/account', require('./routes/account'))
app.use('/api/v1/posts', require('./routes/posts'))
app.use('/api/v1/users', require('./routes/users'))

app.listen(3001, () => {
    console.log('listening to port 3001...');
})