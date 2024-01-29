import React, { useState, useEffect } from "react";
import { creaUtilisateurs } from "../services/UtilisateursService";
import { useNavigate } from "react-router-dom";
import { listGenre } from "../services/GenreService"; // Replace "YourServiceFile" with the actual service file name
import { listnationaliter } from "../services/NationaliterService"; // Replace "YourServiceFile" with the actual service file name


const UtilisateursComponent = () => {
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [genreOptions, setGenreOptions] = useState([]);
  const [genre, setGenre] = useState("");
  const [nationaliteOptions, setNationaliteOptions] = useState([]);
  const [nationalite, setNationalite] = useState("");
  const [mail, setMail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    // Fetch genre options
    listGenre()
      .then((response) => {
        setGenreOptions(response.data);
      })
      .catch((error) => {
        console.log("Error fetching genre options:", error);
      });

    // Fetch nationalite options
    listnationaliter()
      .then((response) => {
        setNationaliteOptions(response.data);
      })
      .catch((error) => {
        console.log("Error fetching nationalite options:", error);
      });
  }, []);

  function saveUtilisateurs(e) {
    //e.preventDefaut();

    const utilisateurs = {
      nom,
      prenoms,
      dateNaissance,
      genre,
      nationalite,
      mail,
      motDePasse,
      isAdmin,
    };
    console.log(utilisateurs);
    creaUtilisateurs(utilisateurs)
      .then((reponse) => {
        console.log(reponse.data);
        navigator("/utilisateurs");
      })
      .catch((error) => {
        console.log("Error saving utilisateurs:", error);
      });
  }

  return (
    <div className="container">
      <br></br>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">Add utilisateurs</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  placeholder="Entre un nom"
                  name="nom"
                  value={nom}
                  className="form-control"
                  onChange={(e) => setNom(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Prenom</label>
                <input
                  type="text"
                  placeholder="Entre un prenoms"
                  name="prenoms"
                  value={prenoms}
                  className="form-control"
                  onChange={(e) => setPrenoms(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">dateNaissance</label>
                <input
                  type="date"
                  placeholder="Entre un dateNaissance"
                  name="dateNaissance"
                  value={dateNaissance}
                  className="form-control"
                  onChange={(e) => setDateNaissance(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">genre</label>
                <select
                  name="genre"
                  value={genre}
                  className="form-control"
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value=""></option>
                  {genreOptions.map((option) => (
                    <option key={option.id} value={option.nom}>
                      {option.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Nationalite</label>
                <select
                  name="nationalite"
                  value={nationalite}
                  className="form-control"
                  onChange={(e) => setNationalite(e.target.value)}
                >
                  <option value=""></option>
                  {nationaliteOptions.map((option) => (
                    <option key={option.id} value={option.nom}>
                      {option.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">mail</label>
                <input
                  type="mail"
                  placeholder="Entre un mail"
                  name="mail"
                  value={mail}
                  className="form-control"
                  onChange={(e) => setMail(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">MotDePasse</label>
                <input
                  type="motDePasse"
                  placeholder="Entre un motDePasse"
                  name="motDePasse"
                  value={motDePasse}
                  className="form-control"
                  onChange={(e) => setMotDePasse(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">isAdmin</label>
                <input
  type="checkbox"
  placeholder="Enter a value"
  name="isAdmin"
  checked={isAdmin}
  className="form-control"
  onChange={(e) => setIsAdmin(e.target.checked)}
/>
                <br></br>
                <button className="btn btn-success" onClick={saveUtilisateurs}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilisateursComponent;