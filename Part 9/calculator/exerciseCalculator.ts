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
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.reduce((accumulator, current) => current > 0 ? accumulator += 1 : accumulator, 0);
  const totalHours = dailyHours.reduce((accumulator, current) => accumulator + current, 0);
  const success = totalHours / periodLength >= targetHours;
  const rating = totalHours / periodLength < targetHours / 2 ? 1 : (totalHours / periodLength < targetHours ? 2 : 3);
  const ratingDescription = rating === 1 ? "You didn't even reach half of your target hours, you failed miserably." : 
    (rating === 2 ? "At least you did half of your target hours, beter luck next time." : "Well done! Goal achieved.");
  const target = targetHours;
  const average = totalHours / periodLength;
  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  };
};

export const parseArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Too few arguments.');
  let targetDays = 0;
  if (!isNaN(Number(args[2]))) {
    targetDays = Number(args[2]);
  }
  const stringHours = args.slice(3);
  const dailyHours = stringHours.map(input => {
    if (isNaN(Number(input))){
      throw new Error('Inputs provided were not all numbers');
    }
    return Number(input);
  });
  return {
    targetDays, 
    dailyHours
  };
};


try {
  const { targetDays, dailyHours} = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, targetDays));
} catch (error: unknown) {
  let errorMessage = 'Something happened: ';
  if (error instanceof Error){
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage);
}