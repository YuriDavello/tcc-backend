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

    this.hasMany(models.Inventory, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

export default Product;
