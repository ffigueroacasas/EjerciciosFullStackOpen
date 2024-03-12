import express from 'express'
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (!height || !weight) {
    res.status(400).json({ error: "The necessary parameters were not provided" });
  }
  if(isNaN(Number(height)) || isNaN(Number(weight))){
    res.status(400).json({ error: "malformatted parameters" });
  }
  const message = calculateBmi(Number(height), Number(weight));
  res.json({
    height, 
    weight,
    message
  });
});

app.post('/exercises', (req, res) => {
  const daily_exercises = req.body.daily_exercises;
  const targetHours = req.body.target;
  if (!daily_exercises || !targetHours) {
    res.status(400).json({ error: 'missing parameters'});
  }
  let dailyHours: number[] = [];
  if (daily_exercises instanceof Array){
    dailyHours = daily_exercises.map(input => {
    if (isNaN(Number(input))){
      return NaN;
    }
    return Number(input);
  });
  }
  if (dailyHours.indexOf(NaN) !== -1 || isNaN(Number(targetHours))){
    res.status(400).json({ error: "malformatted parameters" });
  }
  const { periodLength, trainingDays, success, rating, ratingDescription, target, average } = calculateExercises(dailyHours, targetHours);
  res.json({ periodLength, trainingDays, success, rating, ratingDescription, target, average });
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});