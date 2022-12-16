import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import {  HealthCheckEntry, HealthCheckRating } from "../../types";

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry}) => {
  return (
    <div style={{ marginLeft: '.5rem' }}>
      <p>
        {entry.date} <MedicalServicesIcon />
      </p>
      <p>
        {entry.description}
      </p>
      <p>
        {HealthCheckRating[entry.healthCheckRating]}
      </p>
      <p>
        diagnose by {entry.specialist}
      </p>
    </div>
  );
};

export default HealthCheckEntryComponent;