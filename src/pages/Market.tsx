import { useState } from "react";
import { Search, ShoppingBag, Heart, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  farmer: string;
  location: string;
  image: string;
  rating: number;
  stock: string;
  category: string;
}

const marketProducts: Product[] = [
  {
    id: "v1",
    name: "Organic Tomatoes",
    price: 3.5,
    unit: "kg",
    farmer: "Green Valley Farm",
    location: "Ibadan, Oyo",
    image:
      "https://images.unsplash.com/photo-1546470427-227dea9e7afc?w=400&h=400&fit=crop",
    rating: 4.8,
    stock: "In Stock",
    category: "Vegetables",
  },
  {
    id: "v2",
    name: "Sweet Potatoes",
    price: 2.8,
    unit: "kg",
    farmer: "Earth Harvest",
    location: "Osogbo, Osun",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.7,
    stock: "In Stock",
    category: "Vegetables",
  },
  {
    id: "v3",
    name: "Organic Carrots",
    price: 2.2,
    unit: "kg",
    farmer: "Root & Grow",
    location: "Lagos",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.9,
    stock: "In Stock",
    category: "Vegetables",
  },
  {
    id: "v4",
    name: "Fresh Lettuce",
    price: 1.5,
    unit: "head",
    farmer: "Green Leaf Farms",
    location: "Ibadan, Oyo",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    rating: 4.6,
    stock: "In Stock",
    category: "Vegetables",
  },
  {
    id: "v5",
    name: "Green Beans",
    price: 2.1,
    unit: "kg",
    farmer: "Harvest Pros",
    location: "Kwara",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.5,
    stock: "In Stock",
    category: "Vegetables",
  },
  {
    id: "v6",
    name: "Cucumbers",
    price: 2.0,
    unit: "kg",
    farmer: "Cool Farms",
    location: "Niger State",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.4,
    stock: "In Stock",
    category: "Vegetables",
  },
  {
    id: "v7",
    name: "Bell Peppers Mix",
    price: 3.0,
    unit: "kg",
    farmer: "Colorful Harvest",
    location: "Ekiti",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.8,
    stock: "Limited",
    category: "Vegetables",
  },
  {
    id: "v8",
    name: "Spinach (Local Variety)",
    price: 1.9,
    unit: "kg",
    farmer: "Green Field Farms",
    location: "Oyo State",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    rating: 4.3,
    stock: "In Stock",
    category: "Vegetables",
  },
  {
    id: "v9",
    name: "Okra (Fresh)",
    price: 2.4,
    unit: "kg",
    farmer: "Southern Farms",
    location: "Rivers State",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.7,
    stock: "In Stock",
    category: "Vegetables",
  },
  {
    id: "v10",
    name: "Zucchini",
    price: 2.5,
    unit: "kg",
    farmer: "Farm Fresh Produce",
    location: "Kaduna",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.2,
    stock: "In Stock",
    category: "Vegetables",
  },

  {
    id: "f1",
    name: "Plantains",
    price: 1.8,
    unit: "bunch",
    farmer: "Tropical Harvest",
    location: "Ibadan, Oyo",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    rating: 4.8,
    stock: "In Stock",
    category: "Fruits",
  },
  {
    id: "f2",
    name: "Mangoes (Seasonal)",
    price: 3.5,
    unit: "kg",
    farmer: "Sunshine Orchards",
    location: "Ogun",
    image:
      "https://images.unsplash.com/photo-1546470427-227dea9e7afc?w=400&h=400&fit=crop",
    rating: 4.9,
    stock: "Limited",
    category: "Fruits",
  },
  {
    id: "f3",
    name: "Avocados",
    price: 4.0,
    unit: "kg",
    farmer: "Green Valley Farm",
    location: "Lagos",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.7,
    stock: "In Stock",
    category: "Fruits",
  },
  {
    id: "f4",
    name: "Papayas",
    price: 2.9,
    unit: "kg",
    farmer: "Tropical Harvest",
    location: "Oyo",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    rating: 4.6,
    stock: "In Stock",
    category: "Fruits",
  },
  {
    id: "f5",
    name: "Bananas",
    price: 1.6,
    unit: "kg",
    farmer: "Sunrise Farms",
    location: "Adamawa",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.4,
    stock: "In Stock",
    category: "Fruits",
  },
  {
    id: "f6",
    name: "Watermelons",
    price: 3.2,
    unit: "each",
    farmer: "Green Leaf Farms",
    location: "Kano",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.9,
    stock: "Limited",
    category: "Fruits",
  },
  {
    id: "f7",
    name: "Pineapples",
    price: 3.8,
    unit: "each",
    farmer: "Tropical Fruits Co.",
    location: "Cross River",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    rating: 4.7,
    stock: "In Stock",
    category: "Fruits",
  },
  {
    id: "f8",
    name: "Oranges",
    price: 2.1,
    unit: "kg",
    farmer: "Citrus Orchards",
    location: "Ekiti",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.5,
    stock: "In Stock",
    category: "Fruits",
  },
  {
    id: "f9",
    name: "Strawberries",
    price: 5.0,
    unit: "box",
    farmer: "Berry Farms",
    location: "Enugu",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.8,
    stock: "Limited",
    category: "Fruits",
  },
  {
    id: "f10",
    name: "Grapes",
    price: 4.4,
    unit: "kg",
    farmer: "Vineyard Farms",
    location: "Kaduna",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    rating: 4.6,
    stock: "In Stock",
    category: "Fruits",
  },

  {
    id: "p1",
    name: "Farm Eggs",
    price: 4.5,
    unit: "dozen",
    farmer: "Happy Hens Co.",
    location: "Abeokuta, Ogun",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    rating: 5.0,
    stock: "In Stock",
    category: "Poultry",
  },
  {
    id: "p2",
    name: "Free-Range Chicken (Whole)",
    price: 12.0,
    unit: "kg",
    farmer: "FreeRange Farms",
    location: "Osun",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.9,
    stock: "Limited",
    category: "Poultry",
  },
  {
    id: "p3",
    name: "Chicken Breasts",
    price: 10.5,
    unit: "kg",
    farmer: "Southern Poultry",
    location: "Lagos",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.8,
    stock: "In Stock",
    category: "Poultry",
  },
  {
    id: "p4",
    name: "Chicken Wings",
    price: 9.0,
    unit: "kg",
    farmer: "WingMasters Farm",
    location: "Oyo",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    rating: 4.7,
    stock: "In Stock",
    category: "Poultry",
  },
  {
    id: "p5",
    name: "Hatching Chicks (Box)",
    price: 6.0,
    unit: "box",
    farmer: "ChickStart Inc.",
    location: "Benue",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.3,
    stock: "Limited",
    category: "Poultry",
  },
  {
    id: "p6",
    name: "Duck Eggs",
    price: 5.5,
    unit: "dozen",
    farmer: "Quack Farms",
    location: "Imo",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.5,
    stock: "In Stock",
    category: "Poultry",
  },
  {
    id: "p7",
    name: "Chicken Organs (Liver/Heart)",
    price: 7.0,
    unit: "kg",
    farmer: "OrganPlus Poultry",
    location: "Rivers",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    rating: 4.6,
    stock: "In Stock",
    category: "Poultry",
  },
  {
    id: "p8",
    name: "Turkey Whole",
    price: 14.0,
    unit: "kg",
    farmer: "TurkeyTales Farm",
    location: "Lagos",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.4,
    stock: "Limited",
    category: "Poultry",
  },
  {
    id: "p9",
    name: "Free-Range Quail Eggs",
    price: 8.0,
    unit: "dozen",
    farmer: "QuailQuest Farms",
    location: "Ogun",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.7,
    stock: "In Stock",
    category: "Poultry",
  },
  {
    id: "p10",
    name: "Chicken Sausages",
    price: 11.0,
    unit: "kg",
    farmer: "SausageWorks Poultry",
    location: "Kaduna",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    rating: 4.5,
    stock: "In Stock",
    category: "Poultry",
  },

  {
    id: "r1",
    name: "Fresh Honey",
    price: 8.0,
    unit: "jar",
    farmer: "Golden Bee Apiaries",
    location: "Abeokuta, Ogun",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784169?w=400&h=400&fit=crop",
    rating: 5.0,
    stock: "Limited",
    category: "Produce",
  },
  {
    id: "r2",
    name: "Raw Shea Butter",
    price: 7.0,
    unit: "kg",
    farmer: "SheaGold Farms",
    location: "Kwara",
    image:
      "https://images.unsplash.com/photo-1590175482129-1a8b27698780?w=400&h=400&fit=crop",
    rating: 4.8,
    stock: "In Stock",
    category: "Produce",
  },
  {
    id: "r3",
    name: "Palm Oil (Cold-Pressed)",
    price: 6.5,
    unit: "litre",
    farmer: "GoldPalm Estates",
    location: "Delta",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.7,
    stock: "In Stock",
    category: "Produce",
  },
  {
    id: "r4",
    name: "Cashew Nuts (Raw)",
    price: 9.0,
    unit: "kg",
    farmer: "NutHarvest Co.",
    location: "Ogun",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    rating: 4.6,
    stock: "In Stock",
    category: "Produce",
  },
  {
    id: "r5",
    name: "Cocoa Beans (Fermented)",
    price: 10.0,
    unit: "kg",
    farmer: "CocoaPrime Farms",
    location: "Cross River",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.9,
    stock: "Limited",
    category: "Produce",
  },
  {
    id: "r6",
    name: "Groundnut (Peanuts)",
    price: 5.0,
    unit: "kg",
    farmer: "GroundPro Farms",
    location: "Kano",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.4,
    stock: "In Stock",
    category: "Produce",
  },
  {
    id: "r7",
    name: "Shea Nuts (Raw)",
    price: 4.2,
    unit: "kg",
    farmer: "SheaGold Farms",
    location: "Oyo",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    rating: 4.3,
    stock: "In Stock",
    category: "Produce",
  },
  {
    id: "r8",
    name: "Bee Pollen",
    price: 8.5,
    unit: "jar",
    farmer: "Golden Bee Apiaries",
    location: "Ogun",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    rating: 4.8,
    stock: "Limited",
    category: "Produce",
  },
  {
    id: "r9",
    name: "Herbal Tea Leaves (Dried)",
    price: 3.0,
    unit: "pack",
    farmer: "GreenLeaf Herbal",
    location: "Ekiti",
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    rating: 4.5,
    stock: "In Stock",
    category: "Produce",
  },
  {
    id: "r10",
    name: "Organic Wheat Flour (Wholegrain)",
    price: 2.8,
    unit: "kg",
    farmer: "GrainHarvest Farms",
    location: "Kaduna",
    image:
      "https://images.unsplash.com/photo-1590175482129-1a8b27698780?w=400&h=400&fit=crop",
    rating: 4.2,
    stock: "In Stock",
    category: "Produce",
  },
];

export default function Market() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Vegetables", "Fruits", "Poultry", "Produce"];

  const filteredProducts = marketProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Farm Market
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search products or farmers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap text-sm sm:text-base transition-colors ${
                selectedCategory === category
                  ? "bg-teal-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 dark:border-gray-700"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <button className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock === "In Stock"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
                  {product.farmer}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 line-clamp-1">
                  📍 {product.location}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400">
                      ₦{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      /{product.unit}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              No products found
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
