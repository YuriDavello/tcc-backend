import Batch from "../../models/Batch";
import Product from "../../models/Product";

const props = {
  attributes: ["id", "code", "product_id", "valid_till"],
};

const props2 = {
  attributes: ["id", "name", "category", "price", "weight"],
};
class BatchService {
  async findByPk(id) {
    const batch = await Batch.findByPk(id, { ...props });
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
