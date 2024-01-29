import React from 'react';

const LocalStorageContent = () => {
  // Récupérez les données du localStorage
  const annoncesVisitees = JSON.parse(localStorage.getItem('annoncesVisitees')) || [];
  console.log('Annonces visitées :', annoncesVisitees);

  return (
    <div>
      <h2>Contenu du Historique</h2>
      <ul>
        {annoncesVisitees.map((annonce, index) => (
          <li key={index}>
            <strong>Année:</strong> {annonce.annee}, <strong>Catégorie:</strong> {annonce.categorieId}, <strong>Consommation:</strong> {annonce.consommation}
            {/* Ajoutez d'autres détails de l'annonce ici */}
            <br />
            <strong>Prix:</strong> {annonce.prix}
            <br />
            <strong>Image:</strong> <img src={annonce.images[0].base64} alt={`Image de l'annonce ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocalStorageContent;
