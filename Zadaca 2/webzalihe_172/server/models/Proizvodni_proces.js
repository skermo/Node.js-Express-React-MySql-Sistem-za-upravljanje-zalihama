module.exports = (sequelize, DataTypes) => {
    const Proizvodni_proces = sequelize.define("Proizvodni_proces", {
        naziv: {
            type: DataTypes.STRING,
        },
        datum_pocetka: {
            type: DataTypes.DATEONLY,
        },
        datum_zavrsetka: {
            type: DataTypes.DATEONLY,
        },
        cijena: {
            type: DataTypes.DOUBLE,
        },
        kolicina: {
            type: DataTypes.INTEGER,
        },
    });

    Proizvodni_proces.associate = (models) => {
        Proizvodni_proces.hasMany(models.Proizvodi, {
            foreignKey: 'proizvodni_proces_id',
            onDelete: "cascade",
        });
    };

    return Proizvodni_proces;
}