import Shelf from "../../models/Shelf";

class ShelfService {
  async get({ code }) {
    const shelf = await Shelf.findOne({
      where: {
        code,
      },
    });
    return shelf;
  }

  async findByPk(id) {
    const shelf = await Shelf.findByPk(id);
    if (!shelf) return false;

    return shelf;
  }

  async create({ name, sections, type, code }, transaction) {
    const newShelf = await Shelf.create(
      {
        name,
        code,
        sections,
        type,
      },
      {
        transaction,
      }
    );
    return newShelf;
  }

  async delete(id, transaction) {
    const shelf = await User.findByPk(id);
    if (!shelf) return false;

    await Shelf.destroy({ where: { id }, transaction });

    return true;
  }

  async update({ id, name, sections, type, code }, transaction) {
    const shelfUpdated = await Shelf.update(
      {
        name,
        code,
        sections,
        type,
      },
      {
        where: {
          id,
        },
        transaction,
      }
    );

    return shelfUpdated;
  }

  async list() {
    const shelves = await Shelf.findAll({
      order: [["name", "ASC"]],
    });
    return shelves;
  }
}
export default ShelfService;
