import Product from "../../models/Product";
import Sequelize from "sequelize";
import Database from "../../../database/index";

const props = {
  attributes: ["id", "name", "category", "price", "weight"],
};
class ProductService {
  async get({ name }) {
    const product = await Product.findOne({
      where: {
        name,
      },
    });

    if (product) return true;

    return false;
  }

  async findByPk(id) {
    const product = await Product.findByPk(id, { ...props });
    if (!product) return false;

    return product;
  }

  async list({ filter }) {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
      where: {
        [Sequelize.Op.or]: [
          Sequelize.where(Sequelize.fn("lower", Sequelize.col("name")), {
            [Sequelize.Op.like]: `%${filter || ""}%`,
          }),
        ],
      },
      ...props,
    });

    return products;
  }

  // async listNonRelatedProducts({ filter }) {
  //   const [products] = await Database.connection.query(`
  //   SELECT * FROM PRODUCTS
  //   WHERE id NOT IN (SELECT PRODUCT_ID FROM SECTORS)
  //   AND (UPPER(name) LIKE UPPER('%${filter || ""}%'))
  //   `);
  //   return products;
  // }

  async create({ product }, transaction) {
    const newProduct = await Product.create(
      {
        ...product,
      },
      {
        transaction,
      }
    );
    return newProduct;
  }

  async delete(id, transaction) {
    const product = await Product.findByPk(id);
    if (!product) return false;

    await Product.destroy({ where: { id }, transaction });

    return true;
  }
}

export default ProductService;
