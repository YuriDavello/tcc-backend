import Shelf from "../../models/Shelf";
import Floor from "../../models/Floor";
import Sector from "../../models/Sector";
import Product from "../../models/Product";

const props = {
  attributes: ["id", "name", "shelfType"],
};

const props2 = {
  attributes: ["id", "fitsQuantity", "availableQuantity"],
};

const props3 = {
  attributes: ["id", "name", "category", "price", "weight"],
};

class ShelfService {
  async get({ name }) {
    const shelf = await Shelf.findOne({
      where: {
        name,
      },
    });
    return shelf;
  }

  async getByProductId({ productId }) {
    const shelf = await Shelf.findAll({
      include: [
        {
          model: Floor,
          as: "floors",
          attributes: ["floorName"],
          include: [
            {
              model: Sector,
              as: "sectors",
              attributes: ["id"],
              where: {
                productId,
              },
            },
          ],
        },
      ],
      attributes: ["name"],
    });

    return shelf;
  }

  async findByPk(id) {
    const shelf = await Shelf.findByPk(id, {
      include: [
        {
          model: Floor,
          as: "floors",
          attributes: ["id", "floorName"],
          include: [
            {
              model: Sector,
              as: "sectors",
              ...props2,
              include: [
                {
                  model: Product,
                  as: "products",
                  ...props3,
                },
              ],
            },
          ],
        },
      ],
      ...props,
      order: [[{ model: Floor, as: "floors" }, "id"]],
    });
    if (!shelf) return false;

    return shelf;
  }

  async list() {
    const shelves = await Shelf.findAll({
      order: [["name", "ASC"]],
      ...props,
    });
    return shelves;
  }

  async create({ shelf }, transaction) {
    const newShelf = await Shelf.create(shelf, {
      transaction,
    });

    return newShelf;
  }

  async delete(id, transaction) {
    const shelf = await Shelf.findByPk(id);
    if (!shelf) return false;

    await Shelf.destroy({ where: { id }, transaction });

    return true;
  }
}

export default ShelfService;
