import React, { useState, useEffect } from 'react';
import AnnonceService from '../services/AnnonceService';
import FavorieService from '../services/favorieService';
import { envoyerMessage } from '../services/MessageService';
import { Card, CardHeader, CardContent, Button, Input, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import Cookies from 'js-cookie';

export default function Component() {
  const [annonces, setAnnonces] = useState([]);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [annoncesVisitees, setAnnoncesVisitees] = useState([]);

  useEffect(() => {
    fetchAnnonces();
    setToken(localStorage.getItem('token'));
  
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  
    const annoncesVisiteesStorage = localStorage.getItem('annoncesVisitees');
  
    if (annoncesVisiteesStorage) {
      setAnnoncesVisitees(JSON.parse(annoncesVisiteesStorage));
    }
  }, []);
  
  useEffect(() => {
    const annoncesVisiteesStorage = localStorage.getItem('annoncesVisitees');
  
    if (annoncesVisiteesStorage) {
      setAnnoncesVisitees(JSON.parse(annoncesVisiteesStorage));
    }
  }, [localStorage.getItem('annoncesVisitees')]);
  
  useEffect(() => {
    localStorage.setItem('annoncesVisitees', JSON.stringify(annoncesVisitees));
    console.log("Annonces visitées :", annoncesVisitees);
  }, [annoncesVisitees]);
  

  const fetchAnnonces = async () => {
    try {
      const response = await AnnonceService.getAllAnnonces();
      setAnnonces(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces :', error);
    }
  };

  const handleOpenDialog = (annonce) => {
    setSelectedAnnonce(annonce);
    setOpenDialog(true);

    const nouvellesAnnoncesVisitees = [...annoncesVisitees, annonce];
    setAnnoncesVisitees(nouvellesAnnoncesVisitees);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = () => {
    const results = annonces.filter((annonce) => {
      const marque = annonce.marqueId.toLowerCase();
      const modele = annonce.modele.toLowerCase();
      const annee = annonce.annee.toString();
      const prix = annonce.prix.toString();

      return (
        marque.includes(searchQuery.toLowerCase()) ||
        modele.includes(searchQuery.toLowerCase()) ||
        annee.includes(searchQuery) ||
        prix.includes(searchQuery)
      );
    });

    setSearchResults(results);
  };

  const handleEnvoyerMessage = async () => {
    try {
      await envoyerMessage({
        expediteurId: userId,
        proprietaireId: selectedAnnonce.proprietaireId,
        interlocuteurId: localStorage.getItem('userId'),
        contenu: messageContent,
        dateEnvoi: new Date(),
      });

      handleCloseDialog();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  };

  const handleAjouterFavoris = (annonceId) => {
    if (token) {
      FavorieService.ajouterAnnonceAuxFavoris(userId, annonceId);
    } else {
      console.log("L'utilisateur doit être connecté pour ajouter aux favoris");
    }
  };

  return (
    <section className="w-full py-12">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Voitures d'occasion</h1>
            <p className="text-gray-500 dark:text-gray-400">Trouvez la voiture parfaite pour vous.</p>
          </div>
          <form className="flex-1">
            <div className="relative">
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Rechercher une voiture..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outlined" onClick={handleSearch}>Recherche avancée</Button>
          </form>
        </div>
        <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {searchResults.length > 0 ? (
            searchResults.map((annonce, index) => (
              <Card key={index}>
                <CardHeader>{annonce.modele}</CardHeader>
                <CardContent>
                  <img
                    alt={annonce.modele}
                    className="rounded-lg object-cover w-full aspect-square"
                    height={200}
                    src={annonce.images[0].base64}
                    width={200}
                  />
                  <p className="text-sm leading-none">Marque : {annonce.marqueId}</p>
                  <p className="text-sm leading-none">Modèle : {annonce.modele}</p>
                  <p className="text-sm leading-none">Année : {annonce.annee}</p>
                  <p className="text-sm leading-none">Prix : {annonce.prix}</p>
                </CardContent>
                {token && (
                  <>
                    <Button variant="outline" onClick={() => handleOpenDialog(annonce)}>Voir les détails</Button>
                    <Button variant="outline" onClick={() => handleAjouterFavoris(annonce.id)}>Ajouter aux favoris</Button>
                    <Button variant="outline" onClick={() => handleEnvoyerMessage(annonce)}>Envoyer un message</Button>
                  </>
                )}
              </Card>
            ))
          ) : searchQuery !== "" && (
            <p>Aucun résultat trouvé.</p>
          )}
        </div>
      </div>
      {selectedAnnonce && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Détails de l'annonce</DialogTitle>
          <DialogContent>
            <p>Propriétaire : {selectedAnnonce.proprietaireId}</p>
            <p>Statut : {selectedAnnonce.statut}</p>
            <p>Categorie : {selectedAnnonce.categorieId}</p>
            <p>Provenance : {selectedAnnonce.provenanceId}</p>

            <TextField
              label="Contenu du message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Fermer</Button>
            <Button onClick={handleEnvoyerMessage}>Envoyer le message</Button>
          </DialogActions>
        </Dialog>
      )}
    </section>
  );
}
function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}