import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {  HospitalEntry } from "../../types";
import { useStateValue } from '../../state';


const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry}) => {
  const [{ diagnoses }, ] = useStateValue();

  const getCodeDescription = (code: string) => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);

    return diagnosis?.name;
  };

  return (
    <div style={{ marginLeft: '.5rem' }}>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>
        {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>{code} {getCodeDescription(code)}</li>
        ))}
      </ul>
      {entry.discharge && (
        <p>
          {entry.discharge.date} {entry.discharge.criteria}
        </p>
      )}
      <p>
        diagnose by {entry.specialist}
      </p>
    </div>
  );
};

export default HospitalEntryComponent;