import axios from 'axios'
import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';


function Proizvodi() {

    const [listOfProizvodi, setListOfProizvodi] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        navigate("/login");
      } else{
          axios.get("http://localhost:3001/proizvodi").then((response) =>{
          setListOfProizvodi(response.data);
          });
      };
    }, []);

  return (
    <div className="App">
      <h1>Proizvodi</h1>
      {listOfProizvodi.map((value, key) => {
        return(
          <div className="post" onClick={ () => {navigate(`/proizvod/${value.id}`)}}>
            <div className="title"> {value.naziv} </div>
            <div className="body">
              <img src={value.slika_proizvoda}></img>
            </div>
            <div className="footer">
              <div>Cijena bez PDV-a: {value.cijena} KM</div>
              <div>Cijena sa PDV-om: {(value.cijena * 1.17).toFixed(1)} KM</div>
              <div>PDV: {(value.cijena * 0.17).toFixed(1)} KM</div>
              <div>Marza: {value.marza}</div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Proizvodi