import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  rating,
  imageUrl,
}: ProductCardProps) {
  // const { addToCart } = useCart()

  const handleAddToCart = () => {
    console.log("Successfully added to cart with id", id);
    // addToCart({ id, name, price, quantity: 1 })
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={imageUrl}
        alt={name}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2">{category}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-black">
            ${price.toFixed(2)}
          </span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
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
