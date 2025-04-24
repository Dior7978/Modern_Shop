import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import ProductCard from "@/components/product-card"

// Sample products data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    purchases: 1243,
    category: "Electronics",
    description:
      "Experience premium sound quality with these wireless headphones featuring noise cancellation technology.",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 249.99,
    rating: 4.7,
    purchases: 856,
    category: "Furniture",
    description:
      "Stay comfortable during long work hours with this ergonomic office chair designed for proper posture support.",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 129.99,
    rating: 4.5,
    purchases: 2156,
    category: "Wearables",
    description:
      "Track your fitness goals with this smart watch featuring heart rate monitoring and activity tracking.",
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    rating: 4.6,
    purchases: 1876,
    category: "Electronics",
    description: "Take your music anywhere with this waterproof portable speaker with 20-hour battery life.",
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    rating: 4.3,
    purchases: 3421,
    category: "Clothing",
    description: "Stay comfortable and stylish with this eco-friendly organic cotton t-shirt.",
  },
  {
    id: 6,
    name: "Professional Knife Set",
    price: 149.99,
    rating: 4.9,
    purchases: 752,
    category: "Kitchen",
    description: "Prepare meals like a professional chef with this high-quality stainless steel knife set.",
  },
]

export default function ProductsPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Browse our collection of high-quality products</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search products..." className="w-full md:w-[200px] lg:w-[300px]" />
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <div className="hidden md:block">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Categories</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="electronics" />
                  <Label htmlFor="electronics">Electronics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="furniture" />
                  <Label htmlFor="furniture">Furniture</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wearables" />
                  <Label htmlFor="wearables">Wearables</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="clothing" />
                  <Label htmlFor="clothing">Clothing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="kitchen" />
                  <Label htmlFor="kitchen">Kitchen</Label>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
              <div className="space-y-4">
                <Slider defaultValue={[0, 500]} max={1000} step={10} />
                <div className="flex items-center justify-between">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="mb-4 text-lg font-semibold">Rating</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-4" />
                  <Label htmlFor="rating-4">4 Stars & Above</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-3" />
                  <Label htmlFor="rating-3">3 Stars & Above</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-2" />
                  <Label htmlFor="rating-2">2 Stars & Above</Label>
                </div>
              </div>
            </div>
            <Separator />
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Showing {products.length} products</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
