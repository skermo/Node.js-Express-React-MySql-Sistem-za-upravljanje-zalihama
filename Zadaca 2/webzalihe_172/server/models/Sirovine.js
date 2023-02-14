module.exports = (sequelize, DataTypes) => {
    const Sirovine = sequelize.define("Sirovine", {
        naziv: {
            type: DataTypes.STRING,
        },
        kolicina: {
            type: DataTypes.INTEGER,
        },
        min_kolicina: {
            type: DataTypes.INTEGER,
        },
        cijena: {
            type: DataTypes.DOUBLE,
        },
        jedinica_mjere: {
            type: DataTypes.STRING,
        },
        da_li_se_koristi: {
            type: DataTypes.BOOLEAN,
        },
    });

    Sirovine.associate = (models) => {
        Sirovine.hasMany(models.Proizvodni_proces, {
            foreignKey: 'sirovina_id',
        });
    };

    return Sirovine;
}