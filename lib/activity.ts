import type { ActivityDay } from "@/types";

export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = 111; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    // Weighted random — more recent days are more active
    const recencyWeight = 1 - i / 112;
    const rand = Math.random();
    let count = 0;

    if (rand < 0.35) count = 0;
    else if (rand < 0.55) count = Math.ceil(recencyWeight * 2);
    else if (rand < 0.75) count = Math.ceil(recencyWeight * 4);
    else if (rand < 0.9) count = Math.ceil(recencyWeight * 6);
    else count = Math.ceil(recencyWeight * 9);

    days.push({ date: dateStr, count });
  }

  return days;
}

export function getIntensityClass(count: number): string {
  if (count === 0) return "bg-bg-border";
  if (count <= 2) return "bg-accent-cyan/30";
  if (count <= 4) return "bg-accent-cyan/55";
  if (count <= 6) return "bg-accent-cyan/80";
  return "bg-accent-cyan";
}
