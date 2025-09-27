import Link from "next/link";
import React from "react";
import { Facebook, GitHub, Instagram, Twitter } from "./social-icons";
import { getCategories } from "@/features/categories/actions";
import { DesktopLogo, MobileLogo } from "@/features/common/components";
import { Button } from "@/features/ui/button";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/ttalphaa" },
  { icon: Twitter, href: "https://x.com/ttalphaa" },
  { icon: Instagram, href: "https://instagram.com/ttalphaa" },
  { icon: GitHub, href: "https://github.com/ttalpha" },
];

const footerLinks = [
  {
    title: "Company",
    subLinks: [
      { href: "/about", title: "Who we are" },
      { href: "/blog", title: "Blog" },
      { href: "/workshop", title: "Workshop" },
      { href: "/careers", title: "Careers" },
    ],
  },
  {
    title: "Connect",
    subLinks: [
      { href: "/contact-us", title: "Contact us" },
      { href: "https://facebook.com/ttalphaa", title: "Facebook" },
      { href: "https://x.com/ttalphaa", title: "X" },
      { href: "https://instagram.com/ttalphaa", title: "Instagram" },
      { href: "https://github.com/ttalpha", title: "GitHub" },
    ],
  },
  {
    title: "Legal",
    subLinks: [
      { href: "/terms-conditions", title: "Terms & Conditions" },
      { href: "/privacy-policy", title: "Privacy Policy" },
    ],
  },
];

export const Footer = async () => {
  const plantsCategories = await getCategories(
    "?limit=3&sortBy=products&order=desc",
    "plants"
  );
  const careCategories = await getCategories(
    "?limit=2&sortBy=products&order=desc",
    "care"
  );

  return (
    <footer className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl container">
        <div className="md:flex gap-4 md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="lg:block hidden">
              <DesktopLogo />
            </Link>
            <Link href="/" className="block lg:hidden">
              <MobileLogo />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:gap-16 sm:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-medium text-foreground">
                Products
              </h2>
              <ul className="text-secondary-foreground space-y-2">
                {plantsCategories.map((c) => (
                  <li key={c.id}>
                    <FooterLink
                      href={`/products/category/plants/${c.slug}`}
                      title={c.name}
                    />
                  </li>
                ))}
                {careCategories.map((c) => (
                  <li key={c.id}>
                    <FooterLink
                      href={`/products/category/care/${c.slug}`}
                      title={c.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
            {footerLinks.map((link) => (
              <div key={link.title}>
                <h2 className="mb-6 text-sm font-medium">{link.title}</h2>
                <ul className="space-y-2 text-secondary-foreground">
                  {link.subLinks.map((sublink) => (
                    <li key={sublink.href}>
                      <FooterLink href={sublink.href} title={sublink.title} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground sm:text-center dark:text-muted-foreground">
            &copy; 2023-{new Date().getFullYear()} Greenscape. All Rights
            Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            {socialLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-muted-foreground hover:text-primary"
              >
                <link.icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  title: string;
}

const FooterLink = ({ href, title }: FooterLinkProps) => {
  return (
    <Button
      asChild
      variant="link"
      className="p-0 font-normal text-muted-foreground"
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
};
