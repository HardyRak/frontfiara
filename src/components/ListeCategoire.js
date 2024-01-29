import React, { useEffect, useState } from 'react';
import { API_URL } from '../services/config_url';

const ListeCategorie = () => {
  const [data, setData] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetch(API_URL+'/api/categorie/all')
      .then(response => response.json())
      .then((dataFromApi) => setData(dataFromApi))
      .catch(error => console.error('Erreur lors de la récupération des données depuis l\'API:', error));
  }, []);

  const handleDelete = async (idCategorie) => {
    setItemToDelete(idCategorie);
    setConfirmationVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (itemToDelete !== null) {
        const response = await fetch(API_URL+`/api/categorie/delete/${itemToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setData(prevData => prevData.filter(element => element.idCategorie !== itemToDelete));
          setItemToDelete(null);
          setConfirmationVisible(false);
        } else {
          console.error('Erreur lors de la suppression depuis l\'API:', response.statusText);
        }
      }
    } catch (error) {
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setConfirmationVisible(false);
  };

  const styles = {
    body: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    table: {
      borderCollapse: 'collapse',
      width: '80%',
      marginTop: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    th: {
      border: '1px solid #ddd',
      padding: '12px',
      textAlign: 'left',
      backgroundColor: '#f2f2f2',
      borderBottom: '2px solid #ddd',
    },
    td: {
      border: '1px solid #ddd',
      padding: '12px',
      textAlign: 'left',
    },
    evenRow: {
      backgroundColor: '#f9f9f9',
    },
    oddRow: {
      backgroundColor: '#ffffff',
    },
    deleteButton: {
      backgroundColor: '#ff6666',
      color: '#ffffff',
      padding: '8px',
      border: 'none',
      cursor: 'pointer',
    },
    confirmationButton: {
      backgroundColor: '#ff6666',
      color: '#ffffff',
      padding: '8px',
      border: 'none',
      cursor: 'pointer',
    },
    confirmationButtonA: {
      backgroundColor: '#48C66D',
      color: '#ffffff',
      padding: '8px',
      border: 'none',
      cursor: 'pointer',
      marginLeft: 5,
    },
    confirmationModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: confirmationVisible ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center',
    },
    confirmationBox: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
    },
    title: {
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.body}>
      <h2 style={styles.title}>Liste d'éléments :</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Nom</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr key={element.idCategorie} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
              <td style={styles.td}>{element.idCategorie}</td>
              <td style={styles.td}>{element.nom}</td>
              <td style={{ ...styles.td, textAlign: 'center' }}>
                <button style={styles.deleteButton} onClick={() => handleDelete(element.idCategorie)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmationVisible && (
        <div style={styles.confirmationModal}>
          <div style={styles.confirmationBox}>
            <p>Confirmez-vous la suppression de l'élément ?</p>
            <button style={styles.confirmationButton} onClick={handleConfirmDelete}>
              Confirmer
            </button>
            <button style={styles.confirmationButtonA} onClick={handleCancelDelete}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeCategorie;
