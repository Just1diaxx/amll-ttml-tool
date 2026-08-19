import { atomWithStorage } from "jotai/utils";
import type { ThemeProps } from "@radix-ui/themes";

export type RadixAccentColor = NonNullable<ThemeProps["accentColor"]>;

export const ACCENT_COLOR_OPTIONS: {
	label: string;
	value: RadixAccentColor;
	color: string;
	glowColor: string;
}[] = [
	{ label: "Jade Emerald", value: "jade", color: "#29a374", glowColor: "rgba(41, 163, 116, 0.4)" },
	{ label: "Neon Violet", value: "violet", color: "#8e4ec6", glowColor: "rgba(142, 78, 198, 0.4)" },
	{ label: "Cyber Cyan", value: "cyan", color: "#00a2c7", glowColor: "rgba(0, 162, 199, 0.4)" },
	{ label: "Sunset Amber", value: "amber", color: "#ffc53d", glowColor: "rgba(255, 197, 61, 0.4)" },
	{ label: "Crimson Ruby", value: "ruby", color: "#e5484d", glowColor: "rgba(229, 72, 77, 0.4)" },
	{ label: "Electric Indigo", value: "indigo", color: "#6e56cf", glowColor: "rgba(110, 86, 207, 0.4)" },
	{ label: "Aurora Sky", value: "sky", color: "#0091ff", glowColor: "rgba(0, 145, 255, 0.4)" },
	{ label: "Hot Pink", value: "pink", color: "#d6409f", glowColor: "rgba(214, 64, 159, 0.4)" },
];

export const accentColorAtom = atomWithStorage<RadixAccentColor>("accentColor", "jade");
export const ambientGlowAtom = atomWithStorage<boolean>("ambientGlow", true);
export type GlassStyle = "solid" | "glass" | "hyper";
export const glassEffectAtom = atomWithStorage<GlassStyle>("glassEffect", "glass");
