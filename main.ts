import "dotenv/config";
import { Request, Response } from "express";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { LoginUseCase } from "./src/application/use-cases/auth/login";
import { CreateCategoryUseCase } from "./src/application/use-cases/category/createCategory";
import { ListCategoriesUseCase } from "./src/application/use-cases/category/ListCategories";
import { CreateItemUseCase } from "./src/application/use-cases/item/createItem";
import { ListItemsUseCase } from "./src/application/use-cases/item/listItems";
import { CancelOrderUseCase } from "./src/application/use-cases/order/cancelOrder";
import { ChangeOrderStatusUseCase } from "./src/application/use-cases/order/changeOrderStatus";
import { CreateOrderUseCase } from "./src/application/use-cases/order/createOrder";
import { ListOrdersUseCase } from "./src/application/use-cases/order/listOrders";
import { MongoCategoryRepository } from "./src/infrastructure/database/mongoose/repositories/MongoCategoryRepository";
import { MongoItemRepository } from "./src/infrastructure/database/mongoose/repositories/MongoItemRepository";
import { MongoOrderRepository } from "./src/infrastructure/database/mongoose/repositories/MongoOrderRepository";
import { MongoUserRepository } from "./src/infrastructure/database/mongoose/repositories/MongoUserRepository";
import { AuthController } from "./src/infrastructure/http/controllers/AuthController";
import { CategoryController } from "./src/infrastructure/http/controllers/CategoryController";
import { ItemController } from "./src/infrastructure/http/controllers/ItemController";
import { OrderController } from "./src/infrastructure/http/controllers/OrderController";
import { authenticate } from "./src/infrastructure/http/middlewares/authenticate";
import { router } from "./src/infrastructure/http/routes";

async function bootstrap() {
  const {
    MONGO_URI = "mongodb://localhost:27017/novoSnack",
    PORT = "3001",
    CLIENT_URL = "http://localhost:5173",
  } = process.env;

  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

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
  );
  const itemController = new ItemController(createItem, listItems);
  const categoryController = new CategoryController(
    createCategory,
    listCategories,
  );

  router.post("/login", (req: Request, res: Response) =>
    authController.handleLogin(req, res),
  );

  //orders
  router.post("/orders", (req: Request, res: Response) =>
    orderController.handleCreate(req, res),
  );

  router.get("/orders", authenticate, (req: Request, res: Response) =>
    orderController.handleList(req, res),
  );

  router.patch(
    "/orders/:orderId",
    authenticate,
    (req: Request, res: Response) =>
      orderController.handleChangeStatus(req, res),
  );

  router.delete(
    "/orders/:orderId",
    authenticate,
    (req: Request, res: Response) => orderController.handleCancel(req, res),
  );

  //categories
  router.post("/categories", authenticate, (req: Request, res: Response) =>
    categoryController.handleCreate(req, res),
  );

  router.get("/categories", (req: Request, res: Response) =>
    categoryController.handleList(req, res),
  );

  //items
  router.post("/items", authenticate, (req: Request, res: Response) =>
    itemController.handleCreate(req, res),
  );

  router.get("/items", (req: Request, res: Response) =>
    itemController.handleList(req, res),
  );

  const app = express();
  app.use(cors({ origin: CLIENT_URL }));
  app.use(express.json());
  app.use(router);

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
