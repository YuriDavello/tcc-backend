import Sector from "../../models/Sector";

class SectorService {
  async findByPk(id) {
    //TODO: INCLUDE DO PRODUTO NO SETOR E A QUANTIDADE
    const sector = await Sector.findByPk(id, {
      attributes: ["id", "quantityLines", "quantityColumns"],
    });
    if (!sector) return false;

    return sector;
  }

  async list(floorId) {
    const sectors = await Sector.findAll({
      order: [["id", "ASC"]],
      where: {
        floorId,
      },
      attributes: ["id", "nameFloor", "shelfId"],
    });
    return sectors;
  }

  async create({ floorId, sector }, transaction) {
    const newSector = await Floor.create(
      {
        floorId,
        ...sector,
      },
      {
        transaction,
      }
    );
    return newSector;
  }

  async delete(id, transaction) {
    const sector = await Sector.findByPk(id);
    if (!sector) return false;

    await Sector.destroy({ where: { id }, transaction });

    return true;
  }

  async update({ id, sector }, transaction) {
    const sectorUpdated = await Sector.update(
      {
        ...sector,
      },
      {
        where: {
          id,
        },
        transaction,
      }
    );

    return sectorUpdated;
  }
}

export default SectorService;
