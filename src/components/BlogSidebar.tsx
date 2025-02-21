
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Category {
  name: string;
  posts: { title: string; id: string }[];
}

const categories: Category[] = [
  {
    name: "Industry Trends",
    posts: [
      { title: "The Future of Industrial Automation: 2024 Trends", id: "post-1" },
      { title: "Emerging Technologies in Manufacturing", id: "post-2" }
    ]
  },
  {
    name: "Technology",
    posts: [
      { title: "How RPA is Transforming Manufacturing", id: "post-3" },
      { title: "AI in Modern Manufacturing", id: "post-4" }
    ]
  },
  {
    name: "Case Studies",
    posts: [
      { title: "Success Story: Smart Factory Implementation", id: "post-5" },
      { title: "Digital Transformation Journey", id: "post-6" }
    ]
  }
];

export const BlogSidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Industry Trends"]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-64 min-h-screen bg-card rounded-lg p-4 sticky top-24">
      <h2 className="text-xl font-bold mb-4 text-white">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className="flex items-center justify-between w-full p-2 text-white hover:bg-muted rounded-md transition-colors"
            >
              <span>{category.name}</span>
              {expandedCategories.includes(category.name) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {expandedCategories.includes(category.name) && (
              <div className="pl-4 space-y-2">
                {category.posts.map((post) => (
                  <a
                    key={post.id}
                    href={`#${post.id}`}
                    className="block p-2 text-sm text-white hover:text-primary transition-colors"
                  >
                    {post.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
