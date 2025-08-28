import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setSelectedChat, theme, setTheme, user, navigate } =
    useAppContext();
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`flex flex-col h-screen bg-white dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000000] border-r border-gray-200 dark:border-[#80609F]/30 backdrop-blur-3xl transition-all duration-300 ease-in-out
        md:min-w-72 md:p-5 md:relative md:translate-x-0
        max-md:fixed max-md:top-0 max-md:left-0 max-md:w-full max-md:p-4 max-md:z-50
        ${isMenuOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full'}
      `}>
        
        {/* Logo */}
        <div className="mb-6 pr-10 md:pr-0">
          <img
            className="w-full max-w-48 h-auto"
            src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
            alt="Logo"
          />
        </div>

        {/* New Chat Button */}
        <button 
          
          className="flex justify-center items-center w-full py-3 mb-6 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
        >
          <span className="mr-2 text-lg font-bold">+</span>
          New Chat
        </button>

        {/* Search Conversation */}
        <div className="flex items-center gap-3 p-3 mb-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/20 rounded-lg focus-within:border-purple-400 dark:focus-within:border-purple-500 transition-colors">
          <img
            src={assets.search_icon}
            className="w-4 h-4 opacity-60 not-dark:invert"
            alt="Search"
          />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search conversations"
            className="flex-1 text-sm bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 outline-none text-gray-900 dark:text-white"
          />
        </div>

        {/* Recent Chats */}
        <div className="flex-1 overflow-y-auto">
          {chats.length > 0 && (
            <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Recent Chats
            </p>
          )}
          <div className="space-y-2">
            {chats
              .filter((chat) =>
                chat.messages[0]
                  ? chat.messages[0].content
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  : chat.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((chat) => (
                <div
                
                  key={chat._id}
                  onClick={()=>{
                    navigate('/');
                    setSelectedChat(chat);
                    setIsMenuOpen(false)
                  }
                  }
                  className="group p-3 bg-gray-50 dark:bg-[#57317C]/10 border border-gray-200 dark:border-[#80609F]/15 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/20 transition-all duration-200 flex justify-between items-start"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {chat.messages.length > 0
                        ? chat.messages[0].content.slice(0, 32) + "..."
                        : chat.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-[#B1A6C0] mt-1">
                      {new Date(chat.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <img
                    src={assets.bin_icon}
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 cursor-pointer dark:invert transition-opacity ml-2 flex-shrink-0"
                    alt="Delete"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto space-y-3">
          {/* Community Images */}
          <div
            onClick={() => {
              navigate("/community");
              setIsMenuOpen(false)
            }}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/15 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-105 transition-all duration-200"
          >
            <img
              src={assets.gallery_icon}
              className="w-5 h-5 not-dark:invert flex-shrink-0"
              alt="Gallery"
            />
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                Community Images
              </p>
            </div>
          </div>

          {/* Credit Purchase Option */}
          <div
            onClick={() => {
              navigate('/credit');
              setIsMenuOpen(false)
            }}
            className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/15 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-105 transition-all duration-200"
          >
            <img
              src={assets.diamond_icon}
              className="w-5 h-5 dark:invert text-purple-500 flex-shrink-0"
              alt="Credits"
            />
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-white">
                Credits: {user?.credits || 0}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Purchase credits to use QuickGPT
              </p>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/15 rounded-lg">
            <div className="flex items-center gap-3 text-sm">
              <img
                src={assets.theme_icon}
                className="w-4 h-4 not-dark:invert"
                alt="Theme"
              />
              <p className="font-medium text-gray-900 dark:text-white">
                Dark Mode
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer">
              <input
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                type="checkbox"
                className="sr-only peer"
                checked={theme === "dark"}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-[#A456F7] peer-checked:to-[#3D81F6] transition-all duration-300"></div>
              <span className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></span>
            </label>
          </div>
        </div>

        {/* User Account */}
        <div className="flex items-center gap-3 p-3 mt-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-white/15 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-105 transition-all duration-200 group">
          <img
            src={assets.user_icon}
            className="w-7 rounded-full h-7 not-dark:invert flex-shrink-0"
            alt="User"
          />
          <p className="flex-1 text-sm dark:text-primary truncate">
            {user ? user.name : "Login your account"}
          </p>
          {user && (
            <img
              src={assets.logout_icon}
              className="h-5 cursor-pointer opacity-0 group-hover:opacity-100 not-dark:invert transition-opacity"
              alt="Logout"
            />
          )}
        </div>

        {/* Close button - Mobile only */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors md:hidden"
        >
          <img
            src={assets.close_icon}
            className="w-5 h-5 not-dark:invert"
            alt="Close"
          />
        </button>
      </div>
    </>
  );
};

export default Sidebar;