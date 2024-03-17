import { Entry } from "../types";

const EntryDetails = ({ entry }: { entry: Entry}) => {
  switch(entry.type){
    case 'Hospital':
      return (
        <div>
          <strong>Discharge:</strong> 
            <p>Discharge Date: {entry.discharge.date}</p>
            <p>Discharge Criteria: {entry.discharge.criteria}</p>
        </div>
      );
    case 'HealthCheck':
      return (
        <div>
          <p>Rating: {entry.healthCheckRating}/3 </p>
        </div>
      );
    case 'OccupationalHealthcare': 
        return (
          <div>
            <p>Employer: {entry.employerName}</p>
            <p>Sick Leave: {!entry.sickLeave ? <strong>No sick leave granted</strong>: <p>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>}</p>
          </div>
        );
  }
};

export default EntryDetails;