module.exports = {
  up: (queryInterface, Sequelize) => {
    const Floors = queryInterface.createTable("floors", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name_floor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shelf_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "shelves",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    return Floors;
  },

  down: (queryInterface) => queryInterface.dropTable("floors"),
};
