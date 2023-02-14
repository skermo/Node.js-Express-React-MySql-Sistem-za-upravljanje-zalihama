const express = require('express');
const router = express.Router();
const {Proizvodni_proces} = require("../models")


router.get("/", async (req, res) => {
    const listOfProizvodniProcesi = await Proizvodni_proces.findAll();
    res.json(listOfProizvodniProcesi);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const proizvodniProces = await Proizvodni_proces.findByPk(id);
    res.json(proizvodniProces);
  });

router.post("/", async (req, res) => {
    const proizvodniProces = req.body;
    await Proizvodni_proces.create(proizvodniProces);
    res.json(proizvodniProces);
});

router.put("/", async (req, res) => {
  const { id, naziv, kolicina, cijena, sirovina_id, datum_pocetka, datum_zavrsetka } = req.body;
  await Proizvodni_proces.update({ 
      naziv: naziv,
      kolicina: kolicina,
      cijena: cijena,
      sirovina_id: sirovina_id,
      datum_pocetka: datum_pocetka,
      datum_zavrsetka: datum_zavrsetka,
   }, { where: { id: id } });
  res.json("SUCCESS");
});

module.exports = router;

