import { MainLayout } from "@/components/layout/MainLayout";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  category: "eye" | "teeth" | "skin" | "general";
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Tips for Maintaining Healthy Eyes",
    description: "Learn how to protect your vision with these simple daily habits and lifestyle changes.",
    category: "eye",
    image: "https://images.unsplash.com/photo-1559076294-ad5f5d02a71c?w=400&h=250&fit=crop",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "The Complete Guide to Oral Hygiene",
    description: "Everything you need to know about keeping your teeth and gums healthy for life.",
    category: "teeth",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=250&fit=crop",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "Understanding Your Skin Type",
    description: "Discover your skin type and learn how to care for it properly with our expert guide.",
    category: "skin",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=250&fit=crop",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Building a Strong Immune System",
    description: "Boost your immunity naturally with these evidence-based strategies and nutrition tips.",
    category: "general",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=250&fit=crop",
    readTime: "8 min read",
  },
  {
    id: "5",
    title: "Digital Eye Strain: Prevention Tips",
    description: "Protect your eyes from screen fatigue with these expert-recommended practices.",
    category: "eye",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400&h=250&fit=crop",
    readTime: "4 min read",
  },
  {
    id: "6",
    title: "Foods That Strengthen Your Teeth",
    description: "Discover which foods can help maintain strong teeth and prevent cavities naturally.",
    category: "teeth",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=250&fit=crop",
    readTime: "5 min read",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "eye", label: "Eye" },
  { id: "teeth", label: "Teeth" },
  { id: "skin", label: "Skin" },
  { id: "general", label: "General Health" },
];

const getCategoryColor = (category: BlogPost["category"]) => {
  switch (category) {
    case "eye":
      return "bg-primary/10 text-primary";
    case "teeth":
      return "bg-success/10 text-success";
    case "skin":
      return "bg-warning/10 text-warning";
    case "general":
      return "bg-accent text-accent-foreground";
  }
};

const HealthBlog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Health Blog</h1>
          <p className="text-muted-foreground mt-1">
            Expert articles and tips for your wellbeing
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="medical-card-hover overflow-hidden group cursor-pointer"
            >
              <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className={cn(
                    "absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-medium capitalize",
                    getCategoryColor(post.category)
                  )}
                >
                  {post.category === "general" ? "General Health" : post.category}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
                <span className="text-sm font-medium text-primary group-hover:underline">
                  Read More →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default HealthBlog;
