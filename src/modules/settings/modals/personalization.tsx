import {
	Color24Regular,
	DarkTheme24Regular,
	Sparkle24Regular,
	Window24Regular,
} from "@fluentui/react-icons";
import {
	Flex,
	Grid,
	SegmentedControl,
	Switch,
	Tooltip,
} from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { DarkMode, darkModeAtom } from "$/states/main";
import {
	ACCENT_COLOR_OPTIONS,
	accentColorAtom,
	ambientGlowAtom,
	GlassStyle,
	glassEffectAtom,
	RadixAccentColor,
} from "$/states/theme";
import {
	SettingsCustomBackgroundCard,
	SettingsCustomBackgroundSettings,
} from "./customBackground";
import { SettingsGroup, SettingsRow } from "./SettingsGroup";
import {
	SettingsSpectrogramCustomPalettePage,
	SettingsSpectrogramPalettePage,
} from "./spectrogram";

const contentTransition = {
	duration: 0.25,
	ease: [0.4, 0, 0.2, 1],
} as const;

const contentVariants = {
	initial: { opacity: 0, y: 12 },
	animate: { opacity: 1, y: 0 },
} as const;

export const SettingsPersonalizationTab = ({
	subpage,
	onSubpageChange,
}: {
	subpage: "customBackground" | "customPalette" | null;
	onSubpageChange: (
		subpage: "customBackground" | "customPalette" | null,
	) => void;
}) => {
	const [darkMode, setDarkMode] = useAtom(darkModeAtom);
	const [accentColor, setAccentColor] = useAtom(accentColorAtom);
	const [ambientGlow, setAmbientGlow] = useAtom(ambientGlowAtom);
	const [glassEffect, setGlassEffect] = useAtom(glassEffectAtom);
	const { t } = useTranslation();
	const spectrogramTitle = t("settingsDialog.tab.spectrogram", "频谱图");

	const subpageContent =
		subpage === "customBackground" ? (
			<SettingsCustomBackgroundSettings />
		) : subpage === "customPalette" ? (
			<SettingsSpectrogramCustomPalettePage />
		) : null;

	return (
		<AnimatePresence initial={false}>
			{subpage ? (
				<motion.div
					key={subpage}
					variants={contentVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={contentTransition}
				>
					{subpageContent}
				</motion.div>
			) : (
				<motion.div
					key="personalization-main"
					variants={contentVariants}
					initial="initial"
					animate="animate"
					transition={contentTransition}
				>
					<Flex direction="column" gap="4">
						<SettingsGroup title={t("settings.personalization.appearanceGroup", "主题与外观")}>
							<SettingsRow
								icon={<DarkTheme24Regular />}
								title={t("settings.personalization.theme", "外观主题")}
								description={t(
									"settings.personalization.themeDesc",
									"选择界面使用浅色、深色，或跟随系统设置。",
								)}
								action={
									<SegmentedControl.Root
										value={darkMode}
										onValueChange={(value) => setDarkMode(value as DarkMode)}
									>
										<SegmentedControl.Item value={DarkMode.Light}>
											{t("settings.personalization.themeLight", "浅色")}
										</SegmentedControl.Item>
										<SegmentedControl.Item value={DarkMode.Dark}>
											{t("settings.personalization.themeDark", "深色")}
										</SegmentedControl.Item>
										<SegmentedControl.Item value={DarkMode.Auto}>
											{t("settings.personalization.themeAuto", "自动")}
										</SegmentedControl.Item>
									</SegmentedControl.Root>
								}
							/>

							<SettingsRow
								icon={<Color24Regular />}
								title={t("settings.personalization.accentColor", "强调色")}
								description={t(
									"settings.personalization.accentColorDesc",
									"自定义软件界面的主题色调与高亮光效。",
								)}
								action={
									<Grid columns="4" gap="2">
										{ACCENT_COLOR_OPTIONS.map((option) => {
											const isSelected = accentColor === option.value;
											return (
												<Tooltip key={option.value} content={option.label}>
													<button
														type="button"
														onClick={() => setAccentColor(option.value as RadixAccentColor)}
														style={{
															width: "32px",
															height: "32px",
															borderRadius: "50%",
															backgroundColor: option.color,
															border: isSelected
																? "2px solid var(--gray-12)"
																: "2px solid transparent",
															boxShadow: isSelected
																? `0 0 12px ${option.glowColor}, 0 0 0 2px var(--accent-a8)`
																: "none",
															cursor: "pointer",
															transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
															transform: isSelected ? "scale(1.15)" : "scale(1)",
															outline: "none",
														}}
													/>
												</Tooltip>
											);
										})}
									</Grid>
								}
							/>

							<SettingsRow
								icon={<Sparkle24Regular />}
								title={t("settings.personalization.ambientGlow", "环境氛围光效")}
								description={t(
									"settings.personalization.ambientGlowDesc",
									"在背景渲染流动的动态光雾与粒子流光效果。",
								)}
								action={
									<Switch
										checked={ambientGlow}
										onCheckedChange={setAmbientGlow}
									/>
								}
							/>

							<SettingsRow
								icon={<Window24Regular />}
								title={t("settings.personalization.glassStyle", "毛玻璃磨砂效果")}
								description={t(
									"settings.personalization.glassStyleDesc",
									"调节界面面板与对话框的透明度及高斯模糊强度。",
								)}
								action={
									<SegmentedControl.Root
										value={glassEffect}
										onValueChange={(val) => setGlassEffect(val as GlassStyle)}
									>
										<SegmentedControl.Item value="solid">
											{t("settings.personalization.glassSolid", "纯色实心")}
										</SegmentedControl.Item>
										<SegmentedControl.Item value="glass">
											{t("settings.personalization.glassStandard", "标准透光")}
										</SegmentedControl.Item>
										<SegmentedControl.Item value="hyper">
											{t("settings.personalization.glassHyper", "极炫高透")}
										</SegmentedControl.Item>
									</SegmentedControl.Root>
								}
							/>

							<SettingsCustomBackgroundCard
								onOpen={() => onSubpageChange("customBackground")}
							/>
						</SettingsGroup>

						<SettingsGroup title={spectrogramTitle}>
							<SettingsSpectrogramPalettePage
								onOpenCustomPalette={() => onSubpageChange("customPalette")}
							/>
						</SettingsGroup>
					</Flex>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
