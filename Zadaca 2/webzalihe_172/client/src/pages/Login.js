import React, { useState, useContext} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [korisnicko_ime, setUsername] = useState("");
  const [sifra, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { korisnicko_ime: korisnicko_ime, sifra: sifra};
    axios.post("http://localhost:3001/korisnici/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          korisnicko_ime: response.data.korisnicko_ime,
          id: response.data.id,
          uloga: response.data.uloga,
          status: true,
        });
        navigate("/proizvodi");
      }
    });
  };
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login; 