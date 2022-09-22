import BatchService from "./service";
// import ProductService from "../product/service";

class BatchController {
  async list(req, res) {
    const batchService = new BatchService();
    const batches = await batchService.list();
    res.json(batches);
  }

  async create(req, res) {
    const { batch } = req.body;

    const batchService = new BatchService();

    const newBatch = await batchService.create({
      ...batch,
    });

    return res.json(newBatch);
  }

  async get(req, res) {
    const { id } = req.params;

    const batchService = new BatchService();

    const batch = await batchService.findByPk(id);

    if (!batch)
      return res
        .status(400)
        .json({ status: 400, message: "Lote não encontrado" });

    return res.json(batch);
  }

  async delete(req, res) {
    const { id } = req.params;

    const batchService = new BatchService();

    if (!batch) return res.status(400).json({ message: "Lote não existe" });

    const batch = await batchService.delete(id);

    return res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;

    const batchService = new BatchService();

    const batch = await batchService.findByPk(id);

    if (!batch) return res.status(400).json({ message: "Lote inexistente" });

    await batch.update({
      ...req.body,
    });

    const response = await batchService.findByPk(id);

    return res.json(response);
  }
}

export default new BatchController();
