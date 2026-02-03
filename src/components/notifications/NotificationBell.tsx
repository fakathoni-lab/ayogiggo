import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger } from
"@/components/ui/popover";
import { NotificationList } from "./NotificationList";
import { useState } from "react";

export const NotificationBell = () => {
  const { unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-accent/10 transition-all duration-300"
          aria-label="Notifications">

          <Bell className="h-5 w-5" />

          {/* Pulsing Red Dot for Unread Notifications */}
          <AnimatePresence>
            {unreadCount > 0 &&
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-1 -right-1 flex items-center justify-center">

                {/* Pulsing Background */}
                <motion.div
                className="absolute w-5 h-5 bg-red-500 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 0.3, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} />


                {/* Badge with Count */}
                <motion.div
                className="relative w-5 h-5 bg-red-600 rounded-full border-2 border-background flex items-center justify-center shadow-lg shadow-red-500/50"
                whileHover={{ scale: 1.1 }}>

                  <span className="text-[10px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                </motion.div>
              </motion.div>
            }
          </AnimatePresence>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-96 p-0 border-primary/20 bg-background/95 backdrop-blur-xl"
        align="end"
        sideOffset={8}>

        <NotificationList onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>);

};