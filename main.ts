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
import { CategoryController } from "./src/infrastructure/http/controllers/CategoryController";
import { ItemController } from "./src/infrastructure/http/controllers/ItemController";
import { OrderController } from "./src/infrastructure/http/controllers/OrderController";
import { router } from "./src/infrastructure/http/routes";

const orderRepository = new MongoOrderRepository();
const categoryRepository = new MongoCategoryRepository();
const itemRepository = new MongoItemRepository();

const createOrder = new CreateOrderUseCase(orderRepository);
const createCategory = new CreateCategoryUseCase(categoryRepository);
const createItem = new CreateItemUseCase(itemRepository);

const listOrders = new ListOrdersUseCase(orderRepository);
const listCategories = new ListCategoriesUseCase(categoryRepository);
const listItems = new ListItemsUseCase(itemRepository);

const changeOrderStatus = new ChangeOrderStatusUseCase(orderRepository);

const cancelOrder = new CancelOrderUseCase(orderRepository);

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

//orders
router.post("/orders", (req: Request, res: Response) =>
  orderController.handleCreate(req, res),
);

router.get("/orders", (req: Request, res: Response) =>
  orderController.handleList(req, res),
);

router.patch("/orders/:orderId", (req: Request, res: Response) =>
  orderController.handleChangeStatus(req, res),
);

router.post("/orders/:orderId", (req: Request, res: Response) =>
  orderController.handleCancel(req, res),
);

//categories
router.post("/categories", (req: Request, res: Response) =>
  categoryController.handleCreate(req, res),
);

router.get("/categories", (req: Request, res: Response) =>
  categoryController.handleList(req, res),
);

//items
router.post("/items", (req: Request, res: Response) =>
  itemController.handleCreate(req, res),
);

router.get("/items", (req: Request, res: Response) =>
  itemController.handleList(req, res),
);
