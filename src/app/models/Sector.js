import Sequelize, { Model } from "sequelize";

class Sector extends Model {
  static init(sequelize) {
    super.init(
      {
        quantityLines: Sequelize.INTEGER,
        quantityColumns: Sequelize.INTEGER,
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
      as: "products",
    });

    this.belongsTo(models.Floor, {
      foreignKey: "floor_id",
      as: "sectors",
    });
  }
}

export default Sector;
