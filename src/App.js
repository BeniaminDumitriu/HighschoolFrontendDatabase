import React, { useState } from 'react';
import './App.css';
import AddLiceuForm from './LiceuForm';
import AddElevForm from './ElevForm';
import AddCaminForm from './CaminForm';

function App() {
  const [activeForm, setActiveForm] = useState('liceu');

  const handleFormChange = (formName) => {
    setActiveForm(formName);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Your logo and other elements */}
        <div className="form-navigation">
          <button
            onClick={() => handleFormChange('liceu')}
            className={activeForm === 'liceu' ? 'active' : ''}
          >
            Liceu
          </button>
          <button
            onClick={() => handleFormChange('elev')}
            className={activeForm === 'elev' ? 'active' : ''}
          >
            Elev
          </button>
          <button
            onClick={() => handleFormChange('camin')}
            className={activeForm === 'camin' ? 'active' : ''}
          >
            Camin
          </button>
        </div>
        {activeForm === 'liceu' && <AddLiceuForm />}
        {activeForm === 'elev' && <AddElevForm />}
        {activeForm === 'camin' && <AddCaminForm />}
      </header>
    </div>
  );
}

export default App;
