import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        category: Sequelize.STRING,
        total: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        validTill: Sequelize.DATE,
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
  }
}

export default Product;
