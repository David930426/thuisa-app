"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { images, navigation, site, socials } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Menu() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // The homepage has a full-bleed hero, so the bar starts transparent there.
  const overlayHome = pathname === "/";

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Only hide once the user is well past the header.
      setHidden(y > lastY && y > 240);
      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const solid = scrolled || !overlayHome || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        solid
          ? "bg-white/95 shadow-sm ring-1 ring-ink-900/5 backdrop-blur"
          : "bg-gradient-to-b from-black/55 to-transparent"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} home`}
        >
          <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-ink-900/5">
            <Image
              src={images.logo}
              alt=""
              width={48}
              height={48}
              className="size-12 object-contain"
              priority
            />
          </span>
          <span className="hidden sm:block">
            <span
              className={cn(
                "block font-display text-lg font-extrabold leading-none tracking-tight",
                solid ? "text-ink-900" : "text-white"
              )}
            >
              {site.name}
            </span>
            <span
              className={cn(
                "mt-1 block text-[11px] leading-tight",
                solid ? "text-ink-500" : "text-white/70"
              )}
            >
              Tunghai University
              <br />
              Indonesian Student Association
            </span>
          </span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-0">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild active={active}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative rounded-md px-4 py-2 text-sm font-medium transition-colors",
                        solid
                          ? active
                            ? "text-brand-700 focus:text-brand-700"
                            : "text-ink-600 hover:text-ink-900"
                          : active
                            ? "text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                            : "text-white/75 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3 -bottom-1 h-0.5 rounded-full transition-all",
                          active
                            ? solid
                              ? "bg-brand-600"
                              : "bg-accent-300"
                            : "bg-transparent"
                        )}
                      />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant={solid ? "brandOutline" : "onDarkOutline"}
            size="sm"
            className="hidden sm:inline-flex"
          >
            <a
              href={socials[0].href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={socials[0].icon}
                alt=""
                width={16}
                height={16}
                className="size-4 object-contain"
              />
              Follow us
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className={cn(
                  "rounded-xl lg:hidden",
                  solid
                    ? "text-ink-800 hover:bg-ink-100"
                    : "text-white hover:bg-white/15 hover:text-white"
                )}
              >
                <MenuIcon className="size-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full max-w-sm">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3 text-left">
                  <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-ink-200">
                    <Image
                      src={images.logo}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 object-contain"
                    />
                  </span>
                  <span className="font-display text-base font-extrabold text-ink-900">
                    {site.name}
                  </span>
                </SheetTitle>
              </SheetHeader>

              <Separator />

              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        active
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-700 hover:bg-ink-50"
                      )}
                    >
                      {item.label}
                      {active ? (
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-brand-600"
                        />
                      ) : null}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-2 px-4 pb-6">
                <Separator className="mb-2" />
                {socials.map((social) => (
                  <Button
                    key={social.label}
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={social.icon}
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 object-contain"
                      />
                      {social.label}
                    </a>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
