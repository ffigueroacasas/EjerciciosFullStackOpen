import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if(!isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;
}

const parseOccupation = (occupation: unknown): string => {
  if(!isString(occupation)){
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)){
    throw new Error('Incorrect date of birth: ' + date);
  }
  return date;
}

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing gender');
  }
  return gender;
}

const parseSSN = (ssn: unknown): string => {
  if(!isString(ssn) || !ssn){
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
}

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('incorrect of missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object){
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSSN(object.ssn),
      entries: []
    };

    return newPatient;
  }

  throw new Error('Incorrect data: field(s) missing!');
};

export default toNewPatient;