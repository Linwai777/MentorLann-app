import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";
import {
  TEXT_VLOGS,
  formatDate,
  getTextVlog,
  readingMinutes,
  type VlogBlock,
} from "@/components/vlogs/vlogs-data";

// [slug] in the folder name = a dynamic segment: /vlogs/<anything>.
// The value arrives in `params`, which is a Promise in Next.js 16.

// Build every text vlog page ahead of time (static HTML, very fast).
// With cacheComponents this list must have at least one item.
export async function generateStaticParams() {
  return TEXT_VLOGS.map((vlog) => ({ slug: vlog.slug }));
}

// Each article gets its own title and description (Google, link previews).
export async function generateMetadata({
  params,
}: PageProps<"/vlogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const vlog = getTextVlog(slug);
  if (!vlog) return {};
  return {
    title: vlog.title,
    description: vlog.summary,
    openGraph: { images: [vlog.cover.src.src] },
  };
}

export default async function VlogArticlePage({
  params,
}: PageProps<"/vlogs/[slug]">) {
  const { slug } = await params;
  const vlog = getTextVlog(slug);
  // Unknown slug (or a video vlog, which has no page here): show the 404
  // page. dynamicParams is not allowed with cacheComponents, so we check.
  if (!vlog) notFound();

  return (
    // <article>: a complete piece of content that makes sense on its own
    <article className="bg-white pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Link
          href="/vlogs"
          className="group inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-royal-deep underline-offset-4 hover:underline"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-x-1"
          />
          All vlogs
        </Link>

        <p className="mt-6 text-xs font-semibold tracking-[0.12em] text-royal-deep uppercase">
          {vlog.topic}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight font-bold tracking-tight text-balance text-ink sm:text-5xl">
          {vlog.title}
        </h1>
        <p className="mt-4 text-sm text-ink-soft">
          {vlog.author}
          <span aria-hidden="true"> · </span>
          <time dateTime={vlog.publishedAt}>
            {formatDate(vlog.publishedAt)}
          </time>
          <span aria-hidden="true"> · </span>
          {readingMinutes(vlog)} min read
        </p>
      </div>

      {/* The cover is the first big picture (likely the LCP), so it is
          preloaded. Full alt text here: on this page it is real content. */}
      <div className="mx-auto mt-10 w-full max-w-5xl px-4 sm:px-6">
        <Image
          src={vlog.cover.src}
          alt={vlog.cover.alt}
          preload
          placeholder="blur"
          sizes="(min-width: 1024px) 976px, 100vw"
          className="w-full rounded-2xl border border-line shadow-lg shadow-ink/10"
        />
      </div>

      <div className="mx-auto mt-10 w-full max-w-3xl px-4 sm:px-6">
        {vlog.body.map((block, index) => (
          <Block key={index} block={block} />
        ))}

        {/* One clear next step at the end */}
        <GlassCard className="mt-14 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Ready for your first step?
          </h2>
          <p className="mt-2 text-ink-soft">
            Pick a career path and open Step 1 of its free courses.
          </p>
          <Link
            href="/courses"
            className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-royal px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-royal-deep"
          >
            Browse free courses
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </GlassCard>
      </div>
    </article>
  );
}

// Renders one body block in its own style. The `switch` on block.type lets
// TypeScript know exactly which fields each block has.
function Block({ block }: { block: VlogBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="mt-4 text-lg leading-8 text-ink-soft">{block.text}</p>
      );
    case "list":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-8 text-ink-soft marker:text-royal">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        // <figure> + <figcaption>: the caption belongs to the picture
        <figure className="mt-8">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            placeholder="blur"
            sizes="(min-width: 768px) 720px, 100vw"
            className="w-full rounded-xl border border-line"
          />
          {block.caption && (
            <figcaption className="mt-3 text-sm text-ink-soft">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
}
