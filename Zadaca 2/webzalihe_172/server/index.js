const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

//Routers
const proizvodRouter = require('./routes/Proizvodi');
app.use("/proizvodi", proizvodRouter);
const proizvodniProcesRouter = require('./routes/ProizvodniProcesi');
app.use("/proizvodniprocesi", proizvodniProcesRouter);
const korisnikRouter = require('./routes/Korisnici');
app.use("/korisnici", korisnikRouter);
const dobavljacRouter = require('./routes/Dobavljaci');
app.use("/dobavljaci", dobavljacRouter);
const sirovinaRouter = require('./routes/Sirovine');
app.use("/sirovine", sirovinaRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});