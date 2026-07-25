"use client";
import Link from "next/link";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, ArrowRight, CheckCircle2 } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import { footerLinks } from "@/lib/data/nav";
import { siteConfig, fullAddress } from "@/lib/site";

const socialLinks = [
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook", hover: "hover:bg-[#1877F2]" },
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram", hover: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]" },
  { icon: YoutubeIcon, href: siteConfig.social.youtube, label: "YouTube", hover: "hover:bg-[#FF0000]" },
  { icon: TwitterIcon, href: siteConfig.social.twitter, label: "Twitter / X", hover: "hover:bg-black" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="bg-navy-dark text-white">
      <Container className="pt-14 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 pb-10 border-b border-white/10">
          <div className="lg:col-span-4">
            <Logo variant="dark" showTagline={false} />
            <p className="text-white/55 text-sm leading-relaxed mt-4 max-w-sm">{siteConfig.description}</p>

            <div className="flex items-center gap-2.5 mt-5">
              {socialLinks.map(({ icon: Icon, href, label, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-full bg-white/10 transition-colors duration-300 ${hover}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            <form onSubmit={handleSubscribe} className="mt-6 max-w-sm">
              {subscribed ? (
                <p className="text-sky text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Thanks for subscribing!
                </p>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Subscribe for travel deals"
                    className="flex-1 min-w-0 bg-white/10 border border-white/15 rounded-full px-4 py-2.5 text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-sky hover:bg-blue transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-base mb-4">Packages</h4>
            <ul className="space-y-2.5">
              {footerLinks.packages.slice(0, 6).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/55 hover:text-sky transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-base mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/55 hover:text-sky transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-base mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/55 hover:text-sky transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-base mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-sky shrink-0" />
                <span>{fullAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky shrink-0" />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-sky transition-colors">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-sky transition-colors break-all">{siteConfig.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
  <div className="flex flex-col md:grid md:grid-cols-3 items-center gap-4">

    {/* Left */}
    <p className="text-white/45 text-xs text-center md:text-left">
      © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
    </p>

    {/* Center */}
    <div className="text-center order-first md:order-none">
      <span className="text-sm md:text-base text-white/60">
        Created by{" "}
        <a
          href="https://deenxconsultancy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-sky hover:text-white transition-colors"
        >
          Deenx Consultancy
        </a>
      </span>
    </div>

    {/* Right */}
    <div className="flex items-center justify-center md:justify-end gap-5 flex-wrap">
      <Link
        href="/sitemap-page"
        className="text-white/45 text-xs hover:text-white transition-colors"
      >
        Sitemap
      </Link>

      <Link
        href="/contact"
        className="inline-flex items-center gap-1 text-xs font-semibold text-sky hover:text-white transition-colors group"
      >
        Start Planning
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>

  </div>
</div>

        
      </Container>
    </footer>
  );
}
