import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        category: Sequelize.STRING,
        total: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        sectorId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sector, {
      foreignKey: "sector_id",
      as: "sector",
    });

    this.belongsTo(models.Inventory, {
      foreignKey: "inventory_id",
      as: "inventory",
    });
  }
}

export default Product;
