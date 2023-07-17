import React, { useState, useEffect } from 'react';
import './AddElevForm.css';

const AddElevForm = () => {
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [telefon, setTelefon] = useState('');
  const [liceuId, setLiceuId] = useState('');
  const [liceeList, setLiceeList] = useState([]);
  const [eleviList, setEleviList] = useState([]);

  useEffect(() => {
    fetchLicee();
    fetchElevi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newElev = { nume, prenume, telefon, liceu_id: liceuId };

    try {
      const response = await fetch('http://localhost:8080/api/v1/elev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newElev),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Elev added successfully:', data);

      // Clear the input fields after successfully adding a new elev
      setNume('');
      setPrenume('');
      setTelefon('');
      setLiceuId('');

      fetchElevi(); // Refresh the elevi list after adding a new elev
    } catch (error) {
      console.error('Error adding elev:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/elev/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Elev deleted successfully:', id);
      fetchElevi(); // Refresh the elevi list after deleting an elev
    } catch (error) {
      console.error('Error deleting elev:', error);
    }
  };

  const fetchLicee = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/liceu');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLiceeList(data);
    } catch (error) {
      console.error('Error fetching licee:', error);
    }
  };

  const fetchElevi = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/elev');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEleviList(data);
    } catch (error) {
      console.error('Error fetching elevi:', error);
    }
  };

  return (
    <div className="add-elev-form-page">
      <div className="add-elev-form-wrapper">
        <div className="add-elev-form">
          <form onSubmit={handleSubmit}>
            <label>
              Nume Elev:
              <input type="text" value={nume} onChange={(e) => setNume(e.target.value)} />
            </label>
            <label>
              Prenume Elev:
              <input type="text" value={prenume} onChange={(e) => setPrenume(e.target.value)} />
            </label>
            <label>
              Telefon Elev:
              <input type="text" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
            </label>
            <label>
              Liceu:
              <select value={liceuId} onChange={(e) => setLiceuId(e.target.value)}>
                <option value="">Alege un liceu</option>
                {liceeList.map((liceu) => (
                  <option key={liceu.id} value={liceu.id}>
                    {liceu.nume}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Adauga Elev</button>
          </form>
        </div>

        <div className="elevi-list">
          <h2>Elevi prezenti in baza de date:</h2>
          <ul>
            {eleviList.map((elev) => (
              <li key={elev.id}>
                {elev.nume} {elev.prenume} - {elev.telefon}
                <button onClick={() => handleDelete(elev.id)}>Sterge</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddElevForm;
