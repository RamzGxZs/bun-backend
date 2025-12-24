import { serve } from 'bun'
import { app } from './app'

serve({
  port: 3000,
  fetch: app.fetch,
})

console.log('🚀 Server running on http://localhost:3000')
