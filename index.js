const PORT = 3030
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json('Server Running')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))