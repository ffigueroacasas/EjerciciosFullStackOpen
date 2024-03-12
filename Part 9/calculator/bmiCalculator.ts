export interface InputValues {
  height: number, 
  weight: number
};

export const calculateBmi = (height: number, weight: number): string => {
  let result: number = (weight / (height * height)) * 10000;
  let message: string;
  switch (true){
    case (result < 18.5):
      message = 'Underweight';
      break;
    case (result >= 18.5 && result < 25):
      message = 'Normal (healthy weight)';
      break;
    case (result >= 25 && result < 30):
      message = 'Overweight';
      break;
    case (result >= 30):
      message = 'Obese';
      break;
    default:
      message = 'Non Applicable';
      break;
  }
  return message
} 

export const parseArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something happened: ';
  if (error instanceof Error){
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage)
}




