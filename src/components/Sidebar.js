import React, { useEffect } from 'react';
import { API_URL_lien } from '../services/config_url';

const Sidebar = () => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    const sidebar = document.querySelector('.sidebar');

    if (token && token !== "") {
      sidebar.classList.add('sidebar-with-token');
    } else {
      sidebar.classList.remove('sidebar-with-token');
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={`sidebar ${token && token !== '' ? 'with-token' : 'without-token'}`} style={styles.sidebar}>
      <h2 style={styles.heading}>
        Varotra fiara {token && token !== '' && '- Connecté'}
      </h2>
      <ul style={styles.ul}>
        <li>
          <a href={API_URL_lien} style={styles.link}>
            Inscription
          </a>
        </li>

        <li>
          <a href={`${API_URL_lien}/login`} style={styles.link}>
            Se connecter
          </a>
        </li>
        <li>
        <a href={`${API_URL_lien}/listeAnnonce`} style={styles.link}>
              Liste des Annonces
            </a>
        </li>
        {token && token !== '' && (
          <>
            <li>
              <a href={`${API_URL_lien}/boiteMessage`} style={styles.link}>
                Message
              </a>
            </li>
            <li>
              <a href={`${API_URL_lien}/marque`} style={styles.link}>
                Marque
              </a>
            </li>
            <li>
              <a href={`${API_URL_lien}/pays`} style={styles.link}>
                Pays
              </a>
            </li>
            <li>
              <a href={`${API_URL_lien}/paramCommission`} style={styles.link}>
                Paramètres de Commission
              </a>
            </li>
            <li>
              <a href={`${API_URL_lien}/FavorieComponent`} style={styles.link}>
                Favori
              </a>
            </li>
            <li>
              <a href={`${API_URL_lien}/Historique`} style={styles.link}>
                Historique
              </a>
            </li>
            <li>
              <a href={`${API_URL_lien}/AddAnnonceComponent`} style={styles.link}>
                Ajouter une annonce
              </a>
            </li>
            <li>
              <a href={`${API_URL_lien}/listeUtilisateur`} style={styles.link}>
                Liste des utilisateur
              </a>
            </li>
          </>
        )}
      </ul>

      {token && token !== '' && (
        <button onClick={handleLogout} style={styles.button}>
          Se déconnecter
        </button>
      )}
    </div>
  );
};

const styles = {
  sidebar: {
    padding: '20px',
    background: '#333',
    color: '#fff',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    color: '#6C40C3',
  },
  ul: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  link: {
    textDecoration: 'none',
    padding: '10px',
    display: 'block',
    marginBottom: '5px',
  },
  button: {
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Sidebar;
