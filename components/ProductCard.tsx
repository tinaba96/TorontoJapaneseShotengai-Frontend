import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0 relative">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-white px-3 py-1 m-2 rounded-full text-sm font-semibold text-gray-700 flex items-center">
          <DollarSign className="w-4 h-4 mr-1" />
          {product.price}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          {product.name}
        </h3>
        <Button className="w-full mt-2">カートに追加</Button>
      </CardFooter>
    </Card>
  );
}
