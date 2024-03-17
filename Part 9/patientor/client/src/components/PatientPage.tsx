import { useParams } from "react-router-dom";
import { Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";
import patientService from "../services/patients";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();

  const { id }= useParams();
  useEffect(() => {
    if (id){
      patientService.getOne(id).then(data => {
        setPatient(data);
      });
    }
  }, [id]);

  if (patient) return (
    <div>
      <h3>{patient.name}</h3> <p>{patient.gender === "male"? <MaleIcon /> : <FemaleIcon />}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );

  return (
    <h4>Patient data unavailable</h4>
  );
};

export default PatientPage;