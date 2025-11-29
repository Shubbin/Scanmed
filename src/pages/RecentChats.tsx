import { useState } from "react";
import { MessageCircle, Search, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

interface ChatHistory {
  id: string;
  title: string;
  preview: string;
  date: string;
  messageCount: number;
}

const mockChats: ChatHistory[] = [
  {
    id: "1",
    title: "Eye Scan Results Discussion",
    preview: "I noticed some redness in my recent eye scan...",
    date: "Today, 2:30 PM",
    messageCount: 8,
  },
  {
    id: "2",
    title: "Teeth Health Questions",
    preview: "What should I do about the plaque buildup...",
    date: "Yesterday, 10:15 AM",
    messageCount: 12,
  },
  {
    id: "3",
    title: "Skin Irritation Concerns",
    preview: "I've been experiencing some dryness on my face...",
    date: "Nov 26, 2024",
    messageCount: 5,
  },
  {
    id: "4",
    title: "General Health Check",
    preview: "Can you summarize my overall health status...",
    date: "Nov 25, 2024",
    messageCount: 15,
  },
];

const RecentChats = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recent Chats</h1>
          <p className="text-muted-foreground mt-1">
            Continue your previous conversations
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Chat List */}
        <div className="space-y-3">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate("/chat")}
              className="w-full medical-card-hover text-left flex items-center gap-4 p-4"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{chat.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{chat.preview}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {chat.date}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {chat.messageCount} messages
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>

        {filteredChats.length === 0 && (
          <div className="medical-card text-center py-12">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">No chats found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? "Try a different search term"
                : "Start a new conversation with your AI health assistant"}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default RecentChats;
