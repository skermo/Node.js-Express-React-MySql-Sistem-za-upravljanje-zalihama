import axios from 'axios'
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';


function Dobavljaci() {

    const [listOfDobavljaci, setListOfDobavljaci] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        navigate("/login");
      } else{
          axios.get("http://localhost:3001/dobavljaci").then((response) =>{
            setListOfDobavljaci(response.data);
          });
      };
    }, []);

  return (
    <div className="App">
      <h1>Dobavljaci</h1>
        <table className='tabela'>
            <tr>
                <th>Naziv</th>
                <th>IIB</th>
                <th>PDV</th>
                <th>Broj telefona</th>
                <th>Kontakt osoba</th>
                <th>Email</th>
                <th>Datum pocetka</th>
                <th>Datum zavrsetka</th>
                <th>Actions</th>
            </tr>
      {listOfDobavljaci.map((value, key) => {
        return(
            <tr>
                <td>{value.naziv}</td>
                <td>{value.iib}</td>
                <td>{value.pdv}</td>
                <td>{value.broj_telefona}</td>
                <td>{value.kontakt_osoba}</td>
                <td>{value.email_adresa}</td>
                <td>{value.datum_pocetka}</td>
                <td>{value.datum_zavrsetka}</td>
                <td>
                  <button onClick={ () => {navigate(`/dobavljac/${value.id}`)}} className='bluebtn'>Edit</button>
                </td>
          </tr>
        );
      })}
      </table>
    </div>
  )
}

export default Dobavljaci