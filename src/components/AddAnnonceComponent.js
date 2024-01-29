import React, { useState } from 'react';
import AnnonceService from '../services/AnnonceService';

const AnnonceForm = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  const [annonce, setAnnonce] = useState({
    id: '',
    proprietaireId: '',
    categorieId: '',
    marqueId: '',
    modele: '',
    typeMoteurId: '',
    consommation: '',
    nombrePlace: '',
    nombrePorte: '',
    annee: '',
    kilometrage: '',
    provenanceId: '',
    prix: '',
    statut: '',
    dateAnnonce: currentDate,
    images: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnnonce((prevAnnonce) => ({
      ...prevAnnonce,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = {
        nomImage: file.name,
        base64: reader.result,
      };

      setAnnonce((prevAnnonce) => ({
        ...prevAnnonce,
        images: [...prevAnnonce.images, imageData],
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AnnonceService.saveAnnonce(annonce)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h3 style={styles.heading}>Informations de l'annonce</h3>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={annonce.id}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="proprietaireId"
            placeholder="ID du propriétaire"
            value={annonce.proprietaireId}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="categorieId"
            placeholder="ID de la catégorie"
            value={annonce.categorieId}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="marqueId"
            placeholder="ID de la marque"
            value={annonce.marqueId}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="modele"
            placeholder="Modèle"
            value={annonce.modele}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="typeMoteurId"
            placeholder="ID du type de moteur"
            value={annonce.typeMoteurId}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="consommation"
            placeholder="Consommation"
            value={annonce.consommation}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="nombrePlace"
            placeholder="Nombre de places"
            value={annonce.nombrePlace}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="nombrePorte"
            placeholder="Nombre de portes"
            value={annonce.nombrePorte}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="annee"
            placeholder="Année"
            value={annonce.annee}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="kilometrage"
            placeholder="Kilométrage"
            value={annonce.kilometrage}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="provenanceId"
            placeholder="ID de la provenance"
            value={annonce.provenanceId}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="prix"
            placeholder="Prix"
            value={annonce.prix}
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="text"
            name="statut"
            placeholder="Statut"
            value={annonce.statut}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.input}
          />
        </label>
        {annonce.images.map((image, index) => (
          <div key={index} style={styles.imagePreview}>
            <p>Nom de l'image: {image.nomImage}</p>
            <img src={image.base64} alt="Aperçu de l'image" style={{ width: '200px' }} />
          </div>
        ))}
        <button type="submit" style={styles.button}>
          Enregistrer
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url("image/background2.jpg")',
    backgroundSize: 'cover',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  input: {
    flex: 1,
    margin: '0 5px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    background: '#6C40C3',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '10px',
  },
  imagePreview: {
    marginTop: '10px',
  },
};

export default AnnonceForm;
