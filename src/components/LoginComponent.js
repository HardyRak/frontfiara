import React, { useState } from 'react';
import AnnonceService from '../services/AnnonceService';
import UserEntityService from '../services/UserEntityService';
import { jwtDecode } from 'jwt-decode';

const LoginComponent = () => {
  const [loginDto, setLoginDto] = useState({
    username: "",
    password: ""
  });

  const handleLogin = () => {
      UserEntityService.login(loginDto)
        .then((response) => {
          const token=response.data.accessToken;
          localStorage.setItem("token",token);
          console.log("Token enregistré dans le localStrorage");
          const token2=localStorage.getItem("token");
          const decodeToken=jwtDecode(token2);
          localStorage.setItem("userId",decodeToken.sub);
          console.log('Token decrypet',decodeToken);
          window.location.reload();
        })
        .catch((error) => {
          alert(error);
        });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Varotra fiara</h2>
      <h3 style={styles.subheading}>Se connecter</h3>

      <form style={styles.form}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={loginDto.username}
          onChange={(e) => setLoginDto({ ...loginDto, username: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={loginDto.password}
          onChange={(e) => setLoginDto({ ...loginDto, password: e.target.value })}
          style={styles.input}
        />
        <button type="button" onClick={handleLogin} style={styles.button}>
          Se connecter
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
    backgroundImage: 'url("../image/background2.jpg")',
    backgroundSize: 'cover',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  subheading: {
    textAlign: 'center',
    color: '#555',
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
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    margin: '10px 0',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    background: '#6C40C3',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginComponent;
