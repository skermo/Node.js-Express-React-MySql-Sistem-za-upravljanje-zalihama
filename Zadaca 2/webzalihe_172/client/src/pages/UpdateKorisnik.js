import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

function UpdateKorisnik() {
    let {id} = useParams();
    const [korisnicko_imeObj, setKorisnicko_imeObj] = useState("");
    const [sifraObj, setSifraObj] = useState("");
    const [ulogaObj, setUlogaObj] = useState("");
    const [imeObj, setImeObj] = useState("");
    const [prezimeObj, setPrezimeObj] = useState("");
    const [broj_telefonaObj, setBroj_telefonaObj] = useState("");
    const [adresaObj, setAdresaObj] = useState("");
    const [email_adresaObj, setEmail_adresaObj] = useState("");
    const [datum_zaposlenjaObj, setDatum_zaposlenjaObj] = useState("");
    const [datum_otkazaObj, setDatum_otkazaObj] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");}
          else{
          axios.get(`http://localhost:3001/korisnici/byId/${id}`).then( (response) =>{
            setKorisnicko_imeObj(response.data.korisnicko_ime);
            setUlogaObj(response.data.uloga);
            setImeObj(response.data.ime);
            setPrezimeObj(response.data.prezime);
            setBroj_telefonaObj(response.data.broj_telefona);
            setAdresaObj(response.data.adresa);
            setEmail_adresaObj(response.data.email_adresa);
            setDatum_zaposlenjaObj(response.data.datum_zaposlenja);
            setDatum_otkazaObj(response.data.datum_otkaza);
          });
        };
      }, []);

    
      const onSubmit = (data) => {
        axios.put(
            "http://localhost:3001/korisnici",
            {
              id: id,
              korisnicko_ime: korisnicko_imeObj,
              uloga: ulogaObj,
              ime: imeObj,
              prezime: prezimeObj,
              broj_telefona: broj_telefonaObj,
              adresa: adresaObj,
              email_adresa: email_adresaObj,
              datum_zaposlenja: datum_zaposlenjaObj,
              datum_otkaza: datum_otkazaObj
            }
          );
          navigate("/users");
      };

      return (
        <form method="post" onSubmit={onSubmit}>
          <h1>Uredi zaposlenika</h1>
          <div className="formContainer">
            <label>Username: </label>
            <input 
              name="username"
              type="text"
              value={korisnicko_imeObj}
              id="inputCreatePost"
              onChange={(e) => {
                setKorisnicko_imeObj(e.target.value);
              }}
              />
              <label>Uloga:
                <select 
                  name="uloga"
                  id="inputCreatePost"
                  value={ulogaObj}
                  onChange={(e) => {
                    setUlogaObj(e.target.value);
                  }}
                  >
                    <option value="admin">admin</option>   
                    <option value="zaposlenik">zaposlenik</option>     
                </select>
              </label>
            <label>Ime: </label>
            <input 
              value={imeObj}
              name="ime"
              type="text"
              id="inputCreatePost"
              onChange={(e) => {
                setImeObj(e.target.value);
              }}
              />
              <label>Prezime: </label>
              <input 
                value={prezimeObj}
                name="prezime"
                type="text"
                id="inputCreatePost"
                placeholder="25"
                onChange={(e) => {
                  setPrezimeObj(e.target.value);
                }}
              />
              <label>Broj telefona: </label>
              <input 
                value={broj_telefonaObj}
                name="broj_telefona"
                type="text"
                id="inputCreatePost"
                onChange={(e) => {
                  setBroj_telefonaObj(e.target.value);
                }}
              />
              <label>Adresa: </label>
              <input 
                value={adresaObj}
                name="adresa"
                type="text"
                id="inputCreatePost"
                onChange={(e) => {
                  setAdresaObj(e.target.value);
                }}
              />
              <label>Email: </label>
              <input 
                value={email_adresaObj}
                name="email_adresa"
                type="text"
                id="inputCreatePost"
                onChange={(e) => {
                  setEmail_adresaObj(e.target.value);
                }}
              />
              <label>Datum zaposlenja: </label>
              <input 
                value={datum_zaposlenjaObj}
                name="datum_zaposlenja"
                type="date"
                id="inputCreatePost"
                onChange={(e) => {
                  setDatum_zaposlenjaObj(e.target.value);
                }}
              />
              <label>Datum otkaza: </label>
              <input 
                value={datum_otkazaObj}
                name="datum_otkaza"
                type="date"
                id="inputCreatePost"
                onChange={(e) => {
                  setDatum_otkazaObj(e.target.value);
                }}
              />
            <button type="submit"> Uredi korisnika</button>
          </div>
        </form>
      )
    }


export default UpdateKorisnik