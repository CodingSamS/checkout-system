export interface CheckoutItemSimple {
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
  lastUpdated: string,
  items: Array<CheckoutItem>
}

export interface EventStandalone {
  eventName: string,
  items: Array<CheckoutItem>
}

export interface EventStandaloneSimple {
  eventName: string,
  items: Array<CheckoutItemSimple>
}
