import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express()

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!")
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (!height || !weight) {
    res.status(400).json({ error: "The necessary parameters were not provided" });
  };
  if(isNaN(Number(height)) || isNaN(Number(weight))){
    res.status(400).json({ error: "malformatted parameters" })
  }
  const message = calculateBmi(Number(height), Number(weight));
  res.json({
    height, 
    weight,
    message
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/hello`)
})