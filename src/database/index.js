import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../app/models/User";

const models = [User];

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
