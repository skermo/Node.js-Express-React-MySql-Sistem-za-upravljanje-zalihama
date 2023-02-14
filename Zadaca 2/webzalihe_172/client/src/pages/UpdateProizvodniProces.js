import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';


function UpdateProizvodniProces() {
    let {id} = useParams();
    const [listOfSirovine, setListOfSirovine] = useState([]);
    const [nazivObj, setNazivObj] = useState("");
    const [kolicinaObj, setKolicinaObj] = useState("");
    const [cijenaObj, setCijenaObj] = useState("");
    const [datum_pocetkaObj, setDatum_pocetkaObj] = useState("");
    const [datum_zavrsetkaObj, setDatum_zavrsetkaObj] = useState("");
    const [sirovina_idObj, setSirovina_idObj] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");}
          else{
          axios.get(`http://localhost:3001/proizvodniprocesi/byId/${id}`).then( (response) =>{
            setNazivObj(response.data.naziv);
            setKolicinaObj(response.data.kolicina);
            setDatum_pocetkaObj(response.data.datum_pocetka);
            setDatum_zavrsetkaObj(response.data.datum_zavrsetka);
            setSirovina_idObj(response.data.sirovina_id);
          });
          axios.get("http://localhost:3001/sirovine").then((response) =>{
            setListOfSirovine(response.data);
          });
        };
      }, []);

      const calculateCijena = (id) =>{
        axios.get(`http://localhost:3001/sirovine/byId/${id}`).then( (response) =>{
          setCijenaObj(response.data.cijena);
        });
      }
    
      const onSubmit = (data) => {
        axios.put(
            "http://localhost:3001/proizvodniprocesi",
            {
              id: id,
              naziv: nazivObj,
              kolicina: kolicinaObj,
              cijena: cijenaObj * kolicinaObj,
              datum_pocetka: datum_pocetkaObj,
              datum_zavrsetka: datum_zavrsetkaObj,
              sirovina_id: sirovina_idObj,
            }
          );
          navigate("/proizvodniprocesi");
      };

      return (
        <form method="post" onSubmit={onSubmit}>
          <h1>Uredi proizvodni proces</h1>
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
              <label>Datum pocetka: </label>
              <input 
                value={datum_pocetkaObj}
                name="datum_pocetka"
                type="date"
                id="inputCreatePost"
                onChange={(e) => {
                  setDatum_pocetkaObj(e.target.value);
                }}
              />
              <label>Datum zavrsetka: </label>
              <input 
                value={datum_zavrsetkaObj}
                name="datum_zavretka"
                type="date"
                id="inputCreatePost"
                onChange={(e) => {
                  setDatum_zavrsetkaObj(e.target.value);
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
            <button type="submit"> Uredi proizvodni proces</button>
          </div>
        </form>
      )
    }

export default UpdateProizvodniProces