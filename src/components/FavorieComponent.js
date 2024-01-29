import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, Button, Input, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import AnnonceService from '../services/AnnonceService';
import FavorieService from '../services/favorieService';

export default function AnnonceComponent() {
  const [annonces, setAnnonces] = useState([]);
  const [selectedAnnonce, setSelectedAnnonce] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState(""); // Ajoutez le state pour userId

  useEffect(() => {
    fetchAnnonces();
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur depuis le localStorage ou toute autre source
    setUserId(storedUserId);
  }, []);

  const fetchAnnonces = async () => {
    try {
      const response = await AnnonceService.getAllAnnoncesFilter();
      setAnnonces(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des annonces :', error);
    }
  };

  const handleOpenDialog = (annonce) => {
    setSelectedAnnonce(annonce);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSearch = () => {
    // Logique de recherche ici
  };

  const handleAjouterAuxFavoris = (annonceId) => {
    FavorieService.ajouterAnnonceAuxFavoris(userId, annonceId)
      .then(response => {
        console.log(response.data); // Affichez le message de succès
      })
      .catch(error => {
        console.error(error); // Gérez les erreurs
      });
  };

  return (
    <section className="w-full py-12">
      <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Favorie</h1>
        <p className="text-gray-500 dark:text-gray-400"></p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {searchResults.length > 0 ? (
          searchResults.map((annonce, index) => (
            <Card key={index}>
              <CardHeader>
                {annonce.modele}
              </CardHeader>
              <CardContent>
                <img
                  alt={annonce.modele}
                  className="rounded-lg object-cover w-full aspect-square"
                  height={200}
                  src={annonce.images[0].base64}
                  width={200} />
                <p className="text-sm leading-none">Marque : {annonce.marqueId}</p>
                <p className="text-sm leading-none">Modèle : {annonce.modele}</p>
                <p className="text-sm leading-none">Année : {annonce.annee}</p>
                <p className="text-sm leading-none">Prix : {annonce.prix}</p>
              </CardContent>
              <Button onClick={() => handleAjouterAuxFavoris(annonce.id)}>
                Ajouter aux favoris
              </Button>
            </Card>
          ))
        ) : (
          annonces.map((annonce, index) => (
            <Card key={index}>
              <CardHeader>
                {annonce.modele}
              </CardHeader>
              <CardContent>
                <img
                  alt={annonce.modele}
                  className="rounded-lg object-cover w-full aspect-square"
                  height={200}
                  src={annonce.images[0].base64}
                  width={200} />
                <p className="text-sm leading-none">Marque : {annonce.marqueId}</p>
                <p className="text-sm leading-none">Modèle : {annonce.modele}</p>
                <p className="text-sm leading-none">Année : {annonce.annee}</p>
                <p className="text-sm leading-none">Prix : {annonce.prix}</p>
              </CardContent>
          
            </Card>
          ))
        )}
      </div>
      {selectedAnnonce && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Détails de l'annonce</DialogTitle>
          <DialogContent>
            <p>Marque : {selectedAnnonce.marqueId}</p>
            <p>Modèle : {selectedAnnonce.modele}</p>
            <p>Année : {selectedAnnonce.annee}</p>
            <p>Prix : {selectedAnnonce.prix}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Fermer</Button>
          </DialogActions>
        </Dialog>
      )}
    </section>
  );
}
