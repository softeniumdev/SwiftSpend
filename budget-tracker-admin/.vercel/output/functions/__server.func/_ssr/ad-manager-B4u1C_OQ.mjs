import { o as __toESM } from "../_runtime.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Textarea } from "./textarea-DvN15-gJ.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BdJfjbEJ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-pLK6MnOG.mjs";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-DoXW0ikn.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as StatCard } from "./StatCard-CVanclUU.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as StatusBadge } from "./StatusBadge-DZp6xNSP.mjs";
import { t as UserActionDialog } from "./UserActionDialog-DCsJz8n7.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { t as useRealtimeInvalidate } from "./useRealtimeInvalidate-Bt8_dkae.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Pause, F as Plus, I as Play, R as Pencil, W as MonitorSmartphone, _t as Copy, et as LayoutPanelTop, ft as Ellipsis, h as Trash2, p as TriangleAlert, q as Maximize2 } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
// node_modules/.nitro/vite/services/ssr/assets/ad-manager-B4u1C_OQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var Alert = import_react.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	role: "alert",
	className: cn(alertVariants({ variant }), className),
	...props
}));
Alert.displayName = "Alert";
var AlertTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
	ref,
	className: cn("mb-1 font-medium leading-none tracking-tight", className),
	...props
}));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm [&_p]:leading-relaxed", className),
	...props
}));
AlertDescription.displayName = "AlertDescription";
var KEY = ["ad_placements"];
var SCREENS = [
	"home",
	"transactions",
	"budgets",
	"reports",
	"settings"
];
var TRIGGERS = {
	always: "Always show",
	screens: "Show on specific screens",
	after_transactions: "After X transactions",
	app_open: "On app open",
	after_login: "After login",
	custom_frequency: "Custom frequency (every X minutes)"
};
var BANNER_TRIGGERS = ["always", "screens"];
var INTERSTITIAL_TRIGGERS = [
	"after_transactions",
	"app_open",
	"after_login",
	"custom_frequency"
];
/** Status shown to admins: active ads with a future start date are "scheduled". */
function effectiveStatus(r) {
	if (r.status === "active" && r.start_date && r.start_date > (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) return "scheduled";
	return r.status;
}
/** Interstitials that fire this often hurt user experience. */
function isHighFrequency(r) {
	if (r.format !== "interstitial") return false;
	if (r.trigger_type === "after_transactions") return (r.trigger_value ?? 0) < 3;
	if (r.trigger_type === "custom_frequency") return (r.trigger_value ?? 0) < 5;
	return r.trigger_type === "app_open";
}
function describeTrigger(r) {
	switch (r.trigger_type) {
		case "after_transactions": return `After every ${r.trigger_value ?? "?"} transactions`;
		case "custom_frequency": return `Every ${r.trigger_value ?? "?"} minutes`;
		case "screens": return `On: ${r.screens.join(", ") || "no screens"}`;
		default: return TRIGGERS[r.trigger_type] ?? r.trigger_type;
	}
}
var EMPTY = {
	name: "",
	format: "banner",
	status: "paused",
	target: "free_users",
	trigger_type: "always",
	trigger_value: null,
	screens: [],
	start_date: null,
	end_date: null,
	notes: null
};
function AdManagerPage() {
	const qc = useQueryClient();
	useRealtimeInvalidate(["ad_placements"], KEY);
	const [fmt, setFmt] = (0, import_react.useState)("all");
	const [st, setSt] = (0, import_react.useState)("all");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const q = useQuery({
		queryKey: KEY,
		queryFn: async () => {
			const { data, error } = await supabase.from("ad_placements").select("*").order("updated_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	const rows = q.data ?? [];
	const filtered = (0, import_react.useMemo)(() => rows.filter((r) => (fmt === "all" || r.format === fmt) && (st === "all" || effectiveStatus(r) === st)), [
		rows,
		fmt,
		st
	]);
	const active = rows.filter((r) => r.status === "active");
	const save = useMutation({
		mutationFn: async (v) => {
			const { id, ...payload } = v;
			if (id) {
				const before = rows.find((r) => r.id === id);
				const { error } = await supabase.from("ad_placements").update(payload).eq("id", id);
				if (error) throw error;
				await logAudit({
					action: "ad.update",
					resource_type: "ad_placement",
					resource_id: id,
					before,
					after: payload
				});
			} else {
				const { data: u } = await supabase.auth.getUser();
				const autoCode = payload.code || payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 40) + "_" + Math.random().toString(36).slice(2, 7);
				const { data, error } = await supabase.from("ad_placements").insert({
					...payload,
					code: autoCode,
					platform: payload.platform || "all",
					ad_type: payload.ad_type || payload.format || "banner",
					created_by: u.user?.id
				}).select("id").single();
				if (error) throw error;
				await logAudit({
					action: "ad.create",
					resource_type: "ad_placement",
					resource_id: data.id,
					after: payload
				});
			}
		},
		onSuccess: () => {
			toast.success("Ad saved");
			setEditing(null);
			qc.invalidateQueries({ queryKey: KEY });
		},
		onError: (e) => toast.error(e.message)
	});
	const setStatus = async (r, status) => {
		const { error } = await supabase.from("ad_placements").update({ status }).eq("id", r.id);
		if (error) return void toast.error(error.message);
		await logAudit({
			action: status === "active" ? "ad.activate" : "ad.pause",
			resource_type: "ad_placement",
			resource_id: r.id,
			before: { status: r.status },
			after: { status }
		});
		toast.success(status === "active" ? "Ad activated" : "Ad paused");
		qc.invalidateQueries({ queryKey: KEY });
	};
	const remove = async (r) => {
		const { error } = await supabase.from("ad_placements").delete().eq("id", r.id);
		if (error) return void toast.error(error.message);
		await logAudit({
			action: "ad.delete",
			resource_type: "ad_placement",
			resource_id: r.id,
			before: r
		});
		toast.success("Ad deleted");
		qc.invalidateQueries({ queryKey: KEY });
	};
	const duplicate = (r) => {
		const { id: _i, created_at: _c, updated_at: _u, created_by: _b, ...rest } = r;
		save.mutate({
			...rest,
			name: `${r.name} (copy)`,
			status: "paused"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Advertisement Manager",
				description: "Control every ad shown to free users in the mobile app. Changes go live instantly.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setEditing({ ...EMPTY }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), "New ad"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total active ads",
						value: String(active.length),
						icon: MonitorSmartphone,
						loading: q.isLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Banner ads",
						value: String(rows.filter((r) => r.format === "banner").length),
						icon: LayoutPanelTop,
						loading: q.isLoading,
						hint: `${active.filter((r) => r.format === "banner").length} active`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Interstitial ads",
						value: String(rows.filter((r) => r.format === "interstitial").length),
						icon: Maximize2,
						loading: q.isLoading,
						hint: `${active.filter((r) => r.format === "interstitial").length} active`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: fmt,
						onValueChange: setFmt,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-44",
							"aria-label": "Filter by format",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All formats"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "banner",
								children: "Banner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "interstitial",
								children: "Interstitial"
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: st,
						onValueChange: setSt,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-44",
							"aria-label": "Filter by status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All statuses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "active",
								children: "Active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "paused",
								children: "Paused"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "scheduled",
								children: "Scheduled"
							})
						] })]
					})]
				}), q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, { cols: 7 }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: MonitorSmartphone,
					title: "No ads yet",
					description: "Create your first banner or interstitial ad to start showing it in the app.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => setEditing({ ...EMPTY }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), "New ad"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Format" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Audience" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Trigger" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Updated" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Actions"
							})
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [r.name, isHighFrequency(r) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
									className: "h-4 w-4 text-warning",
									"aria-label": "High frequency"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormatBadge, { format: r.format }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: effectiveStatus(r) }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-sm text-muted-foreground",
							children: r.target === "free_users" ? "All free users" : r.target
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-sm",
							children: describeTrigger(r)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-sm text-muted-foreground",
							children: new Date(r.updated_at).toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Ad actions",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => setEditing({ ...r }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-2 h-4 w-4" }), "Edit"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: () => setConfirm({
										kind: "toggle",
										row: r
									}),
									children: r.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "mr-2 h-4 w-4" }), "Pause"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-2 h-4 w-4" }), "Activate"] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => duplicate(r),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-2 h-4 w-4" }), "Duplicate"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									className: "text-destructive",
									onClick: () => setConfirm({
										kind: "delete",
										row: r
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"]
								})
							]
						})] }) })
					] }, r.id)) })] })
				})]
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdDialog, {
				value: editing,
				saving: save.isPending,
				onCancel: () => setEditing(null),
				onSave: (v) => save.mutate(v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserActionDialog, {
				open: !!confirm,
				onOpenChange: (o) => !o && setConfirm(null),
				destructive: confirm?.kind === "delete",
				title: confirm?.kind === "delete" ? "Delete this ad?" : confirm?.row.status === "active" ? "Pause this ad?" : "Activate this ad?",
				confirmLabel: confirm?.kind === "delete" ? "Delete" : confirm?.row.status === "active" ? "Pause" : "Activate",
				description: confirm?.kind === "delete" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"\"",
					confirm.row.name,
					"\" will be removed permanently and stop showing in the app."
				] }) : confirm && confirm.row.status !== "active" && isHighFrequency(confirm.row) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-warning",
					children: "This is a high-frequency interstitial. It may annoy users and hurt retention."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "This change takes effect in the app immediately." }),
				onConfirm: async () => {
					if (!confirm) return;
					if (confirm.kind === "delete") await remove(confirm.row);
					else await setStatus(confirm.row, confirm.row.status === "active" ? "paused" : "active");
				}
			})
		]
	});
}
function FormatBadge({ format }) {
	const banner = format === "banner";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: "outline",
		className: cn("gap-1", banner ? "border-info/30 bg-info/10 text-info" : "border-primary/30 bg-primary/10 text-primary"),
		children: [banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutPanelTop, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-3 w-3" }), banner ? "Banner · bottom" : "Interstitial"]
	});
}
function AdDialog({ value, saving, onCancel, onSave }) {
	const [v, setV] = (0, import_react.useState)(value);
	const set = (p) => setV((s) => ({
		...s,
		...p
	}));
	const triggers = v.format === "banner" ? BANNER_TRIGGERS : INTERSTITIAL_TRIGGERS;
	const needsValue = v.trigger_type === "after_transactions" || v.trigger_type === "custom_frequency";
	const high = isHighFrequency({
		format: v.format ?? "banner",
		trigger_type: v.trigger_type ?? "always",
		trigger_value: v.trigger_value ?? null
	});
	const dateErr = v.start_date && v.end_date && v.end_date < v.start_date;
	const valid = v.name.trim() && !dateErr && (!needsValue || (v.trigger_value ?? 0) > 0) && (v.trigger_type !== "screens" || (v.screens?.length ?? 0) > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (o) => !o && onCancel(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: v.id ? "Edit ad" : "New ad" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ad-name",
								children: "Ad name (internal)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ad-name",
								value: v.name,
								onChange: (e) => set({ name: e.target.value }),
								placeholder: "e.g. Home banner – Q4"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Format" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: v.format,
									onValueChange: (f) => set({
										format: f,
										trigger_type: f === "banner" ? "always" : "after_transactions",
										trigger_value: f === "banner" ? null : 3
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "banner",
										children: "Banner (fixed bottom)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "interstitial",
										children: "Interstitial / Pop-up"
									})] })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: v.status,
									onValueChange: (s) => set({ status: s }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "active",
										children: "Active"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "paused",
										children: "Paused"
									})] })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Target" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: v.target,
								onValueChange: (t) => set({ target: t }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "free_users",
									children: "Free users only"
								}) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Trigger rule" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: v.trigger_type,
								onValueChange: (t) => set({ trigger_type: t }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: triggers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t,
									children: TRIGGERS[t]
								}, t)) })]
							})]
						}),
						needsValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ad-val",
								children: v.trigger_type === "after_transactions" ? "Number of transactions" : "Minutes between ads"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "ad-val",
								type: "number",
								min: 1,
								value: v.trigger_value ?? "",
								onChange: (e) => set({ trigger_value: e.target.value ? Number(e.target.value) : null })
							})]
						}),
						v.trigger_type === "screens" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Screens" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: SCREENS.map((s) => {
									const on = v.screens?.includes(s);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: on ? "default" : "outline",
										"aria-pressed": on,
										onClick: () => set({ screens: on ? v.screens.filter((x) => x !== s) : [...v.screens ?? [], s] }),
										className: "capitalize",
										children: s
									}, s);
								})
							})]
						}),
						high && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
							className: "border-warning/40 bg-warning/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: "High-frequency interstitial. Showing pop-ups this often can frustrate users and increase uninstalls." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ad-start",
									children: "Start date (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ad-start",
									type: "date",
									value: v.start_date ?? "",
									onChange: (e) => set({ start_date: e.target.value || null })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ad-end",
									children: "End date (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ad-end",
									type: "date",
									value: v.end_date ?? "",
									onChange: (e) => set({ end_date: e.target.value || null })
								})]
							})]
						}),
						dateErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							children: "End date must be after start date."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "ad-notes",
								children: "Notes (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "ad-notes",
								value: v.notes ?? "",
								onChange: (e) => set({ notes: e.target.value || null })
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onCancel,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !valid || saving,
					onClick: () => onSave({
						...v,
						trigger_value: needsValue ? v.trigger_value : null,
						screens: v.trigger_type === "screens" ? v.screens : []
					}),
					children: "Save"
				})] })
			]
		})
	});
}
export { AdManagerPage as component, effectiveStatus, isHighFrequency };
