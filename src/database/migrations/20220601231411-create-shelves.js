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
        unique: true,
      },
      shelf_type: { type: Sequelize.INTEGER, allowNull: false },
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
