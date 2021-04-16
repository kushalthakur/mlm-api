import App from './app'
import controllers from './controllers'
import middlewares from './middleware'

const app = new App({
   controllers,
   middlewares
})
app.listen()

export default app