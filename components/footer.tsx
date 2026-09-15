import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/section";
import { images, navigation, partners, site, socials } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-300">
      <Container size="wide" className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white">
                <Image
                  src={images.logo}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 object-contain"
                />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold text-white">
                  {site.name}
                </p>
                <p className="text-sm text-ink-400">{site.fullName}</p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-400">
              A home away from home for Indonesian students at Tunghai
              University since {site.foundedYear}. Come for the events, stay for
              the people.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-brand-400" aria-hidden />
                {site.email}
              </a>
              <p className="flex items-center gap-2.5 text-ink-400">
                <MapPin className="size-4 shrink-0 text-brand-400" aria-hidden />
                {site.university}, {site.city}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-3" aria-label="Footer">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Partners */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
              In partnership with
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {partners.map((partner) => (
                <li key={partner.name}>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-400 transition-colors hover:text-white"
                  >
                    {partner.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Follow us
            </h2>
            <ul className="mt-5 space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-sm text-ink-400 transition-colors hover:text-white"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 transition-colors group-hover:bg-brand-600">
                      <Image
                        src={social.icon}
                        alt=""
                        width={18}
                        height={18}
                        className="size-[18px] object-contain"
                      />
                    </span>
                    <span>
                      <span className="block text-white">{social.label}</span>
                      <span className="block text-xs">{social.handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mt-14 bg-white/10" />
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-ink-500 sm:flex-row">
          <p>
            © {year} <span className="font-semibold text-ink-300">{site.name}</span>.
            All rights reserved.
          </p>
          <p>Made by the Double U Team</p>
        </div>
      </Container>
    </footer>
  );
}
