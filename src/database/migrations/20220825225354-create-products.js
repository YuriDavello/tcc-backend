module.exports = {
  up: (queryInterface, Sequelize) => {
    const Products = queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      wight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      sector_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sectors",
          key: "id",
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

    return Products;
  },

  down: (queryInterface) => queryInterface.dropTable("products"),
};
