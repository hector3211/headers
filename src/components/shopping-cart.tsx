import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  shoppingCart,
  addItemToCart,
  removeItemFromCart,
} from "@/stores/cart-store";
import { useStore } from "@nanostores/react";
import Headphones from "@/assets/sen-headphones.avif";
import HeadphonesTwo from "@/assets/headphones-four.avif";
import { useRef } from "react";

const popularItems = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    src: Headphones,
  },
  {
    id: "2",
    name: "Gaming Mouse",
    price: 49.99,
    src: HeadphonesTwo,
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    price: 129.99,
    src: Headphones,
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    price: 129.99,
    src: Headphones,
  },
  {
    id: "5",
    name: "Mechanical Keyboard",
    price: 129.99,
    src: Headphones,
  },
  {
    id: "6",
    name: "Mechanical Keyboard",
    price: 129.99,
    src: Headphones,
  },
];

export default function ShoppingCart() {
  const $cartItems = useStore(shoppingCart);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Increased scroll step for better navigation
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const updateQuantity = (id: string) => {
    const item = $cartItems.filter((item) => item.id === id);
    addItemToCart(item[0]!); // yikes
  };

  const subtotal = $cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07; // Assuming 7% tax
  const total = subtotal + tax;

  return (
    <div className=" container mx-auto p-4 pt-40 min-h-[calc(100vh-0rem)]">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
          </CardHeader>
          <CardContent>
            {$cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {$cartItems.map((item) => {
                  const imageUrl =
                    typeof item.src === "string" ? item.src : item.src.src;
                  return (
                    <li key={item.id} className="flex items-center space-x-4">
                      <div>
                        <img
                          src={imageUrl}
                          alt={`${item.name} image`}
                          className="rounded-md w-44"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeItemFromCart(item.id)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={() => updateQuantity(item.id)}
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItemFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (7%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <a href="/cart/checkout">Proceed to Checkout</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Carousel className="container mx-auto py-10">
        <CarouselContent className="-ml-1">
          {popularItems.map((item, index) => {
            const imageUrl =
              typeof item.src === "string" ? item.src : item.src.src;
            return (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="object-cover w-full rounded-md"
                      />
                      <span className="flex flex-col items-start justify-start w-full mt-5">
                        <h1 className="text-xl font-semibold text-gray-800 mb-1">
                          {item.name}
                        </h1>
                        <h3 className="text-sm text-gray-600 mb-2">
                          ${item.price}
                        </h3>
                      </span>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
