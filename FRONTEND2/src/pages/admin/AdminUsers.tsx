import { AdminLayout } from "@/components/layout/AdminLayout";
import { UsersTable } from "@/components/admin/UsersTable";

const mockUsers = [
  {
    id: "1",
    name: "Mohamed Omar",
    email: "mohamed@example.com",
    username: "@mohamedomar",
    dateJoined: "Nov 15, 2024",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    username: "@sarahj",
    dateJoined: "Nov 12, 2024",
    status: "active" as const,
  },
  {
    id: "3",
    name: "James Wilson",
    email: "james@example.com",
    username: "@jamesw",
    dateJoined: "Nov 10, 2024",
    status: "banned" as const,
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily@example.com",
    username: "@emilyc",
    dateJoined: "Nov 8, 2024",
    status: "active" as const,
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    username: "@michaelb",
    dateJoined: "Nov 5, 2024",
    status: "active" as const,
  },
];

const AdminUsers = () => {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor user accounts
          </p>
        </div>

        <UsersTable users={mockUsers} />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
