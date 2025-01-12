import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { addItemToCart, type CartItem } from "@/stores/cart-store";

interface Props {
  product: CartItem;
}

export default function AddToCartButton({ product }: Props) {
  function handleClick() {
    console.log("being clicked!");
    addItemToCart(product);
  }
  return (
    <Button size={"icon"} onClick={handleClick}>
      <Plus />
    </Button>
  );
}
