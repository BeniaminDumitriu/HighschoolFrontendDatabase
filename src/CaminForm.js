import React, { useState, useEffect } from 'react';
import './AddCaminForm.css';

const AddCaminForm = () => {
  const [numarCamin, setNumarCamin] = useState('');
  const [adresaCamin, setAdresaCamin] = useState('');
  const [numarTotalCamere, setNumarTotalCamere] = useState('');
  const [camineList, setCamineList] = useState([]);

  useEffect(() => {
    fetchCamine();
  }, []);

  const handleSubmitCamin = async (e) => {
    e.preventDefault();
    const newCamin = {
      numar: parseInt(numarCamin),
      adresa: adresaCamin,
      numar_total_camere: parseInt(numarTotalCamere),
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/Camine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCamin),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Camin added successfully:', data);

      // Clear the input fields after successfully adding a new camin
      setNumarCamin('');
      setAdresaCamin('');
      setNumarTotalCamere('');

      fetchCamine(); // Refresh the camine list after adding a new camin
    } catch (error) {
      console.error('Error adding camin:', error);
    }
  };

  const handleDeleteCamin = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/Camine/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Camin deleted successfully:', id);
      fetchCamine(); // Refresh the camine list after deleting a camin
    } catch (error) {
      console.error('Error deleting camin:', error);
    }
  };

 

  const fetchCamine = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/Camine');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCamineList(data);
    } catch (error) {
      console.error('Error fetching camine:', error);
    }
  };

  return (
    <div className="add-camin-form-page">
      <div className="add-camin-form-wrapper">
        <div className="add-camin-form">
          <form onSubmit={handleSubmitCamin}>
            <label>
              Numar Camin:
              <input type="text" value={numarCamin} onChange={(e) => setNumarCamin(e.target.value)} />
            </label>
            <label>
              Adresa Camin:
              <input type="text" value={adresaCamin} onChange={(e) => setAdresaCamin(e.target.value)} />
            </label>
            <label>
              Numar Total Camere:
              <input
                type="text"
                value={numarTotalCamere}
                onChange={(e) => setNumarTotalCamere(e.target.value)}
              />
            </label>
            <button type="submit">Adauga Camin</button>
          </form>
        </div>

        <div className="camine-list">
          <h2>Camine prezente in baza de date:</h2>
          <ul>
            {camineList.map((camin) => (
              <li key={camin.id}>
                {camin.numar} - {camin.adresa} - Numar total camere: {camin.numar_total_camere}
                <button onClick={() => handleDeleteCamin(camin.id)}>Sterge</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCaminForm;
