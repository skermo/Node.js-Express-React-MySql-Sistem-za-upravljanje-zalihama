import axios from 'axios'
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';


function Sirovine() {

    const [listOfSirovine, setListOfSirovine] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        navigate("/login");
      } else{
          axios.get("http://localhost:3001/sirovine").then((response) =>{
            setListOfSirovine(response.data);
          });
      };
    }, []);

  return (
    <div className="App">
      <h1>Sirovine</h1>
        <table className='tabela'>
            <tr>
                <th>Naziv</th>
                <th>Kolicina</th>
                <th>Minimalna kolicina</th>
                <th>Cijena</th>
                <th>Jedinica mjere</th>
                <th>Da li se koristi?</th>
                <th>Dobavljac ID</th>
                <th>Actions</th>
            </tr>
      {listOfSirovine.map((value, key) => {
        return(
            <tr>
                <td>{value.naziv}</td>
                <td>{value.kolicina}</td>
                <td>{value.min_kolicina}</td>
                <td>{value.cijena}</td>
                <td>{value.jedinica_mjere}</td>
                <td>{ JSON.stringify(value.da_li_se_koristi) }</td>
                <td>{value.dobavljac_id}</td>
                <td>
                  <button onClick={ () => {navigate(`/sirovina/${value.id}`)}} className='bluebtn'>Edit</button>
                </td>
          </tr>
        );
      })}
      </table>
    </div>
  )
}

export default Sirovine  