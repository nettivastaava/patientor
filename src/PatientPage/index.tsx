import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue } from "../state";
import { Patient } from '../types';
import GenderIcon from './GenderIcon';

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
  const { name, gender, ssn, occupation } = focused;

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <h2 style={{
          marginRight: '1rem'
        }}>{name}</h2>
        <GenderIcon gender={gender} />
      </div>
      <div>
        <p>
          ssh: {ssn}
        </p>
        <p>
          occupation: {occupation}
        </p>
      </div>
    </div>
  );
};

export default PatientPage;