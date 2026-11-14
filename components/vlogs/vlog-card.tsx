import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Play } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";
import { FacebookIcon, YouTubeIcon } from "@/components/vlogs/brand-icons";
import {
  formatDate,
  readingMinutes,
  type Vlog,
} from "@/components/vlogs/vlogs-data";

// One vlog as a glass block: picture, title, summary, then the action.
// The same card for both kinds; only the bottom row changes:
// - text vlog  -> "Read the vlog" button (full page on our site)
// - video vlog -> "Watch on" + YouTube / Facebook icons (full video there)
export function VlogCard({ vlog }: { vlog: Vlog }) {
  const isVideo = vlog.kind === "video";

  return (
    <GlassCard className="flex h-full flex-col">
      <div className="relative aspect-video overflow-hidden border-b border-white/80">
        {/* alt="": on the card the picture is decoration; the title next to
            it says what the vlog is. (The article page gives the full alt.)
            sizes: tells the browser how wide the picture is shown, so it
            downloads a small file on phones. */}
        <Image
          src={vlog.cover.src}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
        {/* Kind badge, so the visitor knows before clicking */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm">
          {isVideo ? (
            <Play aria-hidden="true" className="size-3.5" />
          ) : (
            <FileText aria-hidden="true" className="size-3.5" />
          )}
          {isVideo ? "Video" : "Article"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-royal-deep">{vlog.topic}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={vlog.publishedAt}>
            {formatDate(vlog.publishedAt)}
          </time>
          <span aria-hidden="true"> · </span>
          {isVideo
            ? (vlog.length ?? "Video")
            : `${readingMinutes(vlog)} min read`}
        </p>
        <h3 className="mt-2 font-display text-xl leading-snug font-semibold text-ink">
          {vlog.title}
        </h3>
        <p className="mt-2 text-ink-soft">{vlog.summary}</p>

        {/* mt-auto: the action row sits at the bottom of every card */}
        <div className="mt-auto pt-5">
          {vlog.kind === "text" ? (
            <Link
              href={`/vlogs/${vlog.slug}`}
              className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-white/70 px-4 text-sm font-semibold text-royal-deep ring-1 ring-white/80 transition-colors duration-200 hover:bg-white"
            >
              Read the vlog
              <span className="sr-only">{`: ${vlog.title}`}</span>
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-ink">Watch on</span>
              {vlog.youtubeUrl && (
                <PlatformLink
                  href={vlog.youtubeUrl}
                  label={`Watch "${vlog.title}" on YouTube (opens in a new tab)`}
                >
                  <YouTubeIcon className="size-6 text-youtube" />
                </PlatformLink>
              )}
              {vlog.facebookUrl && (
                <PlatformLink
                  href={vlog.facebookUrl}
                  label={`Watch "${vlog.title}" on Facebook (opens in a new tab)`}
                >
                  <FacebookIcon className="size-6 text-facebook" />
                </PlatformLink>
              )}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

// A round 44px icon link (touch target size). The icon has no text, so
// aria-label gives the link its name for screen readers.
function PlatformLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid size-11 place-items-center rounded-full bg-white/80 ring-1 ring-white/80 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
    >
      {children}
    </a>
  );
}
