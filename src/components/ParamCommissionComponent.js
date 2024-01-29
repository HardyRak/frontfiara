import React, { useState } from "react";
import { creaParamCommission } from "../services/ParamCommissionService";
import { useNavigate } from "react-router-dom";

const ParamCommissionComponent =() =>{
    const [minPrix, setminPrix] = useState('')
    const [maxPrix, setmaxPrix] = useState('')
    const [pourcentage ,setpourcentage] = useState('')

    const navigator = useNavigate();

    function saveParamCommission (e){
        //e.preventDefaut();

        const paramCommission = {minPrix, maxPrix,pourcentage}
        console.log(paramCommission)
        creaParamCommission(paramCommission).then((reponse)=>{
          console.log(reponse.data);
          navigator('/paramCommission')
        })
    }
    return (

        <div className='container'>
                    <br></br>
                    <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>Add paramCommission</h2>
                        <div className='card-body'>
                            <from>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>MinPrix</label>
                                    <input
                                    type='number'
                                    placeholder='Entre un minPrix'
                                    name='minPrix'
                                    value={minPrix}
                                    className='form-control'
                                    onChange={(e) => setminPrix(e.target.value)}
                                   >

                                    </input>
                                
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>MaxPrix</label>
                                    <input
                                    type='number'
                                    placeholder='Entre un maxPrix'
                                    name='maxPrix'
                                    value={maxPrix}
                                    className='form-control'
                                    onChange={(e) => setmaxPrix(e.target.value)}
                                   >

                                    </input>

                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Pourcentage</label>
                                    <input
                                    type='number'
                                    placeholder='Entre un minPrix'
                                    name='pourcentage'
                                    value={pourcentage}
                                    className='form-control'
                                    onChange={(e) => setpourcentage(e.target.value)}
                                   >

                                    </input>

                                    <br></br>
                                <button className='btn btn-success' onClick={saveParamCommission}>Submit</button>
                                </div>
                            </from>
                        </div>
                    </div>

                    </div>

        </div>
    )
}
export default ParamCommissionComponent