import express from 'express';
import diagnosesRouter from './routers/diagnoses';

const app = express();
app.use(express.json());

const PORT = 3003;

app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});