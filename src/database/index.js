import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../app/models/User";
import Sector from "../app/models/Sector";
import Product from "../app/models/Product";
import Inventory from "../app/models/Inventory";
import Floor from "../app/models/Floor";
import Shelf from "../app/models/Shelf";

const models = [User, Shelf, Sector, Product, Inventory, Floor];

class Database {
  constructor() {
    this.init();
  }

  init() {
    const connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(connection))
      .map((model) => model.associate && model.associate(connection.models));
  }
}

export default new Database();
