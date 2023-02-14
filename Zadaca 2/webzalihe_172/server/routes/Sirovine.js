const express = require('express');
const router = express.Router();
const {Sirovine} = require("../models");

router.get("/", async (req, res) => {
    const listOfSirovine = await Sirovine.findAll();
    res.json(listOfSirovine);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const sirovine = await Sirovine.findByPk(id);
    res.json(sirovine);
  });

router.post("/", async (req, res) => {
    const sirovine = req.body;
    await Sirovine.create(sirovine);
    res.json(sirovine);
});

router.put("/", async (req, res) => {
    const { id, naziv, kolicina, min_kolicina, cijena, jedinica_mjere, da_li_se_koristi, dobavljac_id } = req.body;
    await Sirovine.update({ 
        naziv: naziv,
        kolicina: kolicina,
        min_kolicina: min_kolicina,
        cijena: cijena,
        jedinica_mjere: jedinica_mjere,
        da_li_se_koristi: da_li_se_koristi,
        dobavljac_id: dobavljac_id,
     }, { where: { id: id } });
    res.json("SUCCESS");
  });

module.exports = router;