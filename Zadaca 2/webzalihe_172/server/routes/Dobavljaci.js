const express = require('express');
const router = express.Router();
const {Dobavljaci} = require("../models")


router.get("/", async (req, res) => {
    const listOfDobavljaci = await Dobavljaci.findAll();
    res.json(listOfDobavljaci);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const dobavljac = await Dobavljaci.findByPk(id);
    res.json(dobavljac);
  });

router.post("/", async (req, res) => {
    const dobavljac = req.body;
    await Dobavljaci.create(dobavljac);
    res.json(dobavljac);
});

router.put("/", async (req, res) => {
    const { id, naziv, iib, pdv, broj_telefona, kontakt_osoba, email_adresa, datum_pocetka, datum_zavrsetka } = req.body;
    await Dobavljaci.update({ 
        naziv: naziv,
        iib: iib,
        pdv: pdv,
        broj_telefona: broj_telefona,
        kontakt_osoba: kontakt_osoba,
        email_adresa: email_adresa,
        datum_pocetka: datum_pocetka,
        datum_zavrsetka: datum_zavrsetka
     }, { where: { id: id } });
    res.json("SUCCESS");
  });

module.exports = router;