import { X } from "lucide-preact";
import { useEffect } from "preact/hooks";
import type { SkillArtifact, SkillCategory } from "../../../data/skills";
import IconButton from "../../ui/IconButton";
import ArtifactAnalysis from "./ArtifactAnalysis";

export interface ArtifactSheetProps {
  open: boolean;
  artifact: SkillArtifact;
  category: SkillCategory;
  equipped: boolean;
  onClose: () => void;
}

/** Mobile bottom sheet around the shared analysis body; desktop never renders it. */
export default function ArtifactSheet({
  open,
  artifact,
  category,
  equipped,
  onClose,
}: ArtifactSheetProps) {
  useEffect(() => {
    if (!open) return;

    document.getElementById("artifact-sheet-close")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.getElementById(`artifact-card-${artifact.id}`)?.focus();
    };
  }, [open, artifact.id, onClose]);

  if (!open) return null;

  return (
    <div
      data-artifact-sheet="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="artifact-sheet-title"
      class="fixed inset-0 z-40 hidden mobile:flex"
    >
      <button
        type="button"
        aria-label="Close artifact analysis"
        onClick={onClose}
        class="absolute inset-0 cursor-pointer border-0 bg-[color-mix(in_srgb,var(--color-void)_80%,transparent)] backdrop-blur-[2px]"
      />

      <div class="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-y-auto rounded-t-m border border-border bg-hud-panel-strong p-0">
        <div class="sticky top-0 z-10 flex h-12 items-center justify-between gap-3 border-b border-border-subtle bg-hud-panel-strong px-4">
          <span class="font-hud text-[10px] tracking-[1.6px] text-accent-gold">
            {"// ARTIFACT ANALYSIS"}
          </span>
          <span class="ml-auto font-hud text-[9.5px] tracking-[0.9px] text-text-dim">
            {artifact.code}
          </span>
          <IconButton
            id="artifact-sheet-close"
            size="sm"
            label="Close artifact analysis"
            icon={<X size={14} strokeWidth={1.5} />}
            onClick={onClose}
          />
        </div>

        <ArtifactAnalysis artifact={artifact} category={category} equipped={equipped} sheet />
      </div>
    </div>
  );
}
