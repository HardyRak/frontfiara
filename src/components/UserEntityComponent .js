import React, { useState, useEffect } from "react";
import UserEntityService from "../services/UserEntityService";
import { listGenre } from "../services/GenreService";
import { listPays } from "../services/PaysService";
import ListPaysComponent from "./ListePaysComponent";
const UserEntityComponent = () => {
  const [registerDto, setRegisterDto] = useState({
    mail: "",
    username: "",
    prenoms: "",
    dateNaissance: "",
    genre: "",
    password: "",
    nationalite: ""
  });

  const [genres, setGenres] = useState([]);

  const[pays, setPays]=useState([]);

  useEffect(() => {
    fetchGenres(); 
  }, []);

  useEffect(() => {
    fetchPays();
  },[]);

  const fetchPays = () =>{
    listPays()
    .then((reponse) =>{
      setPays(reponse.data)
    })
    .catch((error) => {
      console.error(error);
    })
  };

  const fetchGenres = () => { 
      listGenre()
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRegister = () => {
    UserEntityService.register(registerDto)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>S'inscrire</h2>
      <form style={styles.form}>
        <input
          type="text"
          placeholder="Nom"
          value={registerDto.username}
          onChange={(e) =>
            setRegisterDto({ ...registerDto, username: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Prenom"
          value={registerDto.prenoms}
          onChange={(e) =>
            setRegisterDto({ ...registerDto, prenoms: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="date"
          placeholder="DateNaissance"
          value={registerDto.dateNaissance}
          onChange={(e) =>
            setRegisterDto({ ...registerDto, dateNaissance: e.target.value })
          }
          style={styles.input}
        />
        <select
          value={registerDto.genre}
          onChange={(e) =>
            setRegisterDto({ ...registerDto, genre: e.target.value })
          }
          style={styles.input}
        >
          <option value="">Sélectionnez un genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.nom}
            </option>
          ))}
        </select>
        <select
          value={registerDto.nationalite}
          onChange={(e) =>
            setRegisterDto({ ...registerDto, nationalite: e.target.value })
          }
          style={styles.input}
        >
          <option value="">Sélectionnez votre nationalité</option>
          {pays.map((pays) => (
            <option key={pays.id} value={pays.id}>
              {pays.nom}
            </option>
          ))}
        </select>
        <input
          type="email"
          placeholder="Email"
          value={registerDto.mail}
          onChange={(e) =>
            setRegisterDto({ ...registerDto, mail: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerDto.password}
          onChange={(e) =>
            setRegisterDto({ ...registerDto, password: e.target.value })
          }
          style={styles.input}
        />
        <button type="button" onClick={handleRegister} style={styles.button}>
          S'inscrire
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
    backgroundSize: 'cover',
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
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
    width: '100%',
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
  },
};

export default UserEntityComponent;
