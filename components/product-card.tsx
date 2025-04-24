"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: "/placeholder.jpg", // Placeholder image path
    })
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg border">
        <div className="aspect-square overflow-hidden bg-gray-200">
          <div className="w-full h-full flex items-center justify-center text-gray-500">{product.name}</div>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/70"
            onClick={toggleFavorite}
          >
            <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-600")} />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">{product.category}</div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>
          <h3 className="mt-1 font-semibold text-lg truncate">{product.name}</h3>
          <div className="mt-1 flex items-center justify-between">
            <div className="font-semibold">${product.price.toFixed(2)}</div>
            <div className="text-sm text-gray-500">{product.purchases} sold</div>
          </div>
          <div className="mt-4">
            <Button className="w-full gap-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
