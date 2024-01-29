import React, { useState } from "react";
import { creaPays } from "../services/PaysService";
import { useNavigate } from "react-router-dom";

const PaysComponent = () => {
  const [nom, setNom] = useState('');

  const navigate = useNavigate();

  function savePays(e) {
    const pays = { nom };
    console.log(pays);
    creaPays(pays).then((reponse) => {
      console.log(reponse.data);
      navigate('/pays/all');
    });
  }

  return (
    <div className='container'>
      <br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className='text-center'>Add pays</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>Nom</label>
                <input
                  type='text'
                  placeholder='Entre un nom'
                  name='nom'
                  value={nom}
                  className='form-control'
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>

              <br />
              <button className='btn btn-success' onClick={savePays}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaysComponent;