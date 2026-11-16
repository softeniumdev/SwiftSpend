import { o as __toESM } from "../_runtime.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { t as Switch } from "./switch-gZVh-YP4.mjs";
import { t as Separator } from "./separator-DA5o5Z3r.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { n as useAdminSession } from "./useAdminSession-DTEEJszo.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { t as useThemeStore } from "./theme-yMIJDpZA.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { k as Save } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/settings-BoeD1qcj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user, roles } = useAdminSession();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [country, setCountry] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const { theme, setTheme } = useThemeStore();
	(0, import_react.useEffect)(() => {
		(async () => {
			if (!user) return;
			const { data } = await supabase.from("profiles").select("full_name, country").eq("id", user.id).maybeSingle();
			if (data) {
				setFullName(data.full_name ?? "");
				setCountry(data.country ?? "");
			}
		})();
	}, [user]);
	const save = async () => {
		if (!user) return;
		setLoading(true);
		const { error } = await supabase.from("profiles").update({
			full_name: fullName,
			country
		}).eq("id", user.id);
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("Profile updated");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Settings",
		description: "Manage your admin profile and workspace preferences."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-6 lg:col-span-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Profile"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Shown to teammates and in audit entries."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: user?.email ?? "",
								disabled: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "fn",
								children: "Full name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "fn",
								value: fullName,
								onChange: (e) => setFullName(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "co",
								children: "Country"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "co",
								value: country,
								onChange: (e) => setCountry(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: save,
							disabled: loading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }), " Save changes"]
						}) })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "space-y-4 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Roles"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Determines what you can access."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: roles.length ? roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md bg-primary/10 px-2 py-1 text-xs font-medium capitalize text-primary",
						children: r
					}, r)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: "No roles assigned"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Appearance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Toggle interface theme."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "dark",
						children: "Dark mode"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						id: "dark",
						checked: theme === "dark",
						onCheckedChange: (v) => setTheme(v ? "dark" : "light")
					})]
				})
			]
		})]
	})] });
}
export { SettingsPage as component };
