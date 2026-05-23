import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server as SockerIOServer } from "socket.io";
import multer from "multer";
import path from "path";
import { LoginUseCase } from "./src/application/use-cases/auth/Login.js";
import { CreateCategoryUseCase } from "./src/application/use-cases/category/CreateCategory.js";
import { ListCategoriesUseCase } from "./src/application/use-cases/category/ListCategories.js";
import { CreateItemUseCase } from "./src/application/use-cases/item/CreateItem.js";
import { ListItemsUseCase } from "./src/application/use-cases/item/ListItems.js";
import { CancelOrderUseCase } from "./src/application/use-cases/order/CancelOrder.js";
import { ChangeOrderStatusUseCase } from "./src/application/use-cases/order/ChangeOrderStatus.js";
import { CreateOrderUseCase } from "./src/application/use-cases/order/CreateOrder.js";
import { ListOrdersUseCase } from "./src/application/use-cases/order/ListOrders.js";
import { MongoCategoryRepository } from "./src/infrastructure/database/mongoose/repositories/MongoCategoryRepository.js";
import { MongoItemRepository } from "./src/infrastructure/database/mongoose/repositories/MongoItemRepository.js";
import { MongoOrderRepository } from "./src/infrastructure/database/mongoose/repositories/MongoOrderRepository.js";
import { MongoUserRepository } from "./src/infrastructure/database/mongoose/repositories/MongoUserRepository.js";
import { AuthController } from "./src/infrastructure/http/controllers/AuthController.js";
import { CategoryController } from "./src/infrastructure/http/controllers/CategoryController.js";
import { ItemController } from "./src/infrastructure/http/controllers/ItemController.js";
import { OrderController } from "./src/infrastructure/http/controllers/OrderController.js";
import { authenticate } from "./src/infrastructure/http/middlewares/authenticate.js";
import { router } from "./src/infrastructure/http/routes/index.js";
import { errorHandler } from "./src/infrastructure/http/middlewares/errorHandler.js";

async function bootstrap() {
  const {
    MONGO_URI = "mongodb://localhost:27017/novoSnack",
    PORT = "3001",
    CLIENT_URL = "http://localhost:5173",
  } = process.env;

  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const authRepository = new MongoUserRepository();
  const orderRepository = new MongoOrderRepository();
  const categoryRepository = new MongoCategoryRepository();
  const itemRepository = new MongoItemRepository();

  const login = new LoginUseCase(authRepository);
  const createOrder = new CreateOrderUseCase(orderRepository);
  const createCategory = new CreateCategoryUseCase(categoryRepository);
  const createItem = new CreateItemUseCase(itemRepository);
  const listOrders = new ListOrdersUseCase(orderRepository);
  const listCategories = new ListCategoriesUseCase(categoryRepository);
  const listItems = new ListItemsUseCase(itemRepository);
  const changeOrderStatus = new ChangeOrderStatusUseCase(orderRepository);
  const cancelOrder = new CancelOrderUseCase(orderRepository);

  const authController = new AuthController(login);
  const orderController = new OrderController(
    createOrder,
    listOrders,
    changeOrderStatus,
    cancelOrder,
    io,
  );
  const itemController = new ItemController(createItem, listItems);
  const categoryController = new CategoryController(
    createCategory,
    listCategories,
  );

  router.post("/login", (req: Request, res: Response, next: NextFunction) =>
    authController.handleLogin(req, res, next),
  );

  //orders
  router.post(
    "/orders",
    authenticate,
    (req: Request, res: Response, next: NextFunction) =>
      orderController.handleCreate(req, res, next),
  );

  router.get(
    "/orders",
    authenticate,
    (req: Request, res: Response, next: NextFunction) =>
      orderController.handleList(req, res, next),
  );

  router.patch(
    "/orders/:orderId",
    authenticate,
    (req: Request, res: Response, next: NextFunction) =>
      orderController.handleChangeStatus(req, res, next),
  );

  router.delete(
    "/orders/:orderId",
    authenticate,
    (req: Request, res: Response, next: NextFunction) =>
      orderController.handleCancel(req, res, next),
  );

  //categories
  router.post(
    "/categories",
    authenticate,
    (req: Request, res: Response, next: NextFunction) =>
      categoryController.handleCreate(req, res, next),
  );

  router.get("/categories", (req: Request, res: Response, next: NextFunction) =>
    categoryController.handleList(req, res, next),
  );

  router.get(
    "/categories/:categoryId/products",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { categoryId } = req.params;
        const { ItemModel } =
          await import("./src/infrastructure/database/mongoose/models/ItemModel.js");
        const items = await ItemModel.find({ itemCategory: categoryId }).lean();
        const result = items.map((doc: any) => ({
          _id: doc._id,
          name: doc.itemName,
          description: doc.itemDescription,
          imagePath: doc.imagePath ?? "",
          price: doc.itemPrice,
          category: doc.itemCategory,
          ingredients: (doc.itemIngredients ?? []).map((ing: any) => ({
            _id: ing._id,
            name: ing.name,
            icon: ing.icon,
          })),
        }));
        return res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    },
  );

  //products
  router.post(
    "/products",
    authenticate,
    (req: Request, res: Response, next: NextFunction) =>
      itemController.handleCreate(req, res, next),
  );

  router.get("/products", (req: Request, res: Response, next: NextFunction) =>
    itemController.handleList(req, res, next),
  );

  const app = express();
  const httpServer = createServer(app);
  const io = new SockerIOServer(httpServer, {
    cors: { origin: "*" },
  });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  });
  const upload = multer({ storage });
  app.use(cors({ origin: CLIENT_URL }));
  app.use(express.json());
  app.use(router);
  app.use(errorHandler);

  httpServer.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  app.use("/uploads", express.static(path.resolve("uploads")));

  router.post(
    "/products",
    authenticate,
    upload.single("image"),
    (req: Request, res: Response, next: NextFunction) =>
      itemController.handleList(req, res, next),
  );
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
