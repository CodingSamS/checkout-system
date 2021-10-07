export interface CheckoutItem {
  name: string;
  price: number;
  counter: number;
}

export interface Event {
  event: string;
  content: {
    lastUpdated: string,
    internal: Record<string, CheckoutItem>,
    external: Record<string, CheckoutItem>
  }
}
