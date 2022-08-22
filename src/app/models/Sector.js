import Sequelize, { Model } from "sequelize";

class Sector extends Model {
  static init(sequelize) {
    super.init(
      {
        quantityLines: Sequelize.INTEGER,
        quantityColumns: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        floorId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Product, {
      foreignKey: "sector_id",
      as: "sector",
    });

    this.belongsTo(models.Floor, {
      foreignKey: "floor_id",
      as: "floor",
    });
  }
}

export default Sector;
