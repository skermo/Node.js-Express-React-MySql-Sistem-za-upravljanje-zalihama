module.exports = (sequelize, DataTypes) => {
    const Korisnici = sequelize.define("Korisnici", {
        korisnicko_ime: {
            type: DataTypes.STRING,
        },
        sifra: {
            type: DataTypes.STRING,
        },
        uloga: {
            type: DataTypes.STRING,
        },
        ime: {
            type: DataTypes.STRING,
        },
        prezime: {
            type: DataTypes.STRING,
        },
        broj_telefona: {
            type: DataTypes.STRING,
        },
        adresa: {
            type: DataTypes.STRING,
        },
        email_adresa: {
            type: DataTypes.STRING,
        },
        datum_zaposlenja: {
            type: DataTypes.DATEONLY,
        },
        datum_otkaza: {
            type: DataTypes.DATEONLY,
        },
    });

    return Korisnici;
}