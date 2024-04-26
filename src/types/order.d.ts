export type ProductOrderItem = {
  productId: string;
  quantity: number;
};

export type CreateOrderRequest = {
  userId: string;
  products: ProductOrderItem[];
};
