import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/stores/cart-store";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  category?: string;
  tags: string[];
  price: number;
  rating: number;
  imageUrl: string;
}

export default function ProductCard(props: ProductCardProps) {
  const handleAddToCart = () => {
    addItemToCart({ ...props, src: props.imageUrl, quantity: 1 });
    return toast.success("Successfully added to cart");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={props.imageUrl}
        alt={props.name}
        width={300}
        height={300}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {props.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{props.category}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-black">
            ${props.price.toFixed(2)}
          </span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < props.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
