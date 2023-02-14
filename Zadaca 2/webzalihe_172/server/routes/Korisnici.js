const express = require('express');
const router = express.Router();
const {Korisnici} = require("../models")
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddlewares");

const { sign } = require("jsonwebtoken");


router.post("/login", async (req, res) => {
    const { korisnicko_ime, sifra } = req.body;

    const korisnik = await Korisnici.findOne({ where: { korisnicko_ime: korisnicko_ime } });
  
    if (!korisnik) res.json({ error: "Korisnik ne postoji" });

    if(korisnik.datum_otkaza !== null) res.json({error: "Korisnik je dobio otkaz"});
  
    bcrypt.compare(sifra, korisnik.sifra).then((match) => {
      if (!match) res.json({ error: "Pogresna sifra!" });
  
      const accessToken = sign(
        { korisnicko_ime: korisnik.korisnicko_ime, id: korisnik.id, uloga: korisnik.uloga},
        "importantsecret"
      );
      res.json({ token: accessToken, korisnicko_ime: korisnicko_ime, id: korisnik.id, uloga: korisnik.uloga });
    });
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const korisnik = await Korisnici.findByPk(id);
    res.json(korisnik);
  });

router.post("/", validateToken, async (req, res) => {
    const { korisnicko_ime, sifra, uloga, ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja } = req.body;
    bcrypt.hash(sifra, 10).then((hash) => {
      Korisnici.create({
        korisnicko_ime: korisnicko_ime,
        sifra: hash,
        uloga: uloga,
        ime: ime,
        prezime: prezime,
        broj_telefona: broj_telefona,
        adresa: adresa,
        email_adresa: email_adresa,
        datum_zaposlenja: datum_zaposlenja,
      });
      res.json("SUCCESS");
    });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.korisnik);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const korisnik = await Korisnici.findOne({ where: { korisnicko_ime: req.korisnik.korisnicko_ime } });

  bcrypt.compare(oldPassword, korisnik.sifra).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Korisnici.update(
        { sifra: hash },
        { where: { korisnicko_ime: req.korisnik.korisnicko_ime } }
      );
      res.json("SUCCESS");
    });
  });
});

router.get("/", async (req, res) => {
  const listOfKorisnici = await Korisnici.findAll();
  res.json(listOfKorisnici);
});

router.put("/", async (req, res) => {
  const { id, korisnicko_ime, uloga, ime, prezime, broj_telefona, adresa, email_adresa, datum_zaposlenja, datum_otkaza } = req.body;
  await Korisnici.update({ 
      korisnicko_ime: korisnicko_ime,
      uloga: uloga,
      ime: ime,
      broj_telefona: broj_telefona,
      prezime: prezime,
      email_adresa: email_adresa,
      adresa: adresa,
      datum_zaposlenja: datum_zaposlenja,
      datum_otkaza: datum_otkaza,
   }, { where: { id: id } });
  res.json("SUCCESS");
});

module.exports = router;
