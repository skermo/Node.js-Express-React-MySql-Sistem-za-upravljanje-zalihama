import React, {useEffect, useContext} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

function Registration() {
  const initialValues = {
    korisnicko_ime: "",
    sifra: "",
    uloga: "",
    ime: "",
    prezime: "",
    broj_telefona: "",
    adresa: "",
    email_adresa: "",
    datum_zaposlenja: "",
  };
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/korisnici/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if(response.data.uloga !== "admin"){
          navigate("/");
        }
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }else{

    }
  }, []);

  const validationSchema = Yup.object().shape({
    korisnicko_ime: Yup.string().min(3).max(15).required(),
    sifra: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/korisnici", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      console.log(data);
    });
    navigate("/users");
  };

  return (
    <div>
      <h1>Novi zaposlenik</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="korisnicko_ime" component="span" />
          <Field
            id="inputCreatePost"
            name="korisnicko_ime"
            placeholder="username"
          />

          <label>Password: </label>
          <ErrorMessage name="sifra" component="span" />
          <Field
            type="password"
            id="inputCreatePost"
            name="sifra"
            placeholder="password"
          />
          <label>Uloga: </label>
          <ErrorMessage name="uloga" component="span" />
          <Field
            as="select"
            id="inputCreatePost"
            name="uloga"
            placeholder="uloga"
          >
            <option value="admin">admin</option>
            <option value="zaposlenik">zaposlenik</option>
          </Field>  
          <label>Ime: </label>
          <ErrorMessage name="ime" component="span" />
          <Field
            id="inputCreatePost"
            name="ime"
            placeholder="ime"
          />
          <label>Prezime: </label>
          <ErrorMessage name="prezime" component="span" />
          <Field
            id="inputCreatePost"
            name="prezime"
            placeholder="prezime"
          />          
          <label>Broj telefona: </label>
          <ErrorMessage name="broj_telefona" component="span" />
          <Field
            id="inputCreatePost"
            name="broj_telefona"
            placeholder="broj telefona"
          />          
          <label>Adresa: </label>
          <ErrorMessage name="adresa" component="span" />
          <Field
            id="inputCreatePost"
            name="adresa"
            placeholder="adresa"
          />          
          <label>Email: </label>
          <ErrorMessage name="email_adresa" component="span" />
          <Field
            id="inputCreatePost"
            name="email_adresa"
            placeholder="email"
          />
          <label>Datum zaposlenja: </label>
          <ErrorMessage name="datum_zaposlenja" component="span" />
          <Field
            id="inputCreatePost"
            name="datum_zaposlenja"
            type="date"
          />
          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;