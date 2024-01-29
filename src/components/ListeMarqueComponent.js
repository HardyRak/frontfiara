import React, { useEffect, useState } from "react";
import { listMarque, getByIdMarque, deleteMarque } from "../services/MarqueService";
import { useNavigate } from "react-router-dom";

const ListMarqueComponent = () => {
  const [marque, setMarque] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
  
    listMarque()
      .then((response) => {
        setMarque(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  function addMarque() {
    navigator("/add-marque");
  }

  function removeMarque(id) {
    console.log(id);
    deleteMarque(id)
      .then((response) => {
        const updatedMarques = marque.filter((m) => m.id !== id);
        setMarque(updatedMarques);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  function handleSearch() {
    if (searchId) {
      getByIdMarque(searchId)
        .then((response) => {
          const marqueDetails = response.data;
          setMarque([marqueDetails]);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      listMarque()
        .then((response) => {
          setMarque(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center">Liste de marque</h2>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par ID de marque"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={handleSearch}>
          Rechercher
        </button>
      </div>
      <button className="btn btn-primary mb-2" onClick={addMarque}>
        Add marque
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {marque.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nom}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeMarque(m.id)}
                >
                  Delete
                </button>
             
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMarqueComponent;