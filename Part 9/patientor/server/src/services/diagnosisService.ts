import diagnosesData from '../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesData as Array<Diagnosis>;

export const getDiagnoses = ():Array<Diagnosis> => {
  return diagnoses;
}