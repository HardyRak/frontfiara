import "../css/styles.css";
import React, { useState, useEffect } from "react";
import { getBoiteMessagesByProprietaireId, getBoiteMessagesByInterlocuteurId } from "../services/MessageService";

const BoiteMessageList = () => {
  const [boiteMessages, setBoiteMessages] = useState([]);

  useEffect(() => {
    const fetchBoiteMessages = async () => {
      try {
        const proprietaireId = localStorage.getItem("userId");

        const boiteMessagesProprietaire = await getBoiteMessagesByProprietaireId(proprietaireId);
        const boiteMessagesInterlocuteur = await getBoiteMessagesByInterlocuteurId(proprietaireId);

        const combinedBoiteMessages = [...boiteMessagesProprietaire, ...boiteMessagesInterlocuteur];

        setBoiteMessages(combinedBoiteMessages);
      } catch (error) {
        console.error("Erreur lors du chargement des boiteMessages :", error.message);
      }
    };

    fetchBoiteMessages();
  }, []);

  const handleSupprimerMessage = async (messageId) => {
    try {
      const updatedMessages = boiteMessages.filter((message) => message.id !== messageId);
      setBoiteMessages(updatedMessages);
    } catch (error) {
      console.error("Erreur lors de la suppression du message :", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Liste des Messages du Propriétaire</h1>
      <ul style={styles.list}>
        {boiteMessages.map((boiteMessage) => (
          <li key={boiteMessage.id} style={styles.listItem}>
            <p>Propriétaire: {boiteMessage.proprietaireId}</p>
            <p>Interlocuteur: {boiteMessage.interlocuteurId}</p>
            {boiteMessage.listeMessages.map((message, index) => (
              <div key={index} style={styles.messageContainer}>
                <p>Contenu: {message.contenu}</p>
                <p>Date d'envoi: {new Date(message.dateEnvoi).toLocaleString()}</p>
                <br />
              </div>
            ))}
          </li>
        ))}
      </ul>
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
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
    padding: '20px',
  },
  messageContainer: {
    marginBottom: '10px',
  },
};

export default BoiteMessageList;
