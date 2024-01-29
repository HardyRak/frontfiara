import React, { useEffect, useState } from "react";
import { listParamCommissionne, getByIdParamCommission, deleteParamCommission } from "../services/ParamCommissionService";
import { useNavigate } from "react-router-dom";

const ListParamCommissionComponent = () => {
  const [paramCommissions, setParamCommissions] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    listParamCommissionne()
      .then((response) => {
        setParamCommissions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function addParamCommission() {
    navigator("/add-paramCommission");
  }

  function handleSearch() {
    if (searchId) {
      getByIdParamCommission(searchId)
        .then((response) => {
          const paramCommissionDetails = response.data;
          setParamCommissions([paramCommissionDetails]);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Si la barre de recherche est vide, afficher tous les paramètres de commission
      listParamCommissionne()
        .then((response) => {
          setParamCommissions(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function handleDelete(paramCommissionId) {
    deleteParamCommission(paramCommissionId)
      .then(() => {
        // Mettre à jour la liste des paramètres de commission après la suppression réussie
        listParamCommissionne()
          .then((response) => {
            setParamCommissions(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleUpdate(paramCommissionId) {
    navigator(`/update-paramCommission/${paramCommissionId}`);
  }

  return (
    <div className="container">
      <h2 className="text-center">Liste des Paramètres de Commission</h2>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher par ID de ParamCommission"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary ml-2" onClick={handleSearch}>
          Rechercher
        </button>
      </div>
      <button className="btn btn-primary mb-2" onClick={addParamCommission}>
        Ajouter ParamCommission
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>minPrix</th>
            <th>maxPrix</th>
            <th>pourcentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paramCommissions.map((paramCommission) => (
            <tr key={paramCommission.id}>
              <td>{paramCommission.id}</td>
              <td>{paramCommission.minPrix}</td>
              <td>{paramCommission.maxPrix}</td>
              <td>{paramCommission.pourcentage}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleUpdate(paramCommission.id)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(paramCommission.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListParamCommissionComponent;