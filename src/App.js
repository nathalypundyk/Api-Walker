import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useParams } from 'react-router-dom';

const App = () => {
  const [resource, setResource] = useState('people');
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://swapi.dev/api/${resource}/${id}/`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Estos no son los droides que está buscando');
      setData(null);
    }
  };

  return (
    <div>
      <select value={resource} onChange={(e) => setResource(e.target.value)}>
        <option value="people">People</option>
        <option value="planets">Planets</option>
        <option value="starships">Starships</option>
        <option value="vehicles">Vehicles</option>
        <option value="species">Species</option>
      </select>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && (
        <div>
          <p>{error}</p>
          <img src="https://media0.giphy.com/media/3o84sx3H5SlSZ2qZdS/giphy.gif?cid=6c09b952peldj617n73i32rvgsnkpvemy2dexiigl8cp8nbc&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" alt="Obi-Wan Kenobi" />
        </div>
      )}

      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Height: {data.height}</p>
          <p>Mass: {data.mass}</p>
          <p>Hair Color: {data.hair_color}</p>
          <p>Skin Color: {data.skin_color}</p>
        </div>
      )}

      <Routes>
        <Route path="/" element={<h2>Select a resource and enter an ID to search</h2>} />
        <Route path="/:id" element={<PersonDetail />} />
      </Routes>
    </div>
  );
};

const PersonDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
        setData(response.data);
      } catch (err) {
        setData(null);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {data ? (
        <div>
          <h2>{data.name}</h2>
          <p>Height: {data.height}</p>
          <p>Mass: {data.mass}</p>
          <p>Hair Color: {data.hair_color}</p>
          <p>Skin Color: {data.skin_color}</p>
        </div>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
};

export default App;
