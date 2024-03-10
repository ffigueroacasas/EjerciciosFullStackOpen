const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 74))