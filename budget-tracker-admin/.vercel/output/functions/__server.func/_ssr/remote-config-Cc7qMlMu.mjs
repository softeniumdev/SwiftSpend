import { o as __toESM } from "../_runtime.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Textarea } from "./textarea-DvN15-gJ.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { t as Switch } from "./switch-gZVh-YP4.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-DJmpbwhv.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { t as Separator } from "./separator-DA5o5Z3r.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BdJfjbEJ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-pLK6MnOG.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { i as formatDateTime } from "./format-D3NUXAym.mjs";
import { t as useRealtimeInvalidate } from "./useRealtimeInvalidate-Bt8_dkae.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Search, E as Send, F as Plus, K as Megaphone, Lt as Bell, at as Gauge, b as SlidersVertical, f as Undo2, gt as CreditCard, it as History, j as Rocket, k as Save, mt as DollarSign, n as X, ut as FilePen, v as Sparkles, w as ShieldAlert } from "../_libs/lucide-react.mjs";
import { a as ScrollAreaViewport, i as ScrollAreaThumb, n as ScrollAreaCorner, r as ScrollAreaScrollbar, t as ScrollArea$1 } from "../_libs/radix-ui__react-scroll-area.mjs";
// node_modules/.nitro/vite/services/ssr/assets/remote-config-Cc7qMlMu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScrollArea$1, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaViewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaCorner, {})
	]
}));
ScrollArea.displayName = ScrollArea$1.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var CATEGORIES = [
	{
		id: "all",
		label: "All",
		icon: SlidersVertical
	},
	{
		id: "features",
		label: "Features",
		icon: Sparkles
	},
	{
		id: "subscriptions",
		label: "Subscriptions",
		icon: CreditCard
	},
	{
		id: "ads",
		label: "Ads",
		icon: Megaphone
	},
	{
		id: "onboarding",
		label: "Onboarding",
		icon: Rocket
	},
	{
		id: "notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		id: "paywall",
		label: "Paywall",
		icon: DollarSign
	},
	{
		id: "limits",
		label: "Limits",
		icon: Gauge
	},
	{
		id: "maintenance",
		label: "Maintenance",
		icon: ShieldAlert
	}
];
var TYPE_COLORS = {
	boolean: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
	string: "bg-blue-500/15 text-blue-500 border-blue-500/30",
	integer: "bg-amber-500/15 text-amber-500 border-amber-500/30",
	json: "bg-purple-500/15 text-purple-500 border-purple-500/30",
	array: "bg-pink-500/15 text-pink-500 border-pink-500/30"
};
function formatValue(v) {
	if (v === null || v === void 0) return "—";
	if (typeof v === "string") return v;
	return JSON.stringify(v);
}
function parseValue(raw, type) {
	switch (type) {
		case "boolean": return raw === "true" || raw === "1";
		case "integer": {
			const n = Number(raw);
			if (!Number.isFinite(n)) throw new Error("Invalid integer");
			return Math.trunc(n);
		}
		case "string": return raw;
		case "array":
		case "json": {
			const parsed = JSON.parse(raw);
			if (type === "array" && !Array.isArray(parsed)) throw new Error("Value must be an array");
			return parsed;
		}
	}
}
function RemoteConfigPage() {
	const qc = useQueryClient();
	const [category, setCategory] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [historyKey, setHistoryKey] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const query = useQuery({
		queryKey: ["remote-config-all"],
		queryFn: async () => {
			const { data, error } = await supabase.from("remote_config").select("*").order("category").order("key");
			if (error) throw error;
			return data ?? [];
		}
	});
	useRealtimeInvalidate(["remote_config"], ["remote-config-all"]);
	const rows = query.data ?? [];
	const filtered = (0, import_react.useMemo)(() => {
		return rows.filter((r) => {
			if (category !== "all") {
				if (!(r.category === category || category === "ads" && (r.category === "advertising" || r.category === "ads") || category === "maintenance" && (r.category === "system" || r.category === "maintenance"))) return false;
			}
			if (search) {
				const q = search.toLowerCase();
				if (!r.key.toLowerCase().includes(q) && !(r.description ?? "").toLowerCase().includes(q)) return false;
			}
			return true;
		});
	}, [
		rows,
		category,
		search
	]);
	const counts = (0, import_react.useMemo)(() => {
		const c = { all: rows.length };
		rows.forEach((r) => {
			const cat = r.category === "advertising" ? "ads" : r.category === "system" ? "maintenance" : r.category;
			c[cat] = (c[cat] ?? 0) + 1;
		});
		return c;
	}, [rows]);
	const draftCount = rows.filter((r) => r.has_draft).length;
	const publishAllDrafts = useMutation({
		mutationFn: async () => {
			const drafts = rows.filter((r) => r.has_draft);
			for (const r of drafts) {
				const { error } = await supabase.from("remote_config").update({
					value: r.draft_value,
					draft_value: null,
					has_draft: false,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("key", r.key);
				if (error) throw error;
				await supabase.from("remote_config_history").insert({
					config_key: r.key,
					previous_value: r.value,
					new_value: r.draft_value,
					change_type: "publish"
				});
			}
			await logAudit({
				action: "remote_config.publish_all",
				resource_type: "remote_config",
				extra: { count: drafts.length }
			});
		},
		onSuccess: () => {
			toast.success("All drafts published");
			qc.invalidateQueries({ queryKey: ["remote-config-all"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Remote Config",
				description: "Firebase-style runtime configuration. Draft, target, publish, and roll back — changes propagate live.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [draftCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "default",
					onClick: () => publishAllDrafts.mutate(),
					disabled: publishAllDrafts.isPending,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-2 h-4 w-4" }),
						"Publish ",
						draftCount,
						" draft",
						draftCount === 1 ? "" : "s"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " New key"]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-4 md:flex-row md:items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search keys or descriptions...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "pl-9"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: category,
				onValueChange: (v) => setCategory(v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
					className: "w-max",
					children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: c.id,
						className: "gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-4 w-4" }),
							c.label,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "ml-1 h-5 px-1.5 text-[10px]",
								children: counts[c.id] ?? 0
							})
						]
					}, c.id))
				}) })
			}),
			query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {})
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: SlidersVertical,
					title: "No configuration keys",
					description: "Create your first remote config key to control the app remotely."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: filtered.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigCard, {
					row,
					onEdit: () => setEditing(row),
					onHistory: () => setHistoryKey(row.key)
				}, row.key))
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditConfigDialog, {
				row: editing,
				onClose: () => setEditing(null),
				onSaved: () => qc.invalidateQueries({ queryKey: ["remote-config-all"] })
			}),
			historyKey && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryDialog, {
				configKey: historyKey,
				onClose: () => setHistoryKey(null),
				onRolledBack: () => qc.invalidateQueries({ queryKey: ["remote-config-all"] })
			}),
			creating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateConfigDialog, {
				onClose: () => setCreating(false),
				onSaved: () => qc.invalidateQueries({ queryKey: ["remote-config-all"] })
			})
		]
	});
}
function ConfigCard({ row, onEdit, onHistory }) {
	const hasTargeting = (row.target_versions?.length || 0) + (row.target_platforms?.length || 0) + (row.target_countries?.length || 0) > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-start justify-between gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center gap-2 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-mono text-sm font-semibold truncate",
								children: row.key
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: `text-[10px] ${TYPE_COLORS[row.value_type]}`,
								children: row.value_type
							}),
							row.has_draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-amber-500/20 text-amber-500 border-amber-500/40 text-[10px]",
								children: "DRAFT"
							})
						]
					}), row.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: row.description
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 rounded-lg bg-muted/40 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Current"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono text-foreground text-right break-all max-w-[70%]",
							children: formatValue(row.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Default"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono text-muted-foreground text-right break-all max-w-[70%]",
							children: formatValue(row.default_value)
						})]
					}),
					row.has_draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-amber-500",
							children: "Draft"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono text-amber-500 text-right break-all max-w-[70%]",
							children: formatValue(row.draft_value)
						})]
					})
				]
			}),
			hasTargeting && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1",
				children: [
					(row.target_platforms ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						className: "text-[10px]",
						children: ["📱 ", p]
					}, p)),
					(row.target_versions ?? []).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						className: "text-[10px]",
						children: ["v ", v]
					}, v)),
					(row.target_countries ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						className: "text-[10px]",
						children: ["🌍 ", c]
					}, c))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] text-muted-foreground",
					children: ["Updated ", formatDateTime(row.updated_at)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onHistory,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: onEdit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, { className: "mr-1 h-4 w-4" }), " Edit"]
					})]
				})]
			})
		]
	});
}
function EditConfigDialog({ row, onClose, onSaved }) {
	const initial = row.has_draft ? row.draft_value : row.value;
	const [raw, setRaw] = (0, import_react.useState)(row.value_type === "string" ? String(initial ?? "") : JSON.stringify(initial ?? null, null, 2));
	const [reason, setReason] = (0, import_react.useState)("");
	const [versions, setVersions] = (0, import_react.useState)((row.target_versions ?? []).join(", "));
	const [platforms, setPlatforms] = (0, import_react.useState)(row.target_platforms ?? []);
	const [countries, setCountries] = (0, import_react.useState)((row.target_countries ?? []).join(", "));
	const [saving, setSaving] = (0, import_react.useState)(false);
	const togglePlatform = (p) => setPlatforms((s) => s.includes(p) ? s.filter((x) => x !== p) : [...s, p]);
	const save = async (mode) => {
		try {
			setSaving(true);
			const parsed = parseValue(raw, row.value_type);
			versions.split(",").map((s) => s.trim()).filter(Boolean), countries.split(",").map((s) => s.trim()).filter(Boolean);
			if (mode === "draft") {
				const { error } = await supabase.from("remote_config").update({
					draft_value: parsed,
					has_draft: true,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("key", row.key);
				if (error) throw error;
				await supabase.from("remote_config_history").insert({
					config_key: row.key,
					previous_value: row.value,
					new_value: parsed,
					change_type: "draft",
					reason
				});
			} else {
				const { error } = await supabase.from("remote_config").update({
					value: parsed,
					draft_value: null,
					has_draft: false,
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("key", row.key);
				if (error) throw error;
				await supabase.from("remote_config_history").insert({
					config_key: row.key,
					previous_value: row.value,
					new_value: parsed,
					change_type: "publish",
					reason
				});
			}
			await logAudit({
				action: mode === "draft" ? "remote_config.draft" : "remote_config.publish",
				resource_type: "remote_config",
				resource_id: row.key,
				before: { value: row.value },
				after: { value: parsed }
			});
			toast.success(mode === "draft" ? "Draft saved" : "Published");
			onSaved();
			onClose();
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	};
	const resetToDefault = () => {
		setRaw(row.value_type === "string" ? String(row.default_value ?? "") : JSON.stringify(row.default_value ?? null, null, 2));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-mono text-base",
					children: row.key
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: row.description ?? "No description" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 flex-wrap text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: TYPE_COLORS[row.value_type],
								children: row.value_type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "capitalize",
								children: row.category
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
								className: "text-xs",
								children: [
									"Value (",
									row.value_type,
									")"
								]
							}),
							row.value_type === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: raw === "true",
									onCheckedChange: (v) => setRaw(v ? "true" : "false")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: raw === "true" ? "Enabled" : "Disabled"
								})]
							}) : row.value_type === "string" || row.value_type === "integer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-2 font-mono",
								type: row.value_type === "integer" ? "number" : "text",
								value: raw,
								onChange: (e) => setRaw(e.target.value)
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								className: "mt-2 font-mono text-xs min-h-32",
								value: raw,
								onChange: (e) => setRaw(e.target.value),
								spellCheck: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: resetToDefault,
								className: "mt-1 text-[11px] text-muted-foreground hover:text-foreground",
								children: ["Reset to default: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: formatValue(row.default_value) })]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-semibold",
									children: "Targeting"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Platforms"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex gap-2 flex-wrap",
									children: [
										"ios",
										"android",
										"web"
									].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										onClick: () => togglePlatform(p),
										variant: platforms.includes(p) ? "default" : "outline",
										className: "cursor-pointer capitalize",
										children: p
									}, p))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "App versions (comma-separated)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "mt-1",
										value: versions,
										onChange: (e) => setVersions(e.target.value),
										placeholder: "1.0.0, 1.1.0"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Countries (ISO codes)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "mt-1",
										value: countries,
										onChange: (e) => setCountries(e.target.value),
										placeholder: "US, GB, DE"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Empty = applies to all. Comma-separated lists."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Change reason (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "mt-1 min-h-16",
							value: reason,
							onChange: (e) => setReason(e.target.value),
							placeholder: "Why this change?"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							onClick: onClose,
							disabled: saving,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-2 h-4 w-4" }), " Cancel"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => save("draft"),
							disabled: saving,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, { className: "mr-2 h-4 w-4" }), " Save draft"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => save("publish"),
							disabled: saving,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-2 h-4 w-4" }), " Publish"]
						})
					]
				})
			]
		})
	});
}
function HistoryDialog({ configKey, onClose, onRolledBack }) {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["remote-config-history", configKey],
		queryFn: async () => {
			const { data, error } = await supabase.from("remote_config_history").select("*").eq("config_key", configKey).order("created_at", { ascending: false }).limit(50);
			if (error) throw error;
			return data ?? [];
		}
	});
	const rollback = useMutation({
		mutationFn: async (h) => {
			const target = h.previous_value ?? h.new_value;
			const { data: current } = await supabase.from("remote_config").select("value").eq("key", configKey).maybeSingle();
			const { error } = await supabase.from("remote_config").update({
				value: target,
				draft_value: null,
				has_draft: false,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("key", configKey);
			if (error) throw error;
			await supabase.from("remote_config_history").insert({
				config_key: configKey,
				previous_value: current?.value ?? null,
				new_value: target,
				change_type: "rollback",
				reason: `Rolled back to ${formatDateTime(h.created_at)}`
			});
			await logAudit({
				action: "remote_config.rollback",
				resource_type: "remote_config",
				resource_id: configKey,
				before: { value: current?.value },
				after: { value: target }
			});
		},
		onSuccess: () => {
			toast.success("Rolled back");
			qc.invalidateQueries({ queryKey: ["remote-config-history", configKey] });
			onRolledBack();
		},
		onError: (e) => toast.error(e.message)
	});
	const rows = q.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl max-h-[85vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-sm",
						children: configKey
					}),
					" · History"
				]
			}) }), q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground py-8 text-center",
				children: "No history yet"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: rows.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border p-3 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: h.change_type === "publish" ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : h.change_type === "rollback" ? "bg-blue-500/20 text-blue-500 border-blue-500/30" : "bg-amber-500/20 text-amber-500 border-amber-500/30",
									children: h.change_type
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: formatDateTime(h.created_at)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => rollback.mutate(h),
								disabled: rollback.isPending,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "mr-1 h-3 w-3" }), " Roll back to before"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground mb-1",
								children: "Before"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono block bg-muted/40 p-2 rounded break-all",
								children: formatValue(h.previous_value)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground mb-1",
								children: "After"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "font-mono block bg-muted/40 p-2 rounded break-all",
								children: formatValue(h.new_value)
							})] })]
						}),
						h.reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground italic",
							children: [
								"\"",
								h.reason,
								"\""
							]
						})
					]
				}, h.id))
			})]
		})
	});
}
function CreateConfigDialog({ onClose, onSaved }) {
	const [key, setKey] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("features");
	const [valueType, setValueType] = (0, import_react.useState)("boolean");
	const [defaultRaw, setDefaultRaw] = (0, import_react.useState)("false");
	const [description, setDescription] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const submit = async () => {
		try {
			setSaving(true);
			if (!/^[a-z0-9_]+$/i.test(key)) throw new Error("Key must be alphanumeric/underscore");
			const parsed = parseValue(defaultRaw, valueType);
			const dataType = valueType === "integer" ? "number" : valueType === "array" ? "json" : valueType;
			const { error } = await supabase.from("remote_config").insert({
				key,
				value: parsed,
				default_value: parsed,
				description,
				category,
				data_type: dataType,
				value_type: valueType,
				environment: "production"
			});
			if (error) throw error;
			await supabase.from("remote_config_history").insert({
				config_key: key,
				previous_value: null,
				new_value: parsed,
				change_type: "publish",
				reason: "Initial creation"
			});
			await logAudit({
				action: "remote_config.create",
				resource_type: "remote_config",
				resource_id: key,
				after: {
					value: parsed,
					category,
					value_type: valueType
				}
			});
			toast.success("Config key created");
			onSaved();
			onClose();
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	};
	const changeType = (t) => {
		setValueType(t);
		setDefaultRaw(t === "boolean" ? "false" : t === "integer" ? "0" : t === "string" ? "" : t === "array" ? "[]" : "{}");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New configuration key" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Key"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1 font-mono",
							value: key,
							onChange: (e) => setKey(e.target.value),
							placeholder: "feature_new_thing"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: category,
								onValueChange: (v) => setCategory(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CATEGORIES.filter((c) => c.id !== "all").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c.id,
									children: c.label
								}, c.id)) })]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: valueType,
								onValueChange: (v) => changeType(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
									"boolean",
									"string",
									"integer",
									"json",
									"array"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t,
									children: t
								}, t)) })]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Default value"
						}), valueType === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: defaultRaw === "true",
								onCheckedChange: (v) => setDefaultRaw(v ? "true" : "false")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: defaultRaw === "true" ? "true" : "false"
							})]
						}) : valueType === "string" || valueType === "integer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1 font-mono",
							type: valueType === "integer" ? "number" : "text",
							value: defaultRaw,
							onChange: (e) => setDefaultRaw(e.target.value)
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "mt-1 font-mono text-xs min-h-24",
							value: defaultRaw,
							onChange: (e) => setDefaultRaw(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "mt-1",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "What does this flag control?"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: onClose,
					disabled: saving,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: submit,
					disabled: saving || !key,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }), " Create"]
				})] })
			]
		})
	});
}
export { RemoteConfigPage as component };
