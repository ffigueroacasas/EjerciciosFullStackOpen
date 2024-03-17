import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";
import patientService from "../services/patients";

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[]}) => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosisMap, setDiagnosisMap] = useState(new Map());

  const { id }= useParams();
  useEffect(() => {
    if (id){
      patientService.getOne(id).then(data => {
        setPatient(data);
      });
    }
  }, [id]);

  useEffect(() => {
    const arrayForMap = diagnoses.map(d => [d.code, d.name] as [string, string]);
    console.log(arrayForMap);
    const diagMap = new Map(arrayForMap);
    setDiagnosisMap(diagMap);
  }, [diagnoses]);

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
              {entry.diagnosisCodes?.map(dc => {
                return (
                  <li key={dc}>{dc}: {diagnosisMap.get(dc)}</li>
                );
              })}
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