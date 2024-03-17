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
      <div>
        <h2>Entries</h2>
        {patient.entries.length !== 0 ?patient.entries.map(entry => 
          <div key={entry.id}>
            <strong>{entry.date}: {entry.description}</strong>
            <ul>
              {entry.diagnosisCodes?.map(dc => <li key={dc}>{dc}</li>)}
            </ul>
          </div>    
        ) : <h4>No entries for this patient</h4>}
      </div>
    </div>
  );

  return (
    <h4>Patient data unavailable</h4>
  );
};

export default PatientPage;