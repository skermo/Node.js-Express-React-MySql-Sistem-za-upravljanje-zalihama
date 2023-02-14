const express = require('express');
const router = express.Router();
const {Proizvodi} = require("../models")

router.get("/", async (req, res) => {
    const listOfProizvodi = await Proizvodi.findAll();
    res.json(listOfProizvodi);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const proizvod = await Proizvodi.findByPk(id);
    res.json(proizvod);
  });

router.post("/", async (req, res) => {
    const proizvod = req.body;
    await Proizvodi.create(proizvod);
    res.json(proizvod);
});

router.get("/:proizvodniprocesId", async (req, res) => {
    const proizvodniprocesId = req.params.proizvodniprocesId;
    const proizvodi = await Proizvodi.findAll({ where: { proizvodni_proces_id: proizvodniprocesId } });
    res.json(proizvodi);
  });

  router.put("/", async (req, res) => {
    const { id, naziv, slika_proizvoda, marza, cijena, proizvodni_proces_id } = req.body;
    await Proizvodi.update({ 
        naziv: naziv,
        slika_proizvoda: slika_proizvoda,
        cijena: cijena,
        marza: marza,
        proizvodni_proces_id: proizvodni_proces_id,
     }, { where: { id: id } });
    res.json("SUCCESS");
  });

module.exports = router;