import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Bell, Palette, Shield, Database, AlertTriangle } from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    medicationReminders: true,
    healthTips: true,
    scanReminders: false,
  });

  const [privacy, setPrivacy] = useState({
    shareAnonymousData: false,
    analytics: true,
    crashReports: true,
  });

  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("english");

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleClearCache = () => {
    toast.success("Cache cleared successfully!");
  };

  const handleExportData = () => {
    toast.success("Your data export has started. You'll receive it via email.");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion requires confirmation via email.");
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-8 pb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Notifications */}
        <div className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">Configure how you receive notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notif" className="font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notif"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notif" className="font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
              </div>
              <Switch
                id="push-notif"
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="med-reminders" className="font-medium">Medication Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded to take your medications</p>
              </div>
              <Switch
                id="med-reminders"
                checked={notifications.medicationReminders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, medicationReminders: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="health-tips" className="font-medium">Health Tips</Label>
                <p className="text-sm text-muted-foreground">Receive daily health tips and advice</p>
              </div>
              <Switch
                id="health-tips"
                checked={notifications.healthTips}
                onCheckedChange={(checked) => setNotifications({ ...notifications, healthTips: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="scan-reminders" className="font-medium">Scan Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders for regular health scans</p>
              </div>
              <Switch
                id="scan-reminders"
                checked={notifications.scanReminders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, scanReminders: checked })}
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Palette className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
              <p className="text-sm text-muted-foreground">Customize how the app looks</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme" className="font-medium">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="language" className="font-medium">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
              <p className="text-sm text-muted-foreground">Manage your privacy and security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="anonymous-data" className="font-medium">Share Anonymous Data</Label>
                <p className="text-sm text-muted-foreground">Help improve our services with anonymous usage data</p>
              </div>
              <Switch
                id="anonymous-data"
                checked={privacy.shareAnonymousData}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, shareAnonymousData: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics" className="font-medium">Analytics</Label>
                <p className="text-sm text-muted-foreground">Allow us to collect analytics data</p>
              </div>
              <Switch
                id="analytics"
                checked={privacy.analytics}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, analytics: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="crash-reports" className="font-medium">Crash Reports</Label>
                <p className="text-sm text-muted-foreground">Send crash reports to help us fix bugs</p>
              </div>
              <Switch
                id="crash-reports"
                checked={privacy.crashReports}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, crashReports: checked })}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <Label className="font-medium">Account Security</Label>
                <p className="text-sm text-muted-foreground">Update your password</p>
              </div>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Data Management</h2>
              <p className="text-sm text-muted-foreground">Manage your data and storage</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Export Data</Label>
                <p className="text-sm text-muted-foreground">Download all your health data</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleExportData}>Download Data</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Clear Cache</Label>
                <p className="text-sm text-muted-foreground">Clear cached data to free up space</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleClearCache}>Clear Cache</Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="medical-card border-destructive/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Danger Zone</h2>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium text-destructive">Delete Account</Label>
              <p className="text-sm text-muted-foreground">This action cannot be undone</p>
            </div>
            <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>Delete Account</Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
