import BatchService from "./service";
import ProductService from "../product/service";
import SectorService from "../sector/service";

class BatchController {
  async list(req, res) {
    const batchService = new BatchService();
    const batches = await batchService.list();
    res.json(batches);
  }

  async create(req, res) {
    const { batch } = req.body;
    const { code, productId } = batch;

    const batchService = new BatchService();
    const productService = new ProductService();

    const productExists = await productService.findByPk(productId);

    if (!productExists)
      return res.status(400).json({ message: "Produto do lote não existe" });

    const batchExists = await batchService.getByCode({ code });

    if (batchExists.length > 0)
      return res
        .status(400)
        .json({ message: "Outro lote já possui esse código" });

    const newBatch = await batchService.create({
      batch,
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
    const { isQRCodeEmitted } = req.body;

    if (isQRCodeEmitted)
      return res.status(400).json({
        message: "Não é possível atualizar o produto, QR code já foi emitido",
      });

    const batchService = new BatchService();

    const batch = await batchService.findByPk(id);

    if (!batch) return res.status(400).json({ message: "Lote inexistente" });

    await batch.update({
      ...req.body,
    });

    const response = await batchService.findByPk(id);

    return res.json(response);
  }

  async updateStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;

    const batchService = new BatchService();

    const batch = await batchService.findByPk(id);

    if (!batch) return res.status(400).json({ message: "Lote inexistente" });

    if (status === "Ativo") {
      const updatedBatch = await batchService.insertBatch({ batch });
      if (!updatedBatch)
        return res
          .status(400)
          .json({
            message: "Não existe setor com o produto do lote informado",
          });
    }
  }
}

export default new BatchController();
