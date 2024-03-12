interface Results {
  periodLength: number,
  trainingDays: number, 
  success: boolean, 
  rating: number, 
  ratingDescription: string, 
  target: number, 
  average: number
}

export interface InputValues {
  targetDays: number, 
  dailyHours: number[]
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

export const parseArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Too few arguments.');
  let targetDays = 0;
  if (!isNaN(Number(args[2]))) {
    targetDays = Number(args[2]);
  };
  let stringHours = args.slice(3);
  console.log(stringHours);
  let dailyHours = stringHours.map(input => {
    if (isNaN(Number(input))){
      throw new Error('Inputs provided were not all numbers');
    }
    return Number(input)
  });
  return {
    targetDays, 
    dailyHours
  }
}


try {
  const { targetDays, dailyHours} = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, targetDays));
} catch (error: unknown) {
  let errorMessage = 'Something happened: ';
  if (error instanceof Error){
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage)
}