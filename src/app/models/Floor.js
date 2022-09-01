import Sequelize, { Model } from "sequelize";

class Floor extends Model {
  static init(sequelize) {
    super.init(
      {
        nameFloor: Sequelize.STRING,
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
      as: "sectors",
    });

    this.belongsTo(models.Shelf, {
      foreignKey: "shelf_id",
      as: "floors",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  }
}

export default Floor;
