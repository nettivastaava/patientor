import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue, setFocusedPatient, addEntry } from "../state";
import { EntryFormValues } from './AddEntryModal/AddEntryForm';
import { Patient } from '../types';
import GenderIcon from './GenderIcon';
import EntriesList from './EntriesList';
import AddEntryModal from './AddEntryModal';

const PatientPage = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [{ focused, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  console.log('diag ', diagnoses);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const { data: updatedPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}`,
          values
        );
        dispatch(addEntry(updatedPatient));
        closeModal();
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  React.useEffect(() => {
    if ((!focused || focused.id !== id) && id) {
      void axios.get<void>(`${apiBaseUrl}/ping`);

      const fetchFocusedPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setFocusedPatient(patientFromApi));
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
        <EntriesList entries={focused.entries} />
        <AddEntryModal
           modalOpen={modalOpen}
           onSubmit={submitNewEntry}
           error={error}
           onClose={closeModal}
        />
        <p>
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
        </p>
      </div>
    </div>
  );
};

export default PatientPage;