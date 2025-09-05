import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { VectorLogo } from "@/components/Logos/VectorLogo";

interface NavPillProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "primary";
}

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  // Pixel threshold after which the navbar switches to the scrolled state
  showAt?: number;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}

export const Navbar = ({ children, className, showAt = 20 }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // Track the global page scroll rather than the navbar element itself
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  // Ensure correct initial state on mount
  useEffect(() => {
    setVisible(scrollY.get() > showAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAt]);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setVisible(latest > showAt);
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-0 z-[90] w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[95] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-6 py-3 lg:flex lg:mt-6 xl:mt-8",
        visible && "backdrop-blur-md border border-border/50 shadow-lg",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavPill = ({ children, isActive = false, className, onClick, variant = "default" }: NavPillProps) => {
  // Primary variant for Sign In button - uses velvet-500 color
  if (isActive && variant === "primary") {
    return (
      <button 
        className={cn("bg-velvet-500 text-white py-1.5 px-6 relative text-center h-9 rounded-full hover:bg-velvet-600 transition-colors whitespace-nowrap", className)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (isActive) {
    // Active state - uses same approach as primary variant with velvet-500 color
    return (
      <button 
        className={cn("bg-velvet-500 text-white py-1.5 px-6 relative text-center h-9 rounded-full hover:bg-velvet-600 transition-colors whitespace-nowrap", className)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  // Inactive state - simple button without hover effects
  return (
    <button 
      className={cn("py-1.5 px-6 relative text-center h-9 rounded-full text-foreground/70", className)}
      onClick={onClick}
    >
      {children}
      <span className="absolute inset-0 rounded-full">
        <span className="flex h-full w-full items-center justify-center rounded-full relative z-10">
          {children}
        </span>
      </span>
    </button>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const pathname = usePathname();

  const isActive = (link: string) => {
    return pathname === link;
  };

  return (
    <motion.div
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-foreground/80 transition duration-200 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => {
        const active = isActive(item.link);
        return (
          <Link
            onClick={onItemClick}
            className="relative items-center cursor-pointer justify-center flex"
            key={`link-${idx}`}
            href={item.link}
          >
            <NavPill isActive={active}>
              {item.name}
            </NavPill>
          </Link>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "12px" : "32px",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-[150] mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "backdrop-blur-md border border-border/50 shadow-lg",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute inset-x-0 top-16 z-[200] flex w-full flex-col items-start justify-start gap-4 rounded-xl backdrop-blur-md border border-border/50 px-6 py-8 shadow-lg",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="h-6 w-6 text-foreground cursor-pointer hover:text-primary transition-colors" onClick={onClick} />
  ) : (
    <IconMenu2 className="h-6 w-6 text-foreground cursor-pointer hover:text-primary transition-colors" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-5 flex items-center space-x-3 px-3 py-2 text-base font-normal"
    >
      <VectorLogo
        width={140}
        height={25}
        className="text-foreground"
      />
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-lg text-sm font-medium relative cursor-pointer hover:-translate-y-0.5 transition-all duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary: "bg-transparent text-foreground hover:bg-muted border border-border",
    dark: "bg-foreground text-background hover:bg-foreground/90 shadow-sm",
    gradient:
      "bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-sm",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
