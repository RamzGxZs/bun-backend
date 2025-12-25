import { Hono } from 'hono'
import healthRoute from './health.route'
import userRoute from './user.route'

const routes = new Hono()

routes.route('/health', healthRoute)
routes.route('/user', userRoute)

export default routes
