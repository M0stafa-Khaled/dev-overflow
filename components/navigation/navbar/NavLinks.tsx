"use client";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ isMobileNav }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();
  const userId = 1;
  return (
    <>
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.href) && link.href.length > 1) ||
          pathname === link.href;

        if (link.href === "/pofile") {
          if (userId) link.href = `${link.href}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={link.href}
            key={link.label}
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900"
                : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent px-4 py-3"
            )}
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              height={20}
              width={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}
            >
              {link.label}
            </p>
          </Link>
        );
        return isMobileNav ? (
          <SheetClose asChild key={link.href}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={link.href}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
