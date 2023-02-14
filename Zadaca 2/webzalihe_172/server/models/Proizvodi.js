module.exports = (sequelize, DataTypes) => {
    const Proizvodi = sequelize.define("Proizvodi", {
        naziv: {
            type: DataTypes.STRING,
        },
        slika_proizvoda: {
            type: DataTypes.STRING,
        },
        marza: {
            type: DataTypes.INTEGER,
        },
        cijena: {
            type: DataTypes.DOUBLE,
        },
    });

    return Proizvodi;
}