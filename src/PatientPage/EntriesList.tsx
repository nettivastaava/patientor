import React from 'react';
import { Entry } from '../types';

const EntriesList = ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      <h3>entries</h3>
        {entries.map(entry => (
          <div key={entry.id}>
            <p>{entry.date} {entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map(code => (
                <li key={code}>{code}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default EntriesList;