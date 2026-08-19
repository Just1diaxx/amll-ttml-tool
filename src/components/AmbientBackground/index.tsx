import { useAtomValue } from "jotai";
import { ACCENT_COLOR_OPTIONS, accentColorAtom, ambientGlowAtom } from "$/states/theme";
import { isDarkThemeAtom } from "$/states/main";
import styles from "./index.module.css";

export const AmbientBackground = () => {
	const ambientGlow = useAtomValue(ambientGlowAtom);
	const accentColorName = useAtomValue(accentColorAtom);
	const isDark = useAtomValue(isDarkThemeAtom);

	if (!ambientGlow) return null;

	const accentInfo = ACCENT_COLOR_OPTIONS.find((opt) => opt.value === accentColorName) || ACCENT_COLOR_OPTIONS[0];

	return (
		<div className={styles.ambientContainer} aria-hidden="true" data-theme={isDark ? "dark" : "light"}>
			<div
				className={`${styles.orb} ${styles.orb1}`}
				style={{
					background: `radial-gradient(circle, ${accentInfo.glowColor} 0%, rgba(0,0,0,0) 70%)`,
				}}
			/>
			<div
				className={`${styles.orb} ${styles.orb2}`}
				style={{
					background: isDark
						? `radial-gradient(circle, rgba(120, 60, 220, 0.25) 0%, rgba(0,0,0,0) 70%)`
						: `radial-gradient(circle, rgba(180, 220, 255, 0.35) 0%, rgba(0,0,0,0) 70%)`,
				}}
			/>
			<div
				className={`${styles.orb} ${styles.orb3}`}
				style={{
					background: `radial-gradient(circle, ${accentInfo.glowColor} 0%, rgba(0,0,0,0) 75%)`,
				}}
			/>
			<div className={styles.gridPattern} />
		</div>
	);
};

export default AmbientBackground;
