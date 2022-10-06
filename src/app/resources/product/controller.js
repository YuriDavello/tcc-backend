import ProductService from "./service";
// import ProductService from "../product/service";

class ProductController {
  async list(req, res) {
    const { $filter } = req.query;
    const productService = new ProductService();
    const products = await productService.list({ filter: $filter });
    res.json(products);
  }

  async listNonRelatedProducts(req, res) {
    const { $filter } = req.query;
    const productService = new ProductService();
    const products = await productService.listNonRelatedProducts({
      filter: $filter,
    });
    res.json(products);
  }

  async create(req, res) {
    const { product } = req.body;

    const productService = new ProductService();

    const productExists = await productService.get({ name: product.name });
    if (productExists)
      return res
        .status(400)
        .json({ message: "Nome já pertence à outro produto" });

    const newProduct = await productService.create({
      product,
    });

    return res.json(newProduct);
  }

  async get(req, res) {
    const { id } = req.params;

    const productService = new ProductService();

    const product = await productService.findByPk(id);

    if (!product)
      return res
        .status(400)
        .json({ status: 400, message: "Produto não encontrado" });

    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;

    const productService = new ProductService();

    const product = await productService.delete(id);
    if (!product)
      return res.status(400).json({ message: "Produto não existe" });

    return res.sendStatus(204);
  }

  async update(req, res) {
    const { id } = req.params;

    const productService = new ProductService();

    const product = await productService.findByPk(id);

    if (!product)
      return res.status(400).json({ message: "Produto inexistente" });

    await product.update({
      ...req.body,
    });

    const response = await productService.findByPk(id);

    return res.json(response);
  }
}

export default new ProductController();
