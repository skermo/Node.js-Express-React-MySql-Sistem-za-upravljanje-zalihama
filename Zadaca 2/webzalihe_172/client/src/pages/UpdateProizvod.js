import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';


function UpdateProizvod() {
    let {id} = useParams();
    const [listOfProizvodniProcesi, setListOfProizvodniProcesi] = useState([]);
    const [nazivObj, setNazivObj] = useState("");
    const [slika_proizvodaObj, setSlika_proizvodaObj] = useState("");
    const [cijenaObj, setCijenaObj] = useState("");
    const [marzaObj, setMarzaObj] = useState("");
    const [proizvodniProces_idObj, setProizvodniProces_idObj] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");}
          else{
          axios.get(`http://localhost:3001/proizvodi/byId/${id}`).then( (response) =>{
            setNazivObj(response.data.naziv);
            setSlika_proizvodaObj(response.data.slika_proizvoda);
            setMarzaObj(response.data.marza);
            setProizvodniProces_idObj(response.data.proizvodni_proces_id);
          });
          axios.get("http://localhost:3001/proizvodniprocesi").then((response) =>{
            setListOfProizvodniProcesi(response.data);
          });
        };
      }, []);

      const calculateCijena = (id) =>{
        axios.get(`http://localhost:3001/proizvodniprocesi/byId/${id}`).then( (response) =>{
          setCijenaObj(response.data.cijena);
        });
      }
    
      const onSubmit = (data) => {
        axios.put(
            "http://localhost:3001/proizvodi",
            {
              id: id,
              naziv: nazivObj,
              slika_proizvoda: slika_proizvodaObj,
              cijena: cijenaObj * marzaObj,
              marza: marzaObj,
              proizvodni_proces_id: proizvodniProces_idObj,
            }
          );
          navigate("/proizvodi");
      };

      return (
        <form method="post" onSubmit={onSubmit}>
            <h1>Uredi proizvod</h1>
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
            <label>Slika proizvoda: </label>
            <input 
              name="slika_proizvoda"
              value={slika_proizvodaObj}
              type="text"
              id="inputCreatePost"
              onChange={(e) => {
                setSlika_proizvodaObj(e.target.value);
              }}
              />
              <label>Marza: </label>
              <input 
                value={marzaObj}
                name="marza"
                type="number"
                id="inputCreatePost"
                onChange={(e) => {
                  setMarzaObj(e.target.value);
                }}
              />
              <label>Proizvodni proces:
                <select 
                  name="proizvodni_proces_id"
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
            <button type="submit"> Uredi proizvod</button>
          </div>
        </form>
      )
    }

export default UpdateProizvod