import express from 'express';
const cors = require('cors');
import diagnosesRouter from './routers/diagnoses';
import patientsRouter from './routers/patients'

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3003;

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});