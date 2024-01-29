import React, { useEffect, useState } from "react";
import { listPays, getByIdPays, deletePays } from "../services/PaysService";
import { useNavigate } from "react-router-dom";

const ListPaysComponent = () => {
  const [pays, setPays] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    listPays()
      .then((response) => {
        setPays(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function addPays() {
    navigator("/add-pays");
  }

  function removePays(id) {
    console.log(id);
    deletePays(id)
      .then((response) => {
        const updatedPays = pays.filter((m) => m.id !== id);
        setPays(updatedPays);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  function handleSearch() {
    if (searchId) {
      getByIdPays(searchId)
        .then((response) => {
          const paysDetails = response.data;
          setPays([paysDetails]);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Si la barre de recherche est vide, afficher toutes les payss
      listPays()
        .then((response) => {
          setPays(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="container">
      <h2 className="text-center">Liste de pays</h2>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par ID de pays"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={handleSearch}>
          Rechercher
        </button>
      </div>
      <button className="btn btn-primary mb-2" onClick={addPays}>
        Add pays
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
          {pays.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.nom}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removePays(m.id)}
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

export default ListPaysComponent;