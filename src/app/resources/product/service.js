import Product from "../../models/Product";

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
    const product = await Product.findByPk(id);
    if (!product) return false;

    return product;
  }

  async list() {
    const products = await Product.findAll({
      order: [["id", "ASC"]],
    });
    return products;
  }

  async create({ name, category, price, weight }, transaction) {
    const newProduct = await Product.create(
      {
        name,
        category,
        price,
        weight,
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

  async update({ id, name, category, price, weight }, transaction) {
    const productUpdated = await Product.update(
      {
        name,
        category,
        price,
        weight,
      },
      {
        where: {
          id,
        },
        transaction,
      }
    );

    return productUpdated;
  }
}

export default ProductService;
