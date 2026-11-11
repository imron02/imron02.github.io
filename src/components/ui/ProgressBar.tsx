export interface ProgressBarProps {
  value: number;
  label: string;
  tone?: "primary" | "secondary" | "gold" | "success" | "danger";
  size?: "sm" | "md";
  class?: string;
}

export default function ProgressBar({
  value,
  label,
  tone = "primary",
  size = "sm",
  class: className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const rootClass = [
    "ds-progress",
    `ds-progress--${tone}`,
    size === "md" ? "ds-progress--md" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      class={rootClass}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
    >
      <span style={{ width: `${clamped}%` }} />
    </div>
  );
}