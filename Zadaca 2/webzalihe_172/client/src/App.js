import './App.css';
import {BrowserRouter as Router, Route, Link, Routes, useNavigate} from 'react-router-dom';
import Proizvodi from "./pages/Proizvodi";
import CreateProizvod from './pages/CreateProizvod';
import ProizvodniProcesi from './pages/ProizvodniProcesi';
import CreateProizvodniProces from './pages/CreateProizvodniProces';
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import ChangePassword from "./pages/ChangePassword"
import Dobavljaci from "./pages/Dobavljaci"
import CreateDobavljac from "./pages/CreateDobavljac"
import UpdateDobavljac from './pages/UpdateDobavljac';
import Sirovine from './pages/Sirovine';
import CreateSirovina from "./pages/CreateSirovina"
import UpdateSirovina from './pages/UpdateSirovina';
import Korisnici from './pages/Korisnici';
import UpdateKorisnik from './pages/UpdateKorisnik';
import UpdateProizvodniProces from './pages/UpdateProizvodniProces';
import UpdateProizvod from './pages/UpdateProizvod';

function App() {

  

  const [authState, setAuthState] = useState({
    korisnicko_ime: "",
    id: 0,
    uloga: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/korisnici/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            korisnicko_ime: response.data.korisnicko_ime,
            id: response.data.id,
            uloga: response.data.uloga,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ korisnicko_ime: "", id: 0, uloga: "", status: false });
    window.location.reload(true);
  };


  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
          <div className="links">
          {!authState.status ? (
                <>
                <Link to="/login"> Login</Link>
                </>
                ) : (
                  <>
                    <Link to='/changepassword'>Promjena Passworda</Link>
                    <div className="dropdown">
                      <button className="dropbtn">Proizvodi
                      </button>
                      <div className="dropdown-content">
                      <Link to='/proizvodi'>Pregled proizvoda</Link>
                      <Link to='/createproizvod'>Novi proizvod</Link>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button className="dropbtn">Proizvodni procesi
                      </button>
                      <div className="dropdown-content">
                      <Link to='/proizvodniprocesi'>Pregled proizvodnih procesa</Link>
                      <Link to='/createproizvodniproces'>Novi proizvodni proces</Link>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button className="dropbtn">Dobavljaci
                      </button>
                      <div className="dropdown-content">
                      <Link to='/dobavljaci'>Pregled dobavljaca</Link>
                      <Link to='/createdobavljac'>Novi dobavljac</Link>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button className="dropbtn">Sirovine
                      </button>
                      <div className="dropdown-content">
                      <Link to='/sirovine'>Pregled sirovina</Link>
                      <Link to='/createsirovina'>Nova sirovina</Link>
                      </div>
                    </div>
                  </>
                  )}
            {authState.uloga === "admin" && (
                <>
                    <div className="dropdown">
                      <button className="dropbtn">Korisnici
                      </button>
                      <div className="dropdown-content">
                      <Link to='/users'>Pregled korisnika</Link>
                      <Link to='/registration'>Novi korisnik</Link>
                      </div>
                    </div>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.korisnicko_ime} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
            </div>
          <Routes>
            <Route path='/proizvodi' exact element={<Proizvodi />} />
            <Route path='/createproizvod' exact element={<CreateProizvod />} />
            <Route path='/proizvodniprocesi' exact element={<ProizvodniProcesi />} />
            <Route path='/createproizvodniproces' exact element={<CreateProizvodniProces />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/registration' exact element={<Registration />} />
            <Route path='/changepassword' exact element={<ChangePassword />} />
            <Route path='/dobavljaci' exact element={<Dobavljaci />} />
            <Route path='/createdobavljac' exact element={<CreateDobavljac />} />
            <Route path='/dobavljac/:id' exact element={<UpdateDobavljac />} />
            <Route path='/sirovine' exact element={<Sirovine />} />
            <Route path='/createsirovina' exact element={<CreateSirovina />} />
            <Route path='/sirovina/:id' exact element={<UpdateSirovina />} />
            <Route path='/users' exact element={<Korisnici />} />
            <Route path='/korisnik/:id' exact element={<UpdateKorisnik />} />
            <Route path='/proizvodniproces/:id' exact element={<UpdateProizvodniProces />} />
            <Route path='/proizvod/:id' exact element={<UpdateProizvod />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
