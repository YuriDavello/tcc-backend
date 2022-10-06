import Batch from "../../models/Batch";
import Product from "../../models/Product";
import SectorService from "../sector/service";
import Database from "../../../database/index";

const props = {
  attributes: [
    "id",
    "code",
    "productId",
    "sectorId",
    "validTill",
    "productQuantity",
    "isQrCodeEmitted",
    "status",
  ],
};

const props2 = {
  attributes: ["id", "name", "category", "price", "weight"],
};

const props3 = {
  attributes: ["id", "name"],
};
class BatchService {
  async getByCode({ code }) {
    const batch = await Batch.findAll({
      where: { code },
    });

    return batch;
  }
  async findByPk(id) {
    const batch = await Batch.findByPk(id, {
      include: {
        model: Product,
        as: "product",
        ...props3,
      },
      ...props,
    });

    if (!batch) return false;

    return batch;
  }

  async list() {
    const batches = await Batch.findAll({
      order: [["id", "ASC"]],
      include: {
        model: Product,
        as: "product",
        ...props2,
      },
      ...props,
    });
    return batches;
  }

  async create({ batch }, transaction) {
    const newBatch = await Batch.create(batch, {
      transaction,
    });
    return newBatch;
  }

  async delete(id, transaction) {
    const batch = await Batch.findByPk(id);
    if (!batch) return false;

    await Batch.destroy({ where: { id }, transaction });

    return true;
  }

  async insertBatch({ batch }) {
    const sectorService = new SectorService();

    const [batchProductSector] = await sectorService.productSectorExists({
      productId: batch.productId,
    });

    if (!batchProductSector) return null;

    const { fitsQuantity: sectorFitsQuantity } = batchProductSector;

    const sql = `SELECT available_quantity FROM SECTORS WHERE product_id=${batch.productId}`;

    const [response] = await Database.connection.query(sql);

    const { available_quantity: availableQuantity } = response[0];

    if (
      availableQuantity <= (sectorFitsQuantity || 0) ||
      availableQuantity === null ||
      availableQuantity === 0
    ) {
      await batch.update({
        status: "Ativo",
        sectorId: batchProductSector.id,
      });

      await batchProductSector.update({
        availableQuantity: (availableQuantity || 0) + 1,
      });

      const batchResponse = await this.findByPk(batch.id);
      const sectorResponse = await sectorService.findByPk(
        batchProductSector.id
      );

      return {
        batchResponse,
        sectorResponse,
      };
    }
  }

  async removeBatch({ batch }) {
    const { sectorId: batchSectorId } = batch;

    const sectorService = new SectorService();

    const sector = await sectorService.findByPk(batchSectorId);

    const { availableQuantity: currentQuantity } = sector;

    await batch.update({
      status: "Vendido",
      sectorId: null,
    });

    await sector.update({
      availableQuantity: currentQuantity - 1,
    });

    const batchResponse = await this.findByPk(batch.id);
    const sectorResponse = await sectorService.findByPk(batchSectorId);

    return {
      batchResponse,
      sectorResponse,
    };
  }
}

export default BatchService;
