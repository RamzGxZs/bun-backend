import { Hono } from 'hono'
import { healthCheck } from '../controllers/healh.controller'

const route = new Hono()

route.get('/', healthCheck)

export default route
