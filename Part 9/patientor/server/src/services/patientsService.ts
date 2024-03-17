import patientsData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData as Array<Patient>;

export const getPatients = ():Array<Patient> => {
  return patients;
}

export const getNonSensitivePatients = ():Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries}) => {
    return {
      id,
      name,
      dateOfBirth, 
      gender,
      occupation,
    entries}
  })
}

export const getPatientById = (id:string):Patient | undefined => {
  return patients.find(patient => patient.id === id)
}

export const addPatient = (patient: NewPatient):Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
}