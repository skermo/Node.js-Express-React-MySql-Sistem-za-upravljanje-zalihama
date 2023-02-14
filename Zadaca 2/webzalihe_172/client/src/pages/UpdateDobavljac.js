import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

function UpdateDobavljac() {
    let {id} = useParams();
    const [dobavljacObject, setDobavljacObject] = useState({});
    const [nazivObj, setNazivObj] = useState("");
    const [iibObj, setIibObj] = useState("");
    const [pdvObj, setPdvObj] = useState("");
    const [brojObj, setBrojObj] = useState("");
    const [kontaktObj, setKontaktObj] = useState("");
    const [emailObj, SetEmailObj] = useState("");
    const [pocetakObj, setPocetakObj] = useState("");
    const [zavrsetakObj, setZavrsetakObj] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");}
          else{
          axios.get(`http://localhost:3001/dobavljaci/byId/${id}`).then( (response) =>{
            setDobavljacObject(response.data);
            setNazivObj(response.data.naziv);
            setIibObj(response.data.iib);
            setPdvObj(response.data.pdv);
            setBrojObj(response.data.broj_telefona);
            setKontaktObj(response.data.kontakt_osoba);
            SetEmailObj(response.data.email_adresa);
            setPocetakObj(response.data.datum_pocetka);
            setZavrsetakObj(response.data.datum_zavrsetka);
          });
        };
      }, []);

      const initialValues = {
        naziv: "",
        iib: "",
        pdv: "",
        kontakt_osoba: "",
        email_adresa: "",
        datum_pocetka: "",
        datum_zavrsetka: "",
      };

      const validationSchema = Yup.object().shape({
        /*naziv: Yup.string().required("Moras unijeti naziv!"),
        iib: Yup.string().required(),
        pdv: Yup.number().required(),*/
      });

    
      const onSubmit = (data) => {
        axios.put(
            "http://localhost:3001/dobavljaci",
            {
              id: id,
              naziv: nazivObj,
              iib: iibObj,
              pdv: pdvObj,
              broj_telefona: brojObj,
              kontakt_osoba: kontaktObj,
              email_adresa: emailObj,
              datum_pocetka: pocetakObj,
              datum_zavrsetka: zavrsetakObj
            }
          );
          navigate("/dobavljaci");
      };

  return (
    <div>
      <h1>Uredi dobavljaca</h1>
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
            value = {nazivObj}
            onChange={(event) => {
              setNazivObj(event.target.value);
            }}

          />
          <label>IIB: </label>
          <ErrorMessage name="iib" component="span" />
          <Field
            id="inputCreatePost"
            name="iib"
            placeholder="iib"
            value = {iibObj}
            onChange={(event) => {
              setIibObj(event.target.value);
            }}
          />
          <label>PDV: </label>
          <ErrorMessage name="pdv" component="span" />
          <Field
            id="inputCreatePost"
            type = "number"
            name="pdv"
            placeholder="10"
            value = {pdvObj}
            onChange={(event) => {
              setPdvObj(event.target.value);
            }}
          />
        <label>Broj telefona: </label>
          <ErrorMessage name="broj_telefona" component="span" />
          <Field
            id="inputCreatePost"
            name="broj_telefona"
            placeholder="065749206"
            value = {brojObj}
            onChange={(event) => {
              setBrojObj(event.target.value);
            }}
          />
        <label>Kontakt osoba: </label>
          <ErrorMessage name="kontakt_osoba" component="span" />
          <Field
            id="inputCreatePost"
            name="kontakt_osoba"
            placeholder="062375839"
            value = {kontaktObj}
            onChange={(event) => {
              setKontaktObj(event.target.value);
            }}
          />
        <label>Email: </label>
          <ErrorMessage name="email_adresa" component="span" />
          <Field
            id="inputCreatePost"
            name="email_adresa"
            placeholder="@"
            value = {emailObj}
            onChange={(event) => {
              SetEmailObj(event.target.value);
            }}
          />
        <label>Datum pocetka: </label>
          <ErrorMessage name="datum_pocetka" component="span" />
          <Field
            id="inputCreatePost"
            name="datum_pocetka"
            type="date"
            value = {pocetakObj}
            onChange={(event) => {
              setPocetakObj(event.target.value);
            }}
          />
        <label>Datum zavrsetka: </label>
          <ErrorMessage name="datum_zavrsetka" component="span" />
          <Field
            id="inputCreatePost"
            name="datum_zavrsetka"
            type="date"
            value = {zavrsetakObj}
            onChange={(event) => {
              setZavrsetakObj(event.target.value);
            }}
          />
          <button type="submit"> Uredi dobavljaca</button>
        </Form>
      </Formik>
    </div>
  )
}

export default UpdateDobavljac