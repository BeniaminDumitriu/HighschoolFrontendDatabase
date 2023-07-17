import React, { useState, useEffect } from 'react';
import './AddLiceuForm.css';

const AddLiceuForm = () => {
  const [nume, setNume] = useState('');
  const [adresa, setAdresa] = useState('');
  const [liceele, setLiceele] = useState([]);

  useEffect(() => {
    fetchLiceele();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLiceu = { nume, adresa };

    try {
      const response = await fetch('http://localhost:8080/api/v1/liceu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLiceu),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Liceu added successfully:', data);

      // Clear the input fields after successfully adding a new liceu
      setNume('');
      setAdresa('');

      fetchLiceele(); // Refresh the liceele list after adding a new liceu
    } catch (error) {
      console.error('Error adding liceu:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/liceu?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Liceu deleted successfully:', id);
      fetchLiceele(); // Refresh the liceele list after deleting a liceu
    } catch (error) {
      console.error('Error deleting liceu:', error);
    }
  };

  const fetchLiceele = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/liceu');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLiceele(data);
    } catch (error) {
      console.error('Error fetching liceele:', error);
    }
  };

  return  (
    <div className="add-liceu-form-page">
    <div className="add-liceu-form-wrapper">
      <div className="add-liceu-form">
        <form onSubmit={handleSubmit}>
          <label>
            Nume Liceu:
            <input type="text" value={nume} onChange={(e) => setNume(e.target.value)} />
          </label>
          <label>
            Adresa Liceu:
            <input type="text" value={adresa} onChange={(e) => setAdresa(e.target.value)} />
          </label>
          <button type="submit">Adauga Liceu</button>
        </form>
      </div>

      <div className="licee-list">
        <h2>Licee prezente in baza de date:</h2>
        <ul>
          {liceele.map((liceu) => (
            <li key={liceu.id}>
              {liceu.nume} - {liceu.adresa}
              <button onClick={() => handleDelete(liceu.id)}>Sterge</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    </div>
  );
};

export default AddLiceuForm;
