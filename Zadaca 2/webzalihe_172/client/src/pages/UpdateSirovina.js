import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';


function UpdateSirovina() {
    let {id} = useParams();
    const [listOfDobavljaci, setListOfDobavljaci] = useState([]);
    const [nazivObj, setNazivObj] = useState("");
    const [kolicinaObj, setKolicinaObj] = useState("");
    const [min_kolicinaObj, setMin_kolicinaObj] = useState("");
    const [cijenaObj, setCijenaObj] = useState("");
    const [jedinica_mjereObj, setJedinica_mjereObj] = useState("");
    const [da_li_se_koristiObj, setDa_li_se_koristiObj] = useState("");
    const [dobavljac_idObj, setDobavljac_idObj] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");}
          else{
          axios.get(`http://localhost:3001/sirovine/byId/${id}`).then( (response) =>{
            setNazivObj(response.data.naziv);
            setKolicinaObj(response.data.kolicina);
            setMin_kolicinaObj(response.data.min_kolicina);
            setCijenaObj(response.data.cijena);
            setJedinica_mjereObj(response.data.jedinica_mjere);
            setDa_li_se_koristiObj(response.data.da_li_se_koristi);
            setDobavljac_idObj(response.data.dobavljac_id);
          });
          axios.get("http://localhost:3001/dobavljaci").then((response) =>{
            setListOfDobavljaci(response.data);
          });
        };
      }, []);
    
      const onSubmit = (data) => {
        axios.put(
            "http://localhost:3001/sirovine",
            {
              id: id,
              naziv: nazivObj,
              kolicina: kolicinaObj,
              min_kolicina: min_kolicinaObj,
              cijena: cijenaObj,
              jedinica_mjere: jedinica_mjereObj,
              da_li_se_koristi: da_li_se_koristiObj,
              dobavljac_id: dobavljac_idObj,
            }
          );
          navigate("/sirovine");
      };

      return (
        <form method="post" onSubmit={onSubmit}>
          <h1>Uredi sirovinu</h1>
          <div className="formContainer">
            <label>Naziv: </label>
            <input 
              name="naziv"
              type="text"
              value={nazivObj}
              id="inputCreatePost"
              placeholder="naziv"
              onChange={(e) => {
                setNazivObj(e.target.value);
              }}
              />
            <label>Kolicina: </label>
            <input 
              name="kolicina"
              value={kolicinaObj}
              type="number"
              id="inputCreatePost"
              placeholder="100"
              onChange={(e) => {
                setKolicinaObj(e.target.value);
              }}
              />
            <label>Minimalna kolicina: </label>
            <input 
              value={min_kolicinaObj}
              name="minimalna_kolicina"
              type="number"
              id="inputCreatePost"
              placeholder="10"
              onChange={(e) => {
                setMin_kolicinaObj(e.target.value);
              }}
              />
              <label>Cijena: </label>
              <input 
                value={cijenaObj}
                name="cijena"
                type="number"
                id="inputCreatePost"
                placeholder="25"
                onChange={(e) => {
                  setCijenaObj(e.target.value);
                }}
              />
              <label>Jedinica mjere: </label>
              <input 
                value={jedinica_mjereObj}
                name="jedinica_mjere"
                type="text"
                id="inputCreatePost"
                placeholder="v"
                onChange={(e) => {
                  setJedinica_mjereObj(e.target.value);
                }}
              />
              <label>Dobavljac:
                <select 
                  name="dobavljac_id"
                  id="inputCreatePost"
                  value={dobavljac_idObj}
                  onChange={(e) => {
                    setDobavljac_idObj(e.target.value);
                  }}
                  >
                  {listOfDobavljaci.map((value, key) => {
                  return(
                    <option value={value.id}>{value.naziv}</option>
                  );
                })}       
                </select>
              </label>
              <label>Da li se koristi? </label>
              <div className="radio">
                <label>
                  <input 
                    name="da_li_se_koristi"
                    type="radio"
                    id="inputCreatePost"
                    value="1"
                    onChange={(e) => {
                      setDa_li_se_koristiObj(e.target.value);
                    }}
                  />Da
                </label>
                <label>
                  <input 
                    name="da_li_se_koristi"
                    type="radio"
                    id="inputCreatePost"
                    value="0"
                    onChange={(e) => {
                      setDa_li_se_koristiObj(e.target.value);
                    }}
                  />Ne
                </label>
              </div>
            <button type="submit"> Uredi sirovinu</button>
          </div>
        </form>
      )
    }

export default UpdateSirovina