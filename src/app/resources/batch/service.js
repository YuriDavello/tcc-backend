import Batch from "../../models/Batch";
import Product from "../../models/Product";

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
}

export default BatchService;
