"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Sun, Moon } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { mainNav, packageMenu, servicesMenu } from "@/lib/data/nav";
import { siteConfig } from "@/lib/site";
import clsx from "clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const [mobileSubOpen, setMobileSubOpen] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const megaContent = { packages: packageMenu, services: servicesMenu };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-1.5 bg-navy luxury-shadow" : "py-4 bg-transparent"
      )}
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <Logo variant="dark" showTagline={!scrolled} size={scrolled ? 36 : 42} />

          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setMegaOpen(null)}>
            {mainNav.map((item) => (
              <div key={item.href} className="relative" onMouseEnter={() => setMegaOpen(item.mega || null)}>
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-full text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
                >
                  {item.label}
                  {item.mega && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                </Link>

                <AnimatePresence>
                  {item.mega && megaOpen === item.mega && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] bg-white rounded-2xl luxury-shadow-lg p-3 grid grid-cols-1 gap-1"
                    >
                      {megaContent[item.mega].map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex flex-col px-4 py-2.5 rounded-xl hover:bg-offwhite transition-colors"
                        >
                          <span className="text-sm font-semibold text-navy">{sub.label}</span>
                          {sub.desc && <span className="text-xs text-navy/50">{sub.desc}</span>}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <span className="w-px h-8 bg-white/15" />
            <a href={`tel:${siteConfig.phoneRaw}`} className="flex items-center gap-2.5 whitespace-nowrap group">
              <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-sky/40 text-sky group-hover:bg-sky group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-white font-bold text-sm">{siteConfig.phone}</span>
                <span className="block text-white/50 text-[11px]">24x7 Support</span>
              </span>
            </a>
          </div>

          <button
            className="lg:hidden w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-white bg-white/10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-dark/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-navy/10">
                <Logo />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="w-9 h-9 flex items-center justify-center rounded-full bg-navy/5 text-navy">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 flex flex-col gap-1">
                {mainNav.map((item) => (
                  <div key={item.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 py-3 text-navy font-semibold"
                      >
                        {item.label}
                      </Link>
                      {item.mega && (
                        <button
                          onClick={() => setMobileSubOpen(mobileSubOpen === item.mega ? null : item.mega)}
                          className="p-3 text-navy/60"
                          aria-label="Toggle submenu"
                        >
                          <ChevronDown className={clsx("w-4 h-4 transition-transform", mobileSubOpen === item.mega && "rotate-180")} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {item.mega && mobileSubOpen === item.mega && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-3 border-l-2 border-sky/30 ml-1 mb-2"
                        >
                          {megaContent[item.mega].map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-sm text-navy/70"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <a href={`tel:${siteConfig.phoneRaw}`} className="flex items-center gap-2 mt-4 text-sm font-semibold text-navy">
                  <Phone className="w-4 h-4 text-blue" /> {siteConfig.phone}
                </a>
                <Button href="/contact" className="mt-4 w-full">Plan Your Trip</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
