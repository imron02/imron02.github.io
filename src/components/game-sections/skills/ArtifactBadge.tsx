import type { ArtifactTier, SkillArtifact } from "../../../data/skills";
import { cn } from "../../../lib/cn";
import { artifactGlyphs, logoUrl, tierMeta } from "./skillMeta";

const sizeMeta = {
  xs: { frame: "size-9.5", pad: "p-1", icon: 16 },
  sm: { frame: "size-11", pad: "p-1.25", icon: 18 },
  md: { frame: "size-14", pad: "p-1.5", icon: 24 },
  lg: { frame: "size-16.5", pad: "p-2", icon: 28 },
} as const;

export interface ArtifactBadgeProps {
  artifact: SkillArtifact;
  size?: keyof typeof sizeMeta;
  tone?: ArtifactTier;
  class?: string;
}

/** Tier-framed sigil: tech logo when the artifact has one, mapped glyph otherwise. */
export default function ArtifactBadge({
  artifact,
  size = "sm",
  tone,
  class: className,
}: ArtifactBadgeProps) {
  const meta = tierMeta[tone ?? artifact.tier];
  const dims = sizeMeta[size];
  const Glyph = artifact.icon ? artifactGlyphs[artifact.icon] : null;

  return (
    <span
      class={cn(
        "inline-flex flex-none items-center justify-center rounded-xs border",
        dims.frame,
        dims.pad,
        meta.border,
        meta.fill,
        meta.text,
        className,
      )}
      aria-hidden="true"
    >
      {artifact.logo ? (
        <span
          class="block size-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${logoUrl(artifact.logo)}")` }}
        />
      ) : Glyph ? (
        <Glyph size={dims.icon} strokeWidth={1.5} />
      ) : null}
    </span>
  );
}
