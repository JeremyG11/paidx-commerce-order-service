import { Router } from "express";
import { schemaValidator } from "@paidx-prisma-client/dist/utils/validators";

import * as OrderControllers from "@/controllers";
import { CreateOrderRequestSchema } from "@/schemas";

const router = Router();

router.get("/", OrderControllers.getOrders);
router.post(
  "/place-order",
  schemaValidator(CreateOrderRequestSchema),
  OrderControllers.placeOrder
);
export default router;
