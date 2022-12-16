import { Entry } from '../types';
import EntryDetails from './EntryDetails';

const EntriesList = ({ entries }: { entries: Entry[] }) => {

  return (
    <div>
      <h3>entries</h3>
        {entries.map(entry => (
          <div key={entry.id} style={{ 
            borderWidth: '2px', 
            borderStyle: 'solid', 
            borderColor: 'black', 
            borderRadius: '10px',
            marginBottom: '.5rem' 
          }}>
            <EntryDetails entry={entry} />
          </div>
        ))}
    </div>
  );
};

export default EntriesList;