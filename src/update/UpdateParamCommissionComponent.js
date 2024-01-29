import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByIdParamCommission, updateParamCommission } from "../services/ParamCommissionService";

const UpdateParamCommissionComponent = () => {
  const { paramCommissionId } = useParams();
  const [paramCommission, setParamCommission] = useState({});
  const [minPrix, setMinPrix] = useState("");
  const [maxPrix, setMaxPrix] = useState("");
  const [pourcentage, setPourcentage] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    getByIdParamCommission(paramCommissionId)
      .then((response) => {
        const paramCommissionData = response.data;
        setParamCommission(paramCommissionData);
        setMinPrix(paramCommissionData.minPrix);
        setMaxPrix(paramCommissionData.maxPrix);
        setPourcentage(paramCommissionData.pourcentage);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [paramCommissionId]);

  function handleUpdate() {
    const updatedParamCommission = {
      ...paramCommission,
      minPrix: minPrix,
      maxPrix: maxPrix,
      pourcentage: pourcentage,
    };

    updateParamCommission(paramCommissionId, updatedParamCommission)
      .then(() => {
        navigator("/list-paramCommission");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">Modifier le Paramètre de Commission</h2>
      <form>
        <div className="form-group">
          <label>minPrix:</label>
          <input
            type="text"
            className="form-control"
            value={minPrix}
            onChange={(e) => setMinPrix(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>maxPrix:</label>
          <input
            type="text"
            className="form-control"
            value={maxPrix}
            onChange={(e) => setMaxPrix(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>pourcentage:</label>
          <input
            type="text"
            className="form-control"
            value={pourcentage}
            onChange={(e) => setPourcentage(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateParamCommissionComponent;