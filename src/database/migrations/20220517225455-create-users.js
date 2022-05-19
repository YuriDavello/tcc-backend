module.exports = {
  up: (queryInterface, Sequelize) => {
    const Users = queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userType: Sequelize.INTEGER,
    });

    return Users;
  },

  down: (queryInterface) => queryInterface.dropTable("Users"),
};
