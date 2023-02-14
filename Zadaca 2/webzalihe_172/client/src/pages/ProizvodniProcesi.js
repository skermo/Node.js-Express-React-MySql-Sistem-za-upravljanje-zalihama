import axios from 'axios'
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';


function ProizvodniProcesi() {

    const [listOfProizvodniProcesi, setListOfProizvodniProcesi] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        navigate("/login");
      } else{
          axios.get("http://localhost:3001/proizvodniprocesi").then((response) =>{
            setListOfProizvodniProcesi(response.data);
          });
      };
    }, []);

  return (
    <div className="App">
      <h1>Proizvodni procesi</h1>
        <table className='tabela'>
            <tr>
                <th>Naziv</th>
                <th>Datum pocetka</th>
                <th>Datum zavrsetka</th>
                <th>Cijena</th>
                <th>Kolicina</th>
                <th>Sirovina ID</th>
                <th>Actions</th>
            </tr>
      {listOfProizvodniProcesi.map((value, key) => {
        return(
            <tr>
                <td>{value.naziv}</td>
                <td>{value.datum_pocetka}</td>
                <td>{value.datum_zavrsetka}</td>
                <td>{value.cijena}</td>
                <td>{value.kolicina}</td>
                <td>{value.sirovina_id}</td>
                <td>
                  <button onClick={ () => {navigate(`/proizvodniproces/${value.id}`)}} className='bluebtn'>Edit</button>
                </td>
          </tr>
        );
      })}
      </table>
    </div>
  )
}

export default ProizvodniProcesi