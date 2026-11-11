export interface SkillMeterProps {
  level: number;
  max?: number;
  label: string;
  class?: string;
}

export default function SkillMeter({
  level,
  max = 4,
  label,
  class: className,
}: SkillMeterProps) {
  const rootClass = ["ds-skill-meter", className].filter(Boolean).join(" ");
  const steps = Array.from({ length: max }, (_, index) => index);

  return (
    <span class={rootClass} role="img" aria-label={label}>
      {steps.map((index) => (
        <i
          key={index}
          class={index < level ? "is-on" : undefined}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}