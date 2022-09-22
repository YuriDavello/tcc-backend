module.exports = {
  up: (queryInterface, Sequelize) => {
    const Batches = queryInterface.createTable("batches", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      batch: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valid_till: {
        type: Sequelize.DATE,
        allowNull: false,
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
      sector_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "sectors",
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

    return Batches;
  },

  down: (queryInterface) => queryInterface.dropTable("batches"),
};
