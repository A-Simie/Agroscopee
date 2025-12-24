import {
  Users,
  Search,
  MoreVertical,
  ThumbsUp,
  MessageCircle,
  Share2,
  Plus,
} from "lucide-react";

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

const communityPosts: Post[] = [
  {
    id: "1",
    author: "Jacob Jones",
    avatar: "https://i.pravatar.cc/150?img=12",
    time: "1 hour",
    content:
      "How to deal with pests and diseases on certain plants and how to carry out routine maintenance on tractors or other agricultural equipment?",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
    likes: 480,
    comments: 128,
    shares: 64,
  },
  {
    id: "2",
    author: "Jenny Wilson",
    avatar: "https://i.pravatar.cc/150?img=45",
    time: "3 hours",
    content:
      "How to determine the right price for agricultural products and what is the best strategy to reach local markets or online markets today?",
    likes: 320,
    comments: 114,
    shares: 86,
  },
  {
    id: "3",
    author: "Robert Fox",
    avatar: "https://i.pravatar.cc/150?img=33",
    time: "5 hours",
    content:
      "Looking for advice on organic fertilizers. What are your experiences with composting and natural pest control methods?",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=500&fit=crop",
    likes: 245,
    comments: 89,
    shares: 42,
  },
  {
    id: "4",
    author: "Sarah Mitchell",
    avatar: "https://i.pravatar.cc/150?img=20",
    time: "8 hours",
    content:
      "Best irrigation systems for small farms? I am considering drip irrigation but would love to hear your recommendations.",
    likes: 198,
    comments: 67,
    shares: 31,
  },
  {
    id: "5",
    author: "Chris Evans",
    avatar: "https://i.pravatar.cc/150?img=68",
    time: "11 hours",
    content:
      "I planted a new variety of sweet potato this season — curious if anyone else has tried 'Beauregard' in West Africa soil conditions.",
    image:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&h=500&fit=crop",
    likes: 156,
    comments: 42,
    shares: 17,
  },
  {
    id: "6",
    author: "Emily Clark",
    avatar: "https://i.pravatar.cc/150?img=52",
    time: "14 hours",
    content:
      "What are effective ways to engage youth in community farming activities here in Nigeria? Any success stories?",
    likes: 134,
    comments: 29,
    shares: 12,
  },
  {
    id: "7",
    author: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?img=15",
    time: "17 hours",
    content:
      "Does anyone have experience with solar-powered irrigation pumps on small plots? Thinking of installing one for our cooperative.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
    likes: 120,
    comments: 26,
    shares: 15,
  },
  {
    id: "8",
    author: "Linda Green",
    avatar: "https://i.pravatar.cc/150?img=30",
    time: "1 day",
    content:
      "What packaging methods work best for fresh produce when delivering to urban markets in Lagos? My team is exploring biodegradable options.",
    likes: 98,
    comments: 15,
    shares: 7,
  },
  {
    id: "9",
    author: "David Wilson",
    avatar: "https://i.pravatar.cc/150?img=8",
    time: "1 day",
    content:
      "We are forming a community farming group in Oyo State — any advice on cooperative registration or structuring?",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
    likes: 87,
    comments: 12,
    shares: 5,
  },
  {
    id: "10",
    author: "Patricia Sanders",
    avatar: "https://i.pravatar.cc/150?img=22",
    time: "2 days",
    content:
      "What are the major constraints for women farmers in your region? I'd like to compile stories for our association newsletter.",
    likes: 75,
    comments: 20,
    shares: 11,
  },
  {
    id: "11",
    author: "Kevin Lee",
    avatar: "https://i.pravatar.cc/150?img=44",
    time: "2 days",
    content:
      "Has anyone tried aquaponics or fish-farming combined with vegetable growing? I'd appreciate tips on setup and maintenance.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
    likes: 63,
    comments: 17,
    shares: 8,
  },
  {
    id: "12",
    author: "Samantha Rogers",
    avatar: "https://i.pravatar.cc/150?img=27",
    time: "3 days",
    content:
      "How do you manage labour scheduling and seasonal hiring for small‐scale farms? Any software recommendations?",
    likes: 52,
    comments: 9,
    shares: 3,
  },
  {
    id: "13",
    author: "Paul Martinez",
    avatar: "https://i.pravatar.cc/150?img=65",
    time: "3 days",
    content:
      "We are seeing increasing interest from schools for farm-to-table trips — how can we integrate educational tours into our farming business?",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=500&fit=crop",
    likes: 46,
    comments: 8,
    shares: 2,
  },
  {
    id: "14",
    author: "Rachel Adams",
    avatar: "https://i.pravatar.cc/150?img=19",
    time: "4 days",
    content:
      "What's the best community outreach method to engage local markets in Ibadan? I'm thinking of pop‐up stalls and social media campaigns.",
    likes: 39,
    comments: 6,
    shares: 1,
  },
  {
    id: "15",
    author: "John Carter",
    avatar: "https://i.pravatar.cc/150?img=50",
    time: "5 days",
    content:
      "I'd like to start a beeswax and honey side-business on my farm. Any advice on certifications or local market demand?",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
    likes: 31,
    comments: 4,
    shares: 0,
  },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Community
          </h1>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search in community"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white text-sm sm:text-base transition-colors">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Community</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4 pb-24">
        {communityPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-md dark:hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <div className="p-4 flex items-start justify-between">
              <div className="flex gap-3 flex-1 min-w-0">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                    {post.author}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {post.time}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 pb-3">
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {post.content}
              </p>
            </div>

            {post.image && (
              <img
                src={post.image}
                alt=""
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
            )}

            <div className="px-4 py-3 flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1">
                <span>👍</span>
                <span className="font-medium">{post.likes}</span>
              </div>
              <span>{post.comments} Comments</span>
              <span>{post.shares} Shares</span>
            </div>

            <div className="px-2 sm:px-4 py-3 flex items-center justify-around border-t border-gray-100 dark:border-gray-700">
              <button className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Like</span>
              </button>
              <button className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Comment</span>
              </button>
              <button className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        ))}

        <button className="fixed bottom-6 right-4 sm:right-6 bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white px-4 sm:px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm sm:text-base font-medium transition-colors z-40">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Question</span>
          <span className="sm:hidden">Ask</span>
        </button>
      </div>
    </div>
  );
}
