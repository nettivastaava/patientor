import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from '@material-ui/core';
import { apiBaseUrl } from '../constants';
import { useStateValue } from "../state";
import { Patient } from '../types';

const PatientPage = () => {
  const [{ focused }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!focused || focused.id !== id) {
      void axios.get<void>(`${apiBaseUrl}/ping`);

      const fetchFocusedPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "SET_FOCUSED_PATIENT", payload: patientFromApi });
        } catch (e) {
          console.error(e);
        }
      };
      void fetchFocusedPatient();
    }
  }, []);

  if (!focused || focused.id !== id) {
    return null;
  }
  const { name } = focused;

  return (
    <div className="App">
      <h2>{name}</h2>
      <Icon />
    </div>
  );
};

export default PatientPage;