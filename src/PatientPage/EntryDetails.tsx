import React from 'react';
import { Entry } from '../types';
import { assertNever } from '../utils';
import HospitalEntryComponent from './Entry/HospitalEntry';
import OccupationalHealthcareEntryComponent from './Entry/OccupationalHealthcareEntry';
import HealthCheckEntryComponent from './Entry/HealthCheckEntry';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;