import Logo from "../images/logo.png";
import {
  Search,
  Bell,
  User,
  Lock,
  CreditCard,
  Globe,
  Smartphone,
  Eye,
  EyeOff,
  Camera,
  Save,
  Check,
  Download,
} from "lucide-react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

const Settings = () => {
  const activeTab = "profile";
  const showPassword = false;
  const notifications = {
    transactions: true,
    budgetAlerts: true,
    savingsGoals: true,
    monthlyReports: false,
    marketing: false,
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] top-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute left-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        <div>
          <Header />
        </div>
        <div className="flex">
          <div className="pr-60">
            <Sidebar currentPage="settings" />
          </div>

          <main className="flex-1 p-8 max-w-[1400px] mt-20">
            <div className="mb-8">
              <h1 className="text-[42px] font-bold mb-3">Settings</h1>
              <p className="text-[16px] text-gray-400">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-medium transition-all flex-1 justify-center ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-600/30"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h2 className="text-[20px] font-semibold mb-6">
                      Profile Picture
                    </h2>

                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center text-[32px] font-bold">
                          AG
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-600/50 hover:bg-purple-700 transition-all">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <div className="text-[16px] font-medium mb-2">
                          Adryan Glzzs
                        </div>
                        <div className="text-[14px] text-gray-400 mb-4">
                          Pro Plan Member
                        </div>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[14px] hover:bg-white/10 transition-all">
                            Change Photo
                          </button>
                          <button className="px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg text-[14px] transition-all">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h2 className="text-[20px] font-semibold mb-6">
                      Personal Information
                    </h2>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Adryan Gomes"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="adryan.gomes@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          defaultValue="1995-03-15"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Address
                        </label>
                        <input
                          type="text"
                          defaultValue="123 Main Street, San Francisco, CA 94102"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h2 className="text-[20px] font-semibold mb-6">
                      Change Password
                    </h2>

                    <div className="space-y-5 max-w-xl">
                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all"
                          />
                          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all"
                        />
                      </div>

                      <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-[20px] font-semibold mb-2">
                          Two-Factor Authentication
                        </h2>
                        <p className="text-[14px] text-gray-400 mb-6">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-400/10 text-green-400 rounded-lg text-[13px]">
                        <Check className="w-4 h-4" />
                        Enabled
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                        <Smartphone className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[15px] font-medium mb-1">
                          Authenticator App
                        </div>
                        <div className="text-[13px] text-gray-400">
                          Use an authenticator app for 2FA codes
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-red-400/10 text-red-400 rounded-lg text-[14px] hover:bg-red-400/20 transition-all">
                        Disable
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h2 className="text-[20px] font-semibold mb-6">
                      Active Sessions
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                            <Globe className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-[15px] font-medium mb-1">
                              Chrome on MacBook Pro
                            </div>
                            <div className="text-[13px] text-gray-400">
                              San Francisco, CA • Active now
                            </div>
                          </div>
                        </div>
                        <span className="px-3 py-1.5 bg-green-400/10 text-green-400 rounded-lg text-[12px]">
                          Current
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                            <Smartphone className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div>
                            <div className="text-[15px] font-medium mb-1">
                              iPhone 15 Pro
                            </div>
                            <div className="text-[13px] text-gray-400">
                              San Francisco, CA • 2 hours ago
                            </div>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[14px] hover:bg-white/10 transition-all">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <h2 className="text-[20px] font-semibold mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-5">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                      >
                        <div>
                          <div className="text-[15px] font-medium mb-1 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="text-[13px] text-gray-400">
                            {key === "transactions" &&
                              "Get notified for every transaction"}
                            {key === "budgetAlerts" &&
                              "Alerts when approaching budget limits"}
                            {key === "savingsGoals" &&
                              "Updates on your savings progress"}
                            {key === "monthlyReports" &&
                              "Monthly financial summary reports"}
                            {key === "marketing" && "News and product updates"}
                          </div>
                        </div>

                        <button
                          className={`relative w-14 h-7 rounded-full transition-all ${
                            value
                              ? "bg-gradient-to-r from-purple-600 to-purple-500"
                              : "bg-white/10"
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg transition-transform ${
                              value ? "translate-x-7" : ""
                            }`}
                          ></div>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl text-[14px] font-semibold hover:shadow-lg hover:shadow-purple-600/50 transition-all">
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h2 className="text-[20px] font-semibold mb-6">
                      General Preferences
                    </h2>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Currency
                        </label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                          <option>USD - US Dollar</option>
                          <option>EUR - Euro</option>
                          <option>GBP - British Pound</option>
                          <option>BRL - Brazilian Real</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Language
                        </label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                          <option>English</option>
                          <option>Português</option>
                          <option>Español</option>
                          <option>Français</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Timezone
                        </label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                          <option>PST - Pacific Standard Time</option>
                          <option>EST - Eastern Standard Time</option>
                          <option>GMT - Greenwich Mean Time</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[13px] text-gray-400 mb-2 block">
                          Date Format
                        </label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:border-purple-500/50 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                {/* Current Plan */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-2xl blur-xl opacity-60"></div>
                  <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/10 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-[20px] font-semibold mb-2">
                          Pro Plan
                        </h2>
                        <p className="text-[14px] text-gray-400">
                          Advanced features for power users
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-[36px] font-bold mb-1">$15</div>
                        <div className="text-[13px] text-gray-400">
                          per month
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-[14px] font-medium hover:bg-white/20 transition-all">
                        Change Plan
                      </button>
                      <button className="px-6 py-3 text-red-400 hover:bg-red-400/10 rounded-xl text-[14px] transition-all">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-[20px] font-semibold">
                        Payment Method
                      </h2>
                      <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[14px] hover:bg-white/10 transition-all">
                        Add New Card
                      </button>
                    </div>

                    <div className="flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-7 h-7 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[15px] font-medium mb-1">
                          Visa ending in 4242
                        </div>
                        <div className="text-[13px] text-gray-400">
                          Expires 12/2026
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white/5 rounded-lg text-[13px] hover:bg-white/10 transition-all">
                          Edit
                        </button>
                        <button className="px-3 py-1.5 text-red-400 hover:bg-red-400/10 rounded-lg text-[13px] transition-all">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h2 className="text-[20px] font-semibold mb-6">
                      Billing History
                    </h2>

                    <div className="space-y-3">
                      {[
                        {
                          date: "Feb 1, 2026",
                          amount: "$15.00",
                          status: "Paid",
                        },
                        {
                          date: "Jan 1, 2026",
                          amount: "$15.00",
                          status: "Paid",
                        },
                        {
                          date: "Dec 1, 2025",
                          amount: "$15.00",
                          status: "Paid",
                        },
                      ].map((invoice, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                        >
                          <div>
                            <div className="text-[14px] font-medium mb-1">
                              Pro Plan - Monthly
                            </div>
                            <div className="text-[13px] text-gray-400">
                              {invoice.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[16px] font-bold">
                              {invoice.amount}
                            </span>
                            <span className="px-3 py-1.5 bg-green-400/10 text-green-400 rounded-lg text-[12px]">
                              {invoice.status}
                            </span>
                            <button className="p-2 hover:bg-white/5 rounded-lg transition-all">
                              <Download className="w-5 h-5 text-gray-400 hover:text-white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
