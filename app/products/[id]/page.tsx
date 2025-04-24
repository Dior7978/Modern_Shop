"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

// Sample product data - in a real app, this would come from an API or database
const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    reviews: 124,
    purchases: 1243,
    category: "Electronics",
    description:
      "Experience premium sound quality with these wireless headphones featuring noise cancellation technology. Perfect for music lovers and professionals alike.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Comfortable over-ear design",
    ],
    specifications: {
      Brand: "AudioTech",
      Model: "SoundPro X1",
      Color: "Matte Black",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Battery: "1000mAh rechargeable",
      Charging: "USB-C",
    },
    stock: 45,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  // Find the product based on the ID from the URL
  const product = products.find((p) => p.id === params.id) || products[0]

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: "/placeholder.jpg", // Placeholder image path
    })
  }

  // Create an array of 4 placeholder images for the product
  const productImages = [0, 1, 2, 3].map((i) => ({
    id: i,
    label: `View ${i + 1}`,
  }))

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <Link href="/products" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-gray-200">
            <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
              {product.name} - View {selectedImage + 1}
            </div>
          </div>
          <div className="flex space-x-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "overflow-hidden rounded-md border bg-gray-200",
                  selectedImage === index && "ring-2 ring-primary",
                )}
                onClick={() => setSelectedImage(index)}
              >
                <div className="h-20 w-20 flex items-center justify-center text-xs text-gray-500">{image.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted",
                    )}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{product.rating}</span>
              </div>
              <div className="text-sm text-muted-foreground">{product.reviews} reviews</div>
              <div className="text-sm text-muted-foreground">{product.purchases} sold</div>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Description</div>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stock}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">{product.stock} available</div>
          </div>

          <div className="flex space-x-4">
            <Button className="flex-1 gap-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
              <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "")} />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm font-medium">Free shipping on orders over $50</div>
            </div>
          </div>

          <Tabs defaultValue="features">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="space-y-4 pt-4">
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="pt-4">
              <div className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-2 border-b py-2">
                    <div className="font-medium">{key}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Reviews will be displayed here. In a real application, this would fetch customer reviews from a
                  database.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
