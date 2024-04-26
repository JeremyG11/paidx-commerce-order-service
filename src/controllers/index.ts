import { Request, Response } from "express";
import { db } from "@paidx-prisma-client/dist";
import { ProductOrderItem } from "@/types/order";

export const placeOrder = async (req: Request, res: Response) => {
  const { userId, products } = req.body as {
    userId: string;
    products: ProductOrderItem[];
  };
  try {
    await db.$transaction(async (db) => {
      const order = await db.order.create({
        data: {
          userId,
          items: {
            createMany: {
              data: products.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
                unitPrice: 0,
              })),
              skipDuplicates: true,
            },
          },
        },
        include: {
          items: true,
        },
      });
      console.table(order.items);
      for (let item of order.items) {
        const product = await db.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) {
          throw new Error("Product not found");
        }
        await db.orderItem.update({
          where: { id: item.id },
          data: {
            unitPrice: product.price,
          },
        });
      }

      return res.json(order);
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).send("Failed to create order.");
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await db.order.findMany({});
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
