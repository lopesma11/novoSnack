import { CreateCategoryUseCase } from "./src/application/use-cases/category/createCategory";
import { CreateOrderUseCase } from "./src/application/use-cases/order/createOrder";
import { MongoCategoryRepository } from "./src/infrastructure/database/mongoose/repositories/MongoCategoryRepository";
import { MongoOrderRepository } from "./src/infrastructure/database/mongoose/repositories/MongoOrderRepository";
import { CategoryController } from "./src/infrastructure/http/controllers/CategoryController";
import { OrderController } from "./src/infrastructure/http/controllers/OrderController";
import { router } from "./src/infrastructure/http/routes";

const orderRepository = new MongoOrderRepository();

const createOrder = new CreateOrderUseCase(orderRepository);

const orderController = new OrderController(createOrder);

const categoryRepository = new MongoCategoryRepository();

const createCategory = new CreateCategoryUseCase(categoryRepository);

const categoryController = new CategoryController(createCategory);

router.post("/orders", (req: Request, res: Response) =>
  orderController.handle(req, res),
);

router.post("/categories", (req: Request, res: Response) =>
  categoryController.handle(req, res),
);
