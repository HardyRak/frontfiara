import './App.css';
import ListUtilisateursComponent from './components/ListUtilisateursComponent';
import ListMarqueComponent from './components/ListeMarqueComponent';
import ListPaysComponent from './components/ListePaysComponent';
import ListParamCommissionComponent from './components/ListeParamCommission';
import ListeMessage from './components/BoiteMessafeComponent';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UtilisateursComponent from './components/UtilisateursComponent';
import UserEntityComponent from './components/UserEntityComponent ';
import MarqueComponent from './components/MarqueComponent';
import PaysComponent from './components/PaysComponent';
import ParamCommissionComponent from './components/ParamCommissionComponent';
import UpdateParamCommissionComponent from './update/UpdateParamCommissionComponent';
import Sidebar from './components/Sidebar';

import History from './components/LocalStorageContent';
import UpdateUtilisateursComponent from './update/UpdateUtilisateursComponent';
import AddAnnonceComponent from './components/AddAnnonceComponent'
import HeaderComponent from './components/HeaderComponent'; // Import du HeaderComponent
import FavorieComponent from './components/FavorieComponent'
import LoginComponent from './components/LoginComponent';
import AnnonceComponent from './components/FavorieComponent';
import Component from './components/AnnonceComponent';
function App() {
  return (
    <>
      <BrowserRouter>
      <Sidebar />

        <Routes>
          
          {/* http://localhost:3000 */}
         <Route path="/" element={<UserEntityComponent />} />  
          {/* http://localhost:3000/Utilisateurs */}
          <Route path="/utilisateurs" element={<ListUtilisateursComponent />} />
         { /* http://localhost:3000/addUtilisateurs */}
         <Route path="/add-utilisateurs" element={<UtilisateursComponent />} />

          {/* http://localhost:3000/update-utilisateurs/:utilisateursId */}
         <Route path="/update-utilisateurs/:utilisateursId" element={<UpdateUtilisateursComponent />} />
          <Route path='/login' element={<LoginComponent></LoginComponent>} ></Route>
          <Route path="/listeAnnonce" element={<Component></Component>}></Route>
         {/* http://localhost:3000 */}
          {/*<Route path="/" element={<ListMarqueComponent />} />  */} 
          {/* http://localhost:3000/Marque */}
          <Route path="/marque" element={<ListMarqueComponent />} />
         { /* http://localhost:3000/addMarque */}
         <Route path="/add-marque" element={<MarqueComponent />} />


          {/* http://localhost:3000 */}
         {/*<Route path="/" element={<ListPaysComponent />} /> */} 
          {/* http://localhost:3000/Pays */}
          <Route path="/pays" element={<ListPaysComponent />} />
         { /* http://localhost:3000/addPays */}
         <Route path="/add-pays" element={<PaysComponent />} />
      

        {/* http://localhost:3000 */}
    {/*  <Route path="/" element={<ListParamCommissionComponent />} />*/}   
          {/* http://localhost:3000/Pays */}
          <Route path="/paramCommission" element={<ListParamCommissionComponent />} />
         { /* http://localhost:3000/addPays */}
         <Route path="/add-paramCommission" element={<ParamCommissionComponent />} />
        {/* http://localhost:3000/update-paramCommission/:paramCommissionId */}
        <Route path="/update-paramCommission/:paramCommissionId" element={<UpdateParamCommissionComponent />} />

        <Route path="/listeUtilisateur" element={<ListUtilisateursComponent></ListUtilisateursComponent>}></Route>

        <Route path="/AddAnnonceComponent" element={<AddAnnonceComponent />} />


        <Route path="/FavorieComponent" element={<FavorieComponent />} />

        <Route path="/boiteMessage" element={<ListeMessage />} />

        <Route path="/Hitorique" element={<History />} />

        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;