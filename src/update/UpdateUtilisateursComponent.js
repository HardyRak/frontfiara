import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getByIdUtilisateurs, updateUtilisateurs } from "../services/UtilisateursService";

const UpdateUtilisateursComponent = () => {
  const { UtilisateursId } = useParams();
  const navigate = useNavigate();
  const [utilisateurs, setUtilisateurs] = useState({});
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [genreOptions, setGenreOptions] = useState([]);
  const [genre, setGenre] = useState("");
  const [nationaliteOptions, setNationaliteOptions] = useState([]);
  const [nationalite, setNationalite] = useState("");
  const [mail, setMail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getByIdUtilisateurs(UtilisateursId)
      .then((response) => {
        const UtilisateursData = response.data;
        setUtilisateurs(UtilisateursData);
        setNom(UtilisateursData.nom);
        setPrenoms(UtilisateursData.prenoms);
        setDateNaissance(UtilisateursData.dateNaissance);
        setGenre(UtilisateursData.genre);
        setNationalite(UtilisateursData.nationalite);
        setMail(UtilisateursData.mail);
        setMotDePasse(UtilisateursData.motDePasse);
        setIsAdmin(UtilisateursData.isAdmin);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [UtilisateursId]);

  function handleUpdate() {
    const updatedUtilisateurs = {
      ...utilisateurs,
      nom: nom,
      prenoms: prenoms,
      dateNaissance: dateNaissance,
      genre: genre,
      nationalite: nationalite,
      mail: mail,
      motDePasse: motDePasse,
      isAdmin: isAdmin
    };

    updateUtilisateurs(UtilisateursId, updatedUtilisateurs)
      .then(() => {
        navigate("/list-utilisateurs");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">Modifier l'utilisateur</h2>
      <form>
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Prénoms:</label>
          <input
            type="text"
            className="form-control"
            value={prenoms}
            onChange={(e) => setPrenoms(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date de naissance:</label>
          <input
            type="text"
            className="form-control"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
          />
        </div>
        {/* Reste du formulaire */}
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateUtilisateursComponent;