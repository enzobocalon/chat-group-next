'use client'

import { ChevronDownIcon } from "@radix-ui/react-icons";
import UserCard from "../UserCard";
import CurrentChatSidebar from "./components/CurrentChatSidebar";
import TopMenu from "./components/TopMenu";
import DefaultSidebar from "./components/DefaultSidebar";
import { useCallback, useState } from "react";

export default function Sidebar() {
  const [isChatActive, setIsChatActive] = useState(true);

  const handleSidebarStatus = useCallback(() => {
    if (!isChatActive) return;
    setIsChatActive(prev => !prev);
  }, [isChatActive])


  return (
    <aside className="flex flex-col max-w-sm w-full bg-app-background">
      <TopMenu hasChat={isChatActive} onToggle={handleSidebarStatus}/>
        <div className="p-8 text-white flex flex-col flex-1">
          {/* <CurrentChatSidebar /> */}
          <DefaultSidebar />
        </div>

        <div className="bg-app-foreground flex items-center justify-center p-4">
          <UserCard />
          <ChevronDownIcon 
          className="w-6 h-6 text-white cursor-pointer"/>
        </div>
    </aside>
  )
}