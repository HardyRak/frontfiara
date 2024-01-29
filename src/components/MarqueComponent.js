import React, { useState } from "react";
import { creaMarque } from "../services/MarqueService";
import { useNavigate } from "react-router-dom";

const MarqueComponent = () => {
  const [nom, setNom] = useState('');

  const navigate = useNavigate();
  function saveMarque(e) {
    e.preventDefault(); // Pour éviter que le formulaire ne soit soumis automatiquement
  
    if (!nom.trim()) {
      console.error('Le nom de la marque ne peut pas être vide.');
      // Ajoutez une logique pour informer l'utilisateur de l'erreur, par exemple, afficher un message d'erreur.
      return;
    }
  
    const marque = { nom };
    console.log(marque);
  
    creaMarque(marque)
      .then((reponse) => {
        console.log(reponse.data);
        navigate('/marque');
      })
      .catch((error) => {
        console.error('Erreur lors de la création de la marque :', error);
        // Ajoutez une logique pour informer l'utilisateur de l'erreur, par exemple, afficher un message d'erreur.
      });
  }
  
  
  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className='text-center'>Add Marque</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Nom</label>
                <input
                  type='text'
                  placeholder='Entre un nom'
                  name='nom'
                  value={nom}
                  className='form-control'
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>

              <br />
              <button className='btn btn-success' onClick={saveMarque}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueComponent;