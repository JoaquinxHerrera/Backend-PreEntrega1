import express from 'express'
import { apiRouter } from './routers/api.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))
app.use('/api', apiRouter)



app.listen(8081, () =>{console.log('conectado')})





