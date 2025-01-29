export interface DessertItem {
  name: string;
  price: number;
  category: string;
  image: {
    thumbnail: string;
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

export interface CartItem extends DessertItem{
  quantity: number;
}
