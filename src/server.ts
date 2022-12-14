import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import e from 'express';
import './database/connect';
import { routes } from './routes/routes';
const app = e()

app.use(cors({ credentials: true, origin: true }))
app.use(e.json())
app.use(cookieParser())
app.use('/api', routes)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`app listening at ${PORT}`))