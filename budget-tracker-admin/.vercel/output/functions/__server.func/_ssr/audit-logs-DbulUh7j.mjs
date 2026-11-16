import { o as __toESM } from "../_runtime.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BdJfjbEJ.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-pLK6MnOG.mjs";
import { t as ExportMenu } from "./ExportMenu-D2msg4iY.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { i as formatDateTime } from "./format-D3NUXAym.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { D as Search, O as ScrollText, dt as Eye, n as X } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/audit-logs-DbulUh7j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var readMeta = (m) => m && typeof m === "object" ? m : {};
function AuditLogsPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [admin, setAdmin] = (0, import_react.useState)("all");
	const [module, setModule] = (0, import_react.useState)("all");
	const [action, setAction] = (0, import_react.useState)("all");
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const [detail, setDetail] = (0, import_react.useState)(null);
	const query = useQuery({
		queryKey: ["audit-logs"],
		queryFn: async () => {
			const { data, error } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(2e3);
			if (error) throw error;
			return data ?? [];
		}
	});
	const rows = query.data ?? [];
	const admins = (0, import_react.useMemo)(() => Array.from(new Set(rows.map((r) => r.actor_email).filter(Boolean))).sort(), [rows]);
	const modules = (0, import_react.useMemo)(() => Array.from(new Set(rows.map((r) => r.resource_type))).sort(), [rows]);
	const actions = (0, import_react.useMemo)(() => Array.from(new Set(rows.map((r) => r.action))).sort(), [rows]);
	const filtered = (0, import_react.useMemo)(() => {
		const s = search.trim().toLowerCase();
		const fromMs = from ? new Date(from).getTime() : null;
		const toMs = to ? new Date(to).getTime() + 864e5 : null;
		return rows.filter((r) => {
			if (admin !== "all" && r.actor_email !== admin) return false;
			if (module !== "all" && r.resource_type !== module) return false;
			if (action !== "all" && r.action !== action) return false;
			const t = new Date(r.created_at).getTime();
			if (fromMs && t < fromMs) return false;
			if (toMs && t > toMs) return false;
			if (s) {
				const m = readMeta(r.metadata);
				if (![
					r.actor_email,
					r.action,
					r.resource_type,
					r.resource_id,
					r.ip_address,
					m.affected_user,
					m.browser,
					m.os,
					m.device
				].filter(Boolean).join(" ").toLowerCase().includes(s)) return false;
			}
			return true;
		});
	}, [
		rows,
		search,
		admin,
		module,
		action,
		from,
		to
	]);
	const exportRows = () => filtered.map((r) => {
		const m = readMeta(r.metadata);
		return {
			Timestamp: r.created_at,
			Admin: r.actor_email ?? "system",
			Action: r.action,
			Module: r.resource_type,
			"Resource ID": r.resource_id ?? "",
			"Affected User": m.affected_user ?? "",
			IP: r.ip_address ?? "",
			Browser: m.browser ?? "",
			Device: m.device ?? "",
			OS: m.os ?? "",
			Before: m.before ? JSON.stringify(m.before) : "",
			After: m.after ? JSON.stringify(m.after) : ""
		};
	});
	const activeFilterCount = (admin !== "all" ? 1 : 0) + (module !== "all" ? 1 : 0) + (action !== "all" ? 1 : 0) + (from ? 1 : 0) + (to ? 1 : 0) + (search ? 1 : 0);
	const clearAll = () => {
		setSearch("");
		setAdmin("all");
		setModule("all");
		setAction("all");
		setFrom("");
		setTo("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Audit Center",
			description: "Immutable record of every admin action across the platform.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
				filename: `audit-logs-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`,
				title: "Audit logs",
				rows: exportRows
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-4 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-1.5 block text-xs",
							children: "Search"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Admin, IP, resource, affected user…",
								className: "pl-8"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "mb-1.5 block text-xs",
						children: "Admin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: admin,
						onValueChange: setAdmin,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All admins"
						}), admins.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: a,
							children: a
						}, a))] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "mb-1.5 block text-xs",
						children: "Module"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: module,
						onValueChange: setModule,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All modules"
						}), modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: m,
							children: m
						}, m))] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "mb-1.5 block text-xs",
						children: "Action"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: action,
						onValueChange: setAction,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All actions"
						}), actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: a,
							children: a
						}, a))] })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2 md:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-1.5 block text-xs",
							children: "From"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: from,
							onChange: (e) => setFrom(e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "mb-1.5 block text-xs",
							children: "To"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: to,
							onChange: (e) => setTo(e.target.value)
						})] })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Showing ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: filtered.length
					}),
					" of ",
					rows.length,
					" entries",
					activeFilterCount > 0 && ` · ${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} active`
				] }), activeFilterCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: clearAll,
					className: "h-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-1 h-3.5 w-3.5" }), " Clear"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-0",
			children: query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {})
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: ScrollText,
				title: rows.length === 0 ? "No activity yet" : "No matches",
				description: rows.length === 0 ? "Every admin action creates an audit entry — none recorded so far." : "Adjust filters to see more entries."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Timestamp" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Admin" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Action" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Module" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Affected user" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "IP" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Browser" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Device" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "w-16 text-right",
						children: "Details"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((l) => {
					const m = readMeta(l.metadata);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap text-sm text-muted-foreground",
							children: formatDateTime(l.created_at)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-sm",
							children: l.actor_email ?? "system"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "font-mono text-xs",
							children: l.action
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs",
							children: l.resource_type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs text-muted-foreground",
							children: m.affected_user ? String(m.affected_user).slice(0, 8) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs text-muted-foreground",
							children: l.ip_address ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-xs",
							children: m.browser ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-xs capitalize",
							children: m.device ? `${m.device}${m.os ? ` · ${m.os}` : ""}` : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "h-7 w-7",
								onClick: () => setDetail(l),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
							})
						})
					] }, l.id);
				}) })] })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!detail,
			onOpenChange: (o) => !o && setDetail(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Audit entry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: detail && `${formatDateTime(detail.created_at)} · ${detail.actor_email ?? "system"}` })] }), detail && (() => {
					const m = readMeta(detail.metadata);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 text-sm md:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Action",
										value: detail.action
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Module",
										value: detail.resource_type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Resource ID",
										value: detail.resource_id ?? "—",
										mono: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Affected user",
										value: m.affected_user ?? "—",
										mono: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "IP",
										value: detail.ip_address ?? "—",
										mono: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Timezone",
										value: m.timezone ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Browser",
										value: m.browser ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "OS",
										value: m.os ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Device",
										value: m.device ?? "—"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffBlock, {
									title: "Before",
									value: m.before
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiffBlock, {
									title: "After",
									value: m.after
								})]
							}),
							m.user_agent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1 text-xs uppercase tracking-wide text-muted-foreground",
								children: "User agent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-md border bg-muted/40 p-2 font-mono text-xs break-all",
								children: String(m.user_agent)
							})] })
						]
					});
				})()]
			})
		})
	] });
}
function Field({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs uppercase tracking-wide text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: mono ? "font-mono text-xs" : "text-sm",
		children: value
	})] });
}
function DiffBlock({ title, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1 text-xs uppercase tracking-wide text-muted-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
		className: "max-h-64 overflow-auto rounded-md border bg-muted/40 p-2 font-mono text-xs",
		children: value === null || value === void 0 ? "—" : JSON.stringify(value, null, 2)
	})] });
}
export { AuditLogsPage as component };
