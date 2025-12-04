import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Save, RefreshCw, Shield, Cpu, Users } from "lucide-react";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure system settings and manage the platform
          </p>
        </div>

        {/* System Configuration */}
        <div className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">System Configuration</h2>
              <p className="text-sm text-muted-foreground">General platform settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium text-foreground">Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">Disable user access during updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium text-foreground">New User Registration</p>
                <p className="text-sm text-muted-foreground">Allow new users to sign up</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Send system notifications to admins</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Scan Engine */}
        <div className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Scan Engine</h2>
              <p className="text-sm text-muted-foreground">Manage AI scan engine versions</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">Current Version</span>
                <span className="text-sm px-2 py-1 bg-medical-green-light text-success rounded-full">
                  v2.4.1 (Stable)
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Last updated: November 25, 2024
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">Available Update</span>
                <span className="text-sm px-2 py-1 bg-accent text-accent-foreground rounded-full">
                  v2.5.0 (Beta)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Includes improved eye scan accuracy and faster processing
              </p>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Update to Beta
              </Button>
            </div>
          </div>
        </div>

        {/* Admin Accounts */}
        <div className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Admin Account Management</h2>
              <p className="text-sm text-muted-foreground">Manage administrator access</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  AD
                </div>
                <div>
                  <p className="font-medium text-foreground">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@scanmed.com</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                Super Admin
              </span>
            </div>

            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Add New Admin
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <Button className="w-full gradient-medical text-primary-foreground">
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
