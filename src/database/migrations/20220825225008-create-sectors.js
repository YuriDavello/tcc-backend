module.exports = {
  up: (queryInterface, Sequelize) => {
    const Sector = queryInterface.createTable("sectors", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      available_quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fits_quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      floor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "floors",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
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

    return Sector;
  },

  down: (queryInterface) => queryInterface.dropTable("sectors"),
};
