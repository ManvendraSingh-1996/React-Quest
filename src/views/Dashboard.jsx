import React, { useState } from "react";
import {
  Users,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  Search,
  Bell,
  MessageCircle,
  LogOut,
  Menu,
  HousePlus,
  Package,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

import { navItems } from "../config/navList";
const Dashboard = () => {
  const [isSidebar, setSidebar] = useState(false);
  const { user, logout } = useAuth();
  const toggleNav = () => {
    setSidebar(!isSidebar);
  };
  const openNavStyle =
    "flex items-center px-2 py-2 justify-start rounded-lg transition-colors group relative";
  const closeNavStyle =
    "flex items-center px-2 py-2 justify-center rounded-lg transition-colors group relative";

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {isSidebar && (
        <div
          className="w-[50%] fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-black transition-all duration-300 z-50 
        h-screen fixed lg:relative top-0 left-0 overflow-hidden
        ${isSidebar ? "w-64" : "w-0 lg:w-16 hidden lg:block"}`}
      >
        <div className="px-2 py-4 h-full flex flex-col justify-between">
          {/* --- Top section --- */}
          <div>
            <div className="flex items-center mb-8">
              <button
                onClick={toggleNav}
                id="logo"
                className="w-12 h-8 bg-white rounded-lg flex items-center justify-center mr-2 hover:bg-gray-100 transition-colors"
              ></button>
              {isSidebar && (
                <h1 className="text-white font-bold overflow-hidden transition-all duration-500 ml-2">
                  <span
                    className={`inline-block whitespace-nowrap transform transition-all duration-500 ease-in-out
                ${
                  isSidebar
                    ? "opacity-100 translate-x-0 max-w-xs"
                    : "opacity-0 -translate-x-4 max-w-0"
                }`}
                  >
                    Demo <span className="text-gray-300">Panel</span>
                  </span>
                </h1>
              )}
            </div>

            {/* Navigation links */}
            <nav className="space-y-2 text-sm">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`${isSidebar ? openNavStyle : closeNavStyle} ${
                    item.active
                      ? "bg-white text-black"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  title={!isSidebar ? item.label : ""}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isSidebar && (
                    <span className="ml-6 whitespace-nowrap">{item.label}</span>
                  )}
                  {!isSidebar && (
                    <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                      {item.label}
                    </div>
                  )}
                </a>
              ))}
            </nav>
          </div>

          {/* --- Logout button  --- */}
          <div>
            <button
              onClick={logout}
              className={`${
                isSidebar ? openNavStyle : closeNavStyle
              } text-gray-300 cursor-pointer w-full hover:bg-[#202020] hover:text-white`}
              title={!isSidebar ? "Logout" : ""}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isSidebar && (
                <span className="ml-6 whitespace-nowrap">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden" onClick={toggleNav}>
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Events..."
                  className="pl-10 pr-3 py-1 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 w-40 sm:w-40 md:w-56 lg:w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 text-sm">
              <button className="bg-white shadow border border-gray-300 px-2 sm:px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
                <span className="hidden sm:block">New Client</span>
                <HousePlus className="w-4 h-4" />
              </button>
              <button className="bg-gray-900 text-white px-2 sm:px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                <span className="hidden sm:block">New Work Order</span>
                <Package className="w-4 h-4" />
              </button>
              <button className="hidden lg:block p-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div
                id="profile"
                className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shrink-0"
              ></div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 overflow-x-hidden">
          {/* 👆 stops horizontal scrolling */}

          <h2 className="text-l font mb-2">
            Welcome,{" "}
            <span className="text-teal-700">{user?.email || "Guest"}</span>
          </h2>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Bottom Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
