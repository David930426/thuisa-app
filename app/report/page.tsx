import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Container,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import {
  budgetBreakdown,
  reports,
  transparencyHighlights,
} from "@/lib/reports";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Report",
  description:
    "THUISA accountability and transparency reports — annual reports, financial summaries, and event reports for members.",
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Accountability"
        title="Where the money goes, and what we did with it"
        lede="Membership fees and sponsorship come from our own community, so each committee publishes what it spent and what it delivered. These are our accountability reports."
      >
        <Button asChild variant="onDarkOutline" size="lg">
          <Link href="/contact">Ask us about a report</Link>
        </Button>
      </PageHeader>

      {/* Highlights */}
      <Section spacing="tight">
        <Container size="wide">
          <dl className="grid gap-6 sm:grid-cols-3">
            {transparencyHighlights.map((item) => (
              <Card
                key={item.label}
                className="border-ink-200 border-t-4 border-t-brand-600 bg-ink-50"
              >
                <CardContent>
                  <dd className="font-display text-4xl font-extrabold text-ink-900">
                    {item.value}
                  </dd>
                  <dt className="mt-2 font-display text-sm font-bold text-brand-700">
                    {item.label}
                  </dt>
                  <p className="mt-1.5 text-sm text-ink-600">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </dl>
        </Container>
      </Section>

      {/* Budget shape */}
      <Section tone="muted">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The shape of the budget"
                title="Roughly where every NT$100 goes"
                lede="A plain-language summary while the full financial report is being prepared. The audited figures always take precedence over this chart."
              />
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-6">
                {budgetBreakdown.map((line) => (
                  <li key={line.label}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-sm font-bold text-ink-900 md:text-base">
                        {line.label}
                      </span>
                      <span className="font-display text-sm font-extrabold text-brand-700 tabular-nums">
                        {line.percent}%
                      </span>
                    </div>
                    <Progress
                      value={line.percent}
                      aria-label={`${line.label}: ${line.percent} percent`}
                      className="mt-2 h-2.5 bg-ink-200 [&>[data-slot=progress-indicator]]:bg-brand-600"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Report list */}
      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Documents"
            title="Published reports"
            lede="Reports are published at the end of each committee year. Entries marked as in preparation are being finalised and checked by the incoming committee."
          />

          <ul className="mt-14 divide-y divide-ink-200 border-y border-ink-200">
            {reports.map((report) => (
              <li
                key={report.id}
                className="flex flex-col gap-5 py-7 sm:flex-row sm:items-start"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <FileText className="size-6" aria-hidden />
                </span>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="font-display text-lg font-bold text-ink-900">
                      {report.title}
                    </h3>
                    <Badge variant="secondary">{report.kind}</Badge>
                  </div>
                  <p className="mt-1 text-sm font-medium text-brand-700">
                    {report.period}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">
                    {report.summary}
                  </p>
                </div>

                <div className="shrink-0 sm:pt-1">
                  {report.file ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={report.file} target="_blank" rel="noopener noreferrer"><Download className="size-4" aria-hidden />
                      Download PDF</a>
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
                      <Lock aria-hidden />
                      In preparation
                    </Badge>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Request access */}
      <Section tone="dark" spacing="tight">
        <Container size="narrow" className="text-center">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Members can ask for the detail behind any figure
          </h2>
          <p className="mt-4 text-ink-400">
            If you pay the {site.membershipFee} membership fee, you are entitled
            to see how it was spent. Email us and the Finance division will walk
            you through it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="onDark" size="lg">
              <a href={`mailto:${site.email}`}>Email the Finance division</a>
            </Button>
            <Button asChild variant="onDarkOutline" size="lg">
              <Link href="/about">Meet the committee</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
