import { n as create, t as persist } from "../_libs/zustand.mjs";
// node_modules/.nitro/vite/services/ssr/assets/theme-yMIJDpZA.js
var useThemeStore = create()(persist((set, get) => ({
	theme: "dark",
	setTheme: (theme) => {
		set({ theme });
		if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", theme === "dark");
	},
	toggle: () => get().setTheme(get().theme === "dark" ? "light" : "dark")
}), { name: "bb-admin-theme" }));
export { useThemeStore as t };
