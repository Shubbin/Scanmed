import { Search, MoreHorizontal, Eye, Ban, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  dateJoined: string;
  status: "active" | "banned";
}

interface UsersTableProps {
  users: User[];
  onView?: (id: string) => void;
  onBan?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export function UsersTable({ users, onView, onBan, onDelete, className }: UsersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Table */}
      <div className="medical-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Name</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Email</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Username</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Date Joined</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-medical flex items-center justify-center text-primary-foreground text-xs font-medium">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.username}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.dateJoined}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        user.status === "active"
                          ? "bg-medical-green-light text-success"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView?.(user.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onBan?.(user.id)}>
                          <Ban className="w-4 h-4 mr-2" />
                          {user.status === "active" ? "Ban" : "Unban"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete?.(user.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
