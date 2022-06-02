module.exports = {
  up: (queryInterface, Sequelize) => {
    const Shelves = queryInterface.createTable("shelves", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      sections: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      shelf_type: Sequelize.INTEGER,
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    return Shelves;
  },

  down: (queryInterface) => queryInterface.dropTable("shelves"),
};
