import patientsData from '../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientsData as Array<Patient>;

export const getPatients = ():Array<Patient> => {
  return patients;
}

export const getNonSensitivePatients = ():Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => {
    return {
      id,
      name,
      dateOfBirth, 
      gender,
      occupation}
  })
}