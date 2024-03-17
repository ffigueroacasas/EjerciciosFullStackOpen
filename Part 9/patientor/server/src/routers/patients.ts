import express from 'express';
import { getNonSensitivePatients, addPatient, getPatientById } from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = getNonSensitivePatients();
  res.json(patients);
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = getPatientById(id);
  if (patient) {
    return res.json(patient);
  }
  return res.status(404).json({ error: 'id non existant' });
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

export default router;