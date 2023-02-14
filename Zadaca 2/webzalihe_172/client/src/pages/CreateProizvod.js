import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function CreateProizvod() {

  const [listOfProizvodniProcesi, setListOfProizvodniProcesi] = useState([]);
  const [nazivObj, setNazivObj] = useState("");
  const [slika_proizvodaObj, setSlika_proizvodaObj] = useState("");
  const [cijenaObj, setCijenaObj] = useState("");
  const [marzaObj, setMarzaObj] = useState("");
  const [proizvodniProces_idObj, setProizvodniProces_idObj] = useState("");
  let navigate = useNavigate();
  
        useEffect(() => {
          if (!localStorage.getItem("accessToken")) {
            navigate("/login");
          } else{
              axios.get("http://localhost:3001/proizvodniprocesi").then((response) =>{
                setListOfProizvodniProcesi(response.data);
                setProizvodniProces_idObj(response.data[0].id);
              });
          };
        }, []);
      
        const calculateCijena = (id) =>{
          axios.get(`http://localhost:3001/proizvodniprocesi/byId/${id}`).then( (response) =>{
            setCijenaObj(response.data.cijena);
          });
        }
  
        const onSubmit = (e) => {
          e.preventDefault();
          const data = { 
            naziv: nazivObj, 
            slika_proizvoda: slika_proizvodaObj,
            cijena: cijenaObj * marzaObj,
            marza: marzaObj,
            proizvodni_proces_id: proizvodniProces_idObj,
          };
          axios.post("http://localhost:3001/proizvodi", data).then((response) => {
            navigate("/proizvodi");
          });
        };
  
    return (
      <form method="post" onSubmit={onSubmit}>
        <h1>Novi Proizvod</h1>
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
          <label>Slika proizvoda: </label>
          <input 
            name="slika_proizvoda"
            type="text"
            id="inputCreatePost"
            placeholder="url"
            onChange={(e) => {
              setSlika_proizvodaObj(e.target.value);
            }}
            />
          <label>Marza: </label>
          <input 
            name="marza"
            type="number"
            id="inputCreatePost"
            placeholder="15"
            onChange={(e) => {
              setMarzaObj(e.target.value);
            }}
            />
            <label>Proizvodni Proces:
              <select 
                name="sirovina_id"
                id="inputCreatePost"
                value={proizvodniProces_idObj}
                onChange={(e) => {
                  setProizvodniProces_idObj(e.target.value);
                  calculateCijena(e.target.value);
                }}
                >
                {listOfProizvodniProcesi.map((value, key) => {
                return(
                  <option value={value.id}>{value.naziv}</option>
                );
              })}       
              </select>
            </label>
          <button type="submit"> Dodaj proizvod</button>
        </div>
      </form>
    )
}

export default CreateProizvod