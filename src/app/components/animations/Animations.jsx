import { easeOut } from "framer-motion";

export const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.96, 
    y: 8,
    transition: { duration: 0.12, ease: "easeIn" }
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.2, ease: "easeOut" } 
  }
};

export const drawerVariants = {
  hidden: { 
    opacity: 0, 
    height: 0, 
    transition: { duration: 0.2, ease: "easeIn" } 
  },
  visible: { 
    opacity: 1, 
    height: "auto", 
    transition: { duration: 0.3, ease: "easeInOut" } 
  }
};

export const hoverScale = {
  hover: { scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } },
  tap: { scale: 0.98 }
};