import React, { useEffect, useState } from "react";
import { listUtilisateurs, deleteUtilisateurs, getByIdUtilisateurs  } from "../services/UtilisateursService";
import { useNavigate } from "react-router-dom";

const ListUtilisateursComponent = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [searchText, setSearchText] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = () => {
    listUtilisateurs()
      .then((response) => {
        setUtilisateurs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addUtilisateurs = () => {
    navigate('/add-utilisateurs');
  };

  const deleteUtilisateur = (utilisateurId) => {
    deleteUtilisateurs(utilisateurId)
      .then(() => {
        fetchUtilisateurs(); // Rafraîchir la liste après la suppression
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const searchUtilisateur = () => {
    getByIdUtilisateurs(searchText)
      .then((response) => {
        setUtilisateurs([response.data]); // Mettre uniquement le résultat de la recherche dans la liste
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  function handleUpdate(utilisateurId) {
    navigator(`/update-utilisateur/${utilisateurId}`);
  }
  return (
    <div className='container'>
      <h2 className='text-center'>Liste des Utilisateurs</h2>
      <button className='btn btn-primary mb-2' onClick={addUtilisateurs}>Ajouter un Utilisateur</button>
      <div className='mb-2'>
        <input type='text' value={searchText} onChange={handleSearchChange} placeholder='Rechercher un utilisateur' />
        <button className='btn btn-primary' onClick={searchUtilisateur}>Rechercher</button>
      </div>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénoms</th>
            <th>Date de Naissance</th>
            <th>Genre</th>
            <th>Nationalité</th>
            <th>Mail</th>
            <th>Mot de Passe</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((utilisateur) => (
            <tr key={utilisateur.id}>
              <td>{utilisateur.id}</td>
              <td>{utilisateur.nom}</td>
              <td>{utilisateur.prenoms}</td>
              <td>{utilisateur.dateNaissance}</td>
              <td>{utilisateur.genre}</td>
              <td>{utilisateur.nationalite}</td>
              <td>{utilisateur.mail}</td>
              <td>{utilisateur.motDePasse}</td>
              <td>{utilisateur.isAdmin ? 'True' : 'false'}</td>              <td>
                <button className='btn btn-danger' onClick={() => deleteUtilisateur(utilisateur.id)}>Supprimer</button>
                <button className='btn btn-primary' onClick={() => handleUpdate(utilisateur.id)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUtilisateursComponent;