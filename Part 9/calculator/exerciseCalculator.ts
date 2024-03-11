interface Results {
  periodLength: number,
  trainingDays: number, 
  success: boolean, 
  rating: number, 
  ratingDescription: string, 
  target: number, 
  average: number
}

const calculateExercises = (dailyHours: number[], targetHours: number): Results => {
  let periodLength = dailyHours.length;
  let trainingDays = dailyHours.reduce((accumulator, current) => current > 0 ? accumulator += 1 : accumulator, 0);
  let totalHours = dailyHours.reduce((accumulator, current) => accumulator + current, 0);
  console.log(totalHours)
  let success = totalHours / periodLength >= targetHours;
  let rating = totalHours / periodLength < targetHours / 2 ? 1 : (totalHours / periodLength < targetHours ? 2 : 3);
  let ratingDescription = rating === 1 ? "You didn't even reach half of your target hours, you failed miserably." : 
    (rating === 2 ? "At least you did half of your target hours, beter luck next time." : "Well done! Goal achieved.");
  let target = targetHours;
  let average = totalHours / periodLength;
  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))