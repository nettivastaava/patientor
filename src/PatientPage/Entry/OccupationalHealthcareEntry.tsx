import WorkIcon from '@mui/icons-material/Work';
import { OccupationalHealthcareEntry } from "../../types";
import { useStateValue } from '../../state';


const OccupationalHealthcareEntryComponent = ({ entry }: { entry: OccupationalHealthcareEntry}) => {
  const [{ diagnoses }, ] = useStateValue();

  const getCodeDescription = (code: string) => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);

    return diagnosis?.name;
  };

  return (
    <div style={{ marginLeft: '.5rem' }}>
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <p>
        {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>{code} {getCodeDescription(code)}</li>
        ))}
      </ul>
      {entry.sickLeave && (
        <p>
          Sick leave {entry.sickLeave.startDate}-{entry.sickLeave.endDate}
        </p>
      )}
      <p>
        diagnose by {entry.specialist}
      </p>
    </div>
  );
};

export default OccupationalHealthcareEntryComponent;