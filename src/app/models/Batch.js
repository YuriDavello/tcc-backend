import Sequelize, { Model } from "sequelize";

class Batch extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        productId: Sequelize.INTEGER,
        sectorId: Sequelize.INTEGER,
        productQuantity: Sequelize.INTEGER,
        validTill: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });

    this.belongsTo(models.Sector, {
      foreignKey: "sector_id",
      as: "batch",
    });
  }
}

export default Batch;
