import Sequelize, { Model } from "sequelize";

class Floor extends Model {
  static init(sequelize) {
    super.init(
      {
        numberFloor: Sequelize.INTEGER,
        quantitySectors: Sequelize.INTEGER,
        shelfId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Sector, {
      foreignKey: "floor_id",
      as: "floor",
    });

    this.belongsTo(models.Floor, {
      foreignKey: "shelf_id",
      as: "shelf",
    });
  }
}

export default Floor;
