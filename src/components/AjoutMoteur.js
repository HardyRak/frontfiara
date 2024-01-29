import React, { useState } from 'react';
import styled from 'styled-components';
import { API_URL } from '../services/config_url';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin-top: 10%;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    background-color: #45a049;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

const DialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DialogBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;

const AjoutMoteur = () => {
  const [formData, setFormData] = useState({
    type: '',
  });

  const [isInsertionSuccess, setIsInsertionSuccess] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    setIsDialogOpen(false);
    try {
      const response = await fetch(API_URL+'/api/moteur/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsInsertionSuccess(true);
      } else {
        setIsInsertionSuccess(false);
        setIsResultDialogOpen(true);
        console.error('Erreur lors de la soumission du formulaire:', response.statusText);
      }
    } catch (error) {
      setIsInsertionSuccess(false);
      setIsResultDialogOpen(true);
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const handleOK = () => {
    setIsResultDialogOpen(false); 
  };

  return (
    <FormContainer>
      <h2>Ajout Moteur</h2>
      <form>
      <FormGroup>
          <Label htmlFor="text">Type du Moteur</Label>
          <Input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="button" onClick={handleSubmit}>
          Ajouté
        </Button>
      </form>
      {isDialogOpen && (
        <DialogContainer>
          <DialogBox>
            <p>Voulez-vous confirmer l'ajout ?</p>
            <ConfirmButton onClick={handleConfirm}>Confirmer</ConfirmButton>
            <CancelButton onClick={handleCancel}>Annuler</CancelButton>
          </DialogBox>
        </DialogContainer>
      )}
      {isResultDialogOpen && (
        <DialogContainer>
          <DialogBox>
            <p>{isInsertionSuccess ? 'Insertion terminée avec succès!' : 'Erreur lors de l\'insertion.'}</p>
            <ConfirmButton onClick={handleOK}>OK</ConfirmButton>
          </DialogBox>
        </DialogContainer>
      )}
    </FormContainer>
  );
};

export default AjoutMoteur;
