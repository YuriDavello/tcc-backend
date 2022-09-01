import Product from "../../models/Product";

class ProductService {
  async get({ name }) {
    const product = await Product.findOne({
      where: {
        name,
      },
    });

    if (!product) return true;

    return false;
  }

  async findByPk(id) {
    const product = await Product.findByPk(id);
    if (!product) return false;

    return product;
  }

  // async list(floorId) {
  //   const sectors = await Sector.findAll({
  //     order: [["id", "ASC"]],
  //     where: {
  //       floorId,
  //     },
  //     attributes: ["id", "quantityLines", "quantityColumns"],
  //   });
  //   return sectors;
  // }

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

  // async delete(id, transaction) {
  //   const sector = await Sector.findByPk(id);
  //   if (!sector) return false;

  //   await Sector.destroy({ where: { id }, transaction });

  //   return true;
  // }

  // async update({ id, quantityLines, quantityColumns }, transaction) {
  //   const sectorUpdated = await Sector.update(
  //     {
  //       quantityLines,
  //       quantityColumns,
  //     },
  //     {
  //       where: {
  //         id,
  //       },
  //       transaction,
  //     }
  //   );

  //   return sectorUpdated;
  // }
}

export default ProductService;
