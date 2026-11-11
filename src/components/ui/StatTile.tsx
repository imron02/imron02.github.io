export interface StatTileProps {
  label: string;
  value: string | number;
  sub?: string;
  subTone?: "secondary" | "gold" | "success" | "danger" | "muted";
  class?: string;
}

export default function StatTile({
  label,
  value,
  sub,
  subTone = "secondary",
  class: className,
}: StatTileProps) {
  const rootClass = ["ds-stat", className].filter(Boolean).join(" ");
  const subClass = ["ds-stat__sub", `ds-stat__sub--${subTone}`].join(" ");

  return (
    <div class={rootClass}>
      <span class="ds-stat__label">{label}</span>
      <span class="ds-stat__value">{value}</span>
      {sub ? <span class={subClass}>{sub}</span> : null}
    </div>
  );
}