import { z } from "zod";

export const ProductOrderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

export const CreateOrderRequestSchema = z.object({
  userId: z.string(),
  products: z.array(ProductOrderItemSchema),
});

export type CreateOrderRequest = z.infer<typeof CreateOrderRequestSchema>;
