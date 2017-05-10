const express = require('express')
const bp = require('body-parser')
import { dbInitialize } from './db'

let app = express()
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, rsp) => {
    rsp.send('api index')
})

dbInitialize('mongodb://localhost:27017/').then(() => {
    app.listen(8000, () => {
        console.log('server started on port 8000')
    })
})

