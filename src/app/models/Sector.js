import Sequelize, { Model } from "sequelize";

class Sector extends Model {
  static init(sequelize) {
    super.init(
      {
        quantityLines: Sequelize.INTEGER,
        quantityColumns: Sequelize.INTEGER,
        availableQuantity: Sequelize.INTEGER,
        fitsQuantity: Sequelize.INTEGER,
        floorId: Sequelize.INTEGER,
        productId: Sequelize.INTEGER,
        batchId: Sequelize.INTEGER,
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
      as: "sector",
    });

    this.belongsTo(models.Floor, {
      foreignKey: "floor_id",
      as: "sectors",
    });

    this.hasMany(models.Batch, {
      foreignKey: "batch_id",
      as: "batches",
    });
  }
}

export default Sector;
