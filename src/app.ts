import { Hono } from 'hono'
import { getEnv, type Env } from './lib/env'
import routes from './routes'
import type { Context } from 'hono/jsx'

// Workers bindings type
type Bindings = Env

export const app = new Hono<{ Bindings: Bindings }>()




// global prefix
app.route('/api', routes)

app.get('/', (c) =>{
  return c.text(`Hello from ${getEnv(c).APP_NAME}!`, 200)
})


app.notFound((c) =>
  c.json({ message: 'Route not found' }, 404)
)

app.onError((err, c) => {
  console.error(err)
  return c.json({ message: 'Internal Server Error' }, 500)
})
