import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import EntryDetails from "./EntryDetails.tsx";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';


const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[]}) => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnosisMap, setDiagnosisMap] = useState(new Map());

  const entryStyles = {
    border: "solid 1px black",
    borderRadius: "5px",
    margin: "10px",
    padding: "2px"
  };

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
          <div key={entry.id} style={entryStyles}>
            <strong>{entry.date}: {entry.description} {entry.type === 'Hospital' ? <LocalHospitalIcon/> : entry.type === 'HealthCheck' ? <FavoriteIcon />: <WorkIcon /> }</strong>
            <p>Patient treated by:   <strong>{entry.specialist}</strong></p>
            <ul>
              {entry.diagnosisCodes?.map(dc => {
                return (
                  <li key={dc}>{dc}: {diagnosisMap.get(dc)}</li>
                );
              })}
            </ul>
            <EntryDetails entry={entry} />
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