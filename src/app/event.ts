export interface SimpleCheckoutItem {
  name: string;
  price: number;
  counter: number;
}

export interface CheckoutItem {
  name: string;
  price: number;
  counterExternal: number;
  counterInternal: number;
}

export interface Event {
  event: string;
  content: {
    lastUpdated: Date,
    items: Record<string, CheckoutItem>
  }
}
