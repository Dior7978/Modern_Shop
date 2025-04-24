import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Electronics",
    itemCount: 243,
  },
  {
    id: 2,
    name: "Clothing",
    itemCount: 532,
  },
  {
    id: 3,
    name: "Home & Kitchen",
    itemCount: 321,
  },
  {
    id: 4,
    name: "Beauty & Personal Care",
    itemCount: 156,
  },
]

export function CategoryShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="group relative overflow-hidden rounded-lg border hover:border-primary transition-colors"
        >
          <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
              <p className="text-sm text-white/90">{category.itemCount} Products</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
