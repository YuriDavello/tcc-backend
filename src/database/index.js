import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../app/models/User";
import Sector from "../app/models/Sector";
import Product from "../app/models/Product";
import Batch from "../app/models/Batch";
import Floor from "../app/models/Floor";
import Shelf from "../app/models/Shelf";

const models = [User, Shelf, Sector, Product, Batch, Floor];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
