import { Router } from 'express';
import { auth } from './auth';
import { hotels } from './hotels';
import { rooms } from './rooms';
import { users } from './users';

const routes = Router();

routes.use('/auth', auth)
routes.use('/hotels', hotels)
routes.use('/rooms', rooms)
routes.use('/users', users)

routes.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })

})

export { routes };
