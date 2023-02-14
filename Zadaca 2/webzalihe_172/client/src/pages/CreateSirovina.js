import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function CreateSirovina() {

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
          navigate("/login");
        } else{
            axios.get("http://localhost:3001/dobavljaci").then((response) =>{
              setListOfDobavljaci(response.data);
              setDobavljac_idObj(response.data[0].id);
            });
        };
      }, []);
    
      const onSubmit = (e) => {
        e.preventDefault();
        const data = { 
          naziv: nazivObj, 
          kolicina: kolicinaObj,
          min_kolicina: min_kolicinaObj,
          cijena: cijenaObj,
          jedinica_mjere: jedinica_mjereObj,
          da_li_se_koristi: da_li_se_koristiObj,
          dobavljac_id: dobavljac_idObj,
        };
        axios.post("http://localhost:3001/sirovine", data).then((response) => {
          navigate("/sirovine");
        });
      };

  return (
    <form method="post" onSubmit={onSubmit}>
      <h1>Nova sirovina</h1>
      <div className="formContainer">
        <label>Naziv: </label>
        <input 
          name="naziv"
          type="text"
          id="inputCreatePost"
          placeholder="naziv"
          onChange={(e) => {
            setNazivObj(e.target.value);
          }}
          />
        <label>Kolicina: </label>
        <input 
          name="kolicina"
          type="number"
          id="inputCreatePost"
          placeholder="100"
          onChange={(e) => {
            setKolicinaObj(e.target.value);
          }}
          />
        <label>Minimalna kolicina: </label>
        <input 
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
        <button type="submit"> Dodaj sirovinu</button>
      </div>
    </form>
  )
}

export default CreateSirovina