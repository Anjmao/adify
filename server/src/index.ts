import * as express from 'express'

let app = express()

app.get('/', (req, rsp) => {
    rsp.send('api index')
})

app.listen(8000, () => {
    console.log('server started on port 8000')
})