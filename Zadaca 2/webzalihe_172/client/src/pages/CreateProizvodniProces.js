import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function CreateProizvodniProces() {

const [listOfSirovine, setListOfSirovine] = useState([]);
const [nazivObj, setNazivObj] = useState("");
const [kolicinaObj, setKolicinaObj] = useState("");
const [cijenaObj, setCijenaObj] = useState("");
const [datum_pocetkaObj, setDatum_pocetkaObj] = useState("");
const [sirovina_idObj, setSirovina_idObj] = useState("");
let navigate = useNavigate();

      useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
        } else{
            axios.get("http://localhost:3001/sirovine").then((response) =>{
              setListOfSirovine(response.data);
              setSirovina_idObj(response.data[0].id);
            });
        };
      }, []);
    
      const calculateCijena = (id) =>{
        axios.get(`http://localhost:3001/sirovine/byId/${id}`).then( (response) =>{
          setCijenaObj(response.data.cijena);
        });
      }

      const onSubmit = (e) => {
        e.preventDefault();
        const data = { 
          naziv: nazivObj, 
          kolicina: kolicinaObj,
          cijena: cijenaObj * kolicinaObj,
          datum_pocetka: datum_pocetkaObj,
          sirovina_id: sirovina_idObj,
        };
        axios.post("http://localhost:3001/proizvodniprocesi", data).then((response) => {
          navigate("/proizvodniprocesi");
        });
      };

  return (
    <form method="post" onSubmit={onSubmit}>
      <h1>Novi proizvodni proces</h1>
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
        <label>Datum pocetka: </label>
        <input 
          name="datum_pocetka"
          type="date"
          id="inputCreatePost"
          onChange={(e) => {
            setDatum_pocetkaObj(e.target.value);
          }}
          />
          <label>Sirovina:
            <select 
              name="sirovina_id"
              id="inputCreatePost"
              value={sirovina_idObj}
              onChange={(e) => {
                setSirovina_idObj(e.target.value);
                calculateCijena(e.target.value);
              }}
              >
              {listOfSirovine.map((value, key) => {
              return(
                <option value={value.id}>{value.naziv}</option>
              );
            })}       
            </select>
          </label>
        <button type="submit"> Dodaj proizvodni proces</button>
      </div>
    </form>
  )
}

export default CreateProizvodniProces