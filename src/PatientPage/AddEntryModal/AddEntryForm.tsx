import React, { useState } from 'react';
import { Radio } from '@material-ui/core';
import { newEntry } from '../../types';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';

export interface Props {
  onSubmit: (values: newEntry) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props)  => {
  const [shownForm, setShownForm] = useState('HealthCheck');
  
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          <Radio
            checked={shownForm === 'HealthCheck'}
            onChange={() => setShownForm("HealthCheck")}
            value="HealthCheck"
            inputProps={{ 'aria-label': 'A' }}
          />
          Health check
        </span>
        <span>
          <Radio
            checked={shownForm === 'Hospital'}
            onChange={() => setShownForm("Hospital")}
            value="Hospital"
            inputProps={{ 'aria-label': 'B' }}
          />
          Hospital
        </span>
        <span>
          <Radio
            checked={shownForm === 'OccupationalHealthcare'}
            onChange={() => setShownForm("OccupationalHealthcare")}
            value="OccupationalHealthcare"
            inputProps={{ 'aria-label': 'B' }}
          />
          Occupational healthcare
        </span>
        </div>
        {shownForm === "HealthCheck" ? (
          <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} />
        ) : shownForm === "Hospital" ? (
          <HospitalForm onSubmit={onSubmit} onCancel={onCancel} />
        ) : (
          <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} />
        )}
      </div>
    );
    
    
};

export default AddEntryForm;