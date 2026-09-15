import Image from "next/image";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { images } from "@/lib/site";

/**
 * A simple asymmetric photo wall. The first and fourth images are square and
 * span two rows; the rest are landscape. Swap the files in lib/site.ts.
 */
export function Gallery() {
  return (
    <Section>
      <Container size="wide">
        <SectionHeading
          eyebrow="Life at THUISA"
          title="Two semesters, in pictures"
          lede="Trips, tournaments, food stalls, and a lot of group photos. This is what the year actually looks like."
        />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
          {images.gallery.map((photo, index) => {
            const tall = index === 0 || index === 3;
            return (
              <figure
                key={photo.src}
                className={`group relative overflow-hidden rounded-2xl bg-ink-100 ring-1 ring-ink-200 ${
                  tall ? "row-span-2" : ""
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/80 to-transparent p-4 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {photo.alt}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
