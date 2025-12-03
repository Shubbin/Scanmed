import { useState } from "react";
import { MessageCircle, Search, Clock, ChevronRight, Filter, Download, Scan, Pill, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabType = "chat" | "scans" | "medbuddy";

interface ChatHistory {
  id: string;
  title: string;
  preview: string;
  date: string;
  messageCount: number;
}

interface ScanHistory {
  id: string;
  type: string;
  score: number;
  date: string;
  status: "good" | "moderate" | "critical";
}

interface MedBuddyHistory {
  id: string;
  medication: string;
  action: string;
  date: string;
  time: string;
}

const mockChats: ChatHistory[] = [
  { id: "1", title: "Eye Scan Results Discussion", preview: "I noticed some redness in my recent eye scan...", date: "Today, 2:30 PM", messageCount: 8 },
  { id: "2", title: "Teeth Health Questions", preview: "What should I do about the plaque buildup...", date: "Yesterday, 10:15 AM", messageCount: 12 },
  { id: "3", title: "Skin Irritation Concerns", preview: "I've been experiencing some dryness on my face...", date: "Nov 26, 2024", messageCount: 5 },
  { id: "4", title: "General Health Check", preview: "Can you summarize my overall health status...", date: "Nov 25, 2024", messageCount: 15 },
];

const mockScans: ScanHistory[] = [
  { id: "1", type: "Eye Scan", score: 75, date: "Today", status: "good" },
  { id: "2", type: "Teeth Scan", score: 45, date: "Yesterday", status: "moderate" },
  { id: "3", type: "Skin Scan", score: 82, date: "Nov 26, 2024", status: "good" },
  { id: "4", type: "Eye Scan", score: 30, date: "Nov 25, 2024", status: "critical" },
];

const mockMedBuddy: MedBuddyHistory[] = [
  { id: "1", medication: "Vitamin D", action: "Taken", date: "Today", time: "8:00 AM" },
  { id: "2", medication: "Omega-3", action: "Missed", date: "Today", time: "2:00 PM" },
  { id: "3", medication: "Vitamin D", action: "Taken", date: "Yesterday", time: "8:00 AM" },
  { id: "4", medication: "Omega-3", action: "Taken", date: "Yesterday", time: "2:00 PM" },
];

const History = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("chat");

  const tabs = [
    { id: "chat" as const, label: "Chat", icon: MessageCircle },
    { id: "scans" as const, label: "Scans", icon: Scan },
    { id: "medbuddy" as const, label: "MedBuddy", icon: Pill },
  ];

  const getStatusColor = (status: string) => {
    if (status === "good") return "text-success bg-success/10";
    if (status === "moderate") return "text-warning bg-warning/10";
    return "text-destructive bg-destructive/10";
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">History</h1>
            <p className="text-muted-foreground mt-1">View your past activities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          {activeTab === "chat" && mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate("/chat")}
              className="w-full medical-card-hover text-left flex items-center gap-4 p-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
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
                  <span className="text-xs text-muted-foreground">{chat.messageCount} messages</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>
          ))}

          {activeTab === "scans" && mockScans.map((scan) => (
            <div
              key={scan.id}
              className="medical-card flex items-center gap-4 p-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Scan className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{scan.type}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {scan.date}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">{scan.score}%</span>
                <span className={cn("block text-xs px-2 py-0.5 rounded-full capitalize", getStatusColor(scan.status))}>
                  {scan.status}
                </span>
              </div>
            </div>
          ))}

          {activeTab === "medbuddy" && mockMedBuddy.map((med) => (
            <div
              key={med.id}
              className="medical-card flex items-center gap-4 p-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{med.medication}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">{med.date} at {med.time}</span>
                </div>
              </div>
              <span className={cn(
                "text-xs px-3 py-1 rounded-full font-medium",
                med.action === "Taken" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}>
                {med.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default History;
