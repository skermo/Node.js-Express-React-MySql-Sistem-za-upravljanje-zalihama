import React, { useEffect } from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function CreateDobavljac() {

let navigate = useNavigate();

    const initialValues = {
        naziv: "",
        iib: "",
        pdv: "",
        kontakt_osoba: "",
        email_adresa: "",
        datum_pocetka: "",
      };

      useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
        }
      }, []);

      const validationSchema = Yup.object().shape({
        naziv: Yup.string().required("Moras unijeti naziv!"),
        iib: Yup.string().required(),
        pdv: Yup.number().required(),
      });
    
      const onSubmit = (data) => {
        axios.post("http://localhost:3001/dobavljaci", data).then((response) => {
          navigate("/dobavljaci");
        });
      };

  return (
    <div>
      <h1>Novi Dobavljac</h1>
      <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Naziv: </label>
          <ErrorMessage name="naziv" component="span" />
          <Field
            id="inputCreatePost"
            name="naziv"
            placeholder="naziv"
          />
          <label>IIB: </label>
          <ErrorMessage name="iib" component="span" />
          <Field
            id="inputCreatePost"
            name="iib"
            placeholder="iib"
          />
          <label>PDV: </label>
          <ErrorMessage name="pdv" component="span" />
          <Field
            id="inputCreatePost"
            type = "number"
            name="pdv"
            placeholder="10"
          />
        <label>Broj telefona: </label>
          <ErrorMessage name="broj_telefona" component="span" />
          <Field
            id="inputCreatePost"
            name="broj_telefona"
            placeholder="065749206"
          />
        <label>Kontakt osoba: </label>
          <ErrorMessage name="kontakt_osoba" component="span" />
          <Field
            id="inputCreatePost"
            name="kontakt_osoba"
            placeholder="062375839"
          />
        <label>Email: </label>
          <ErrorMessage name="email_adresa" component="span" />
          <Field
            id="inputCreatePost"
            name="email_adresa"
            placeholder="@"
          />
        <label>Datum pocetka: </label>
          <ErrorMessage name="datum_pocetka" component="span" />
          <Field
            id="inputCreatePost"
            name="datum_pocetka"
            type="date"
          />
          <button type="submit"> Dodaj dobavljaca</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateDobavljac