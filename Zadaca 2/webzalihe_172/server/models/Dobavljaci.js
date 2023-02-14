module.exports = (sequelize, DataTypes) => {
    const Dobavljaci = sequelize.define("Dobavljaci", {
        naziv: {
            type: DataTypes.STRING,
        },
        iib: {
            type: DataTypes.STRING,
        },
        pdv: {
            type: DataTypes.INTEGER,
        },
        broj_telefona: {
            type: DataTypes.STRING,
        },
        kontakt_osoba: {
            type: DataTypes.STRING,
        },
        email_adresa: {
            type: DataTypes.STRING,
        },
        datum_pocetka: {
            type: DataTypes.DATEONLY,
        },
        datum_zavrsetka: {
            type: DataTypes.DATEONLY,
        },
    });

    Dobavljaci.associate = (models) => {
        Dobavljaci.hasMany(models.Sirovine, {
            foreignKey: 'dobavljac_id',
        });
    };

    return Dobavljaci;
}