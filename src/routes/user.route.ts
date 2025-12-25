import { Hono } from 'hono'
import { getUsers } from '../controllers/user.controller'

const route = new Hono()

route.get('/get', getUsers)

export default route
