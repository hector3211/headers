import { atom } from "nanostores";

export const isCartOpen = atom(false);

export type CartItem = {
  id: string;
  price: number;
  quantity: number;
  src: ImageMetadata | string;
};

export const shoppingCart = atom<CartItem[]>([]);

export function addItemToCart(product: CartItem) {
  const currentCart = shoppingCart.get();
  const existingItem = currentCart.find((item) => item.id === product.id);

  if (existingItem) {
    const updatedCart = currentCart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    shoppingCart.set(updatedCart);
    return;
  }

  shoppingCart.set([...currentCart, { ...product, quantity: 1 }]);
}

export function removeItemFromCart(id: string) {
  const currentCart = shoppingCart.get();
  const existingItem = currentCart.find((item) => item.id === id);

  if (existingItem) {
    if (existingItem.quantity > 1) {
      const updatedCart = currentCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
      shoppingCart.set(updatedCart);
      return;
    }

    shoppingCart.set(currentCart.filter((item) => item.id !== id));
  }
}
