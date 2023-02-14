import axios from 'axios'
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';


function Korisnici() {

    const [listOfUsers, setListOfUsers] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
        } else{
            axios.get("http://localhost:3001/korisnici").then((response) =>{
              setListOfUsers(response.data);
            });
        };
      }, []);

  return (
    <div className="App">
      <h1>Korisnici</h1>
        <table className='tabela'>
            <tr>
                <th>Username</th>
                <th>Uloga</th>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Broj telefona</th>
                <th>Adresa</th>
                <th>Email pocetka</th>
                <th>Datum zaposlenja</th>
                <th>Datum otkaza</th>
                <th>Actions</th>
            </tr>
      {listOfUsers.map((value, key) => {
        return(
            <tr>
                <td>{value.korisnicko_ime}</td>
                <td>{value.uloga}</td>
                <td>{value.ime}</td>
                <td>{value.prezime}</td>
                <td>{value.broj_telefona}</td>
                <td>{value.adresa}</td>
                <td>{value.email_adresa}</td>
                <td>{value.datum_zaposlenja}</td>
                <td>{value.datum_otkaza}</td>
                <td>
                  <button onClick={ () => {navigate(`/korisnik/${value.id}`)}} className='bluebtn'>Edit</button>
                </td>
          </tr>
        );
      })}
      </table>
    </div>
  )
}

export default Korisnici