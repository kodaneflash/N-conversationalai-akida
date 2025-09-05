import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavPill,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Home", link: "/" },
];

export default function NavbarWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-[100] w-full lg:pt-4 xl:pt-6">
      <Navbar className="relative z-[1]" showAt={12}>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center">
            {/* Launch App button using NavPill component */}
            <Link href="/chat">
              <div className="items-center cursor-pointer justify-center flex">
                <NavPill isActive={true} variant="primary" className="w-32">
                  Launch App
                </NavPill>
              </div>
            </Link>
          </div>
        </NavBody>
        
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen}>
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="block w-full px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4 w-full">
              {/* Launch App button using NavPill component */}
              <Link href="/chat" className="w-full">
                <div className="items-center cursor-pointer justify-center flex">
                  <NavPill isActive={true} variant="primary" className="w-32">
                    Launch App
                  </NavPill>
                </div>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}


// Minimal Back-only navbar variant for subpages
export function NavbarBack() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-[100] w-full lg:pt-4 xl:pt-6">
      <Navbar className="relative z-[1]" showAt={12}>
        <NavBody>
          <div className="flex items-center">
            <NavPill
              isActive={true}
              variant="primary"
              className="w-24"
              onClick={() => (typeof window !== 'undefined' ? window.history.back() : undefined)}
            >
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back
              </span>
            </NavPill>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center">
              <NavPill
                isActive={true}
                variant="primary"
                className="w-24"
                onClick={() => (typeof window !== 'undefined' ? window.history.back() : undefined)}
              >
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </span>
              </NavPill>
            </div>
            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen}>
            <div className="w-full">
              <NavPill
                isActive={true}
                variant="primary"
                className="w-full"
                onClick={() => (typeof window !== 'undefined' ? window.history.back() : undefined)}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </span>
              </NavPill>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}
