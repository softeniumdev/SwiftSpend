import { o as __toESM } from "../_runtime.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Textarea } from "./textarea-DvN15-gJ.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { t as Checkbox } from "./checkbox-D7fL-acd.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BdJfjbEJ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-pLK6MnOG.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-lDcqPMk8.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as StatCard } from "./StatCard-CVanclUU.mjs";
import { t as StatusBadge } from "./StatusBadge-DZp6xNSP.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DJmpbwhv.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { i as formatDateTime } from "./format-D3NUXAym.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { t as useRealtimeInvalidate } from "./useRealtimeInvalidate-Bt8_dkae.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as ShieldCheck, D as Search, Ot as Check, Rt as Ban, c as UserX, h as Trash2, n as X, p as TriangleAlert, w as ShieldAlert, x as ShieldX } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/moderation-BmsIDIg3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACTIONS = [
	{
		key: "approve",
		label: "Approve",
		icon: Check,
		variant: "default",
		status: "resolved",
		description: "Mark content as safe and close this report."
	},
	{
		key: "reject",
		label: "Reject report",
		icon: X,
		variant: "outline",
		status: "dismissed",
		description: "Dismiss the report as invalid or duplicate."
	},
	{
		key: "warn",
		label: "Warn user",
		icon: TriangleAlert,
		variant: "secondary",
		status: "resolved",
		description: "Issue a formal warning to the reported user."
	},
	{
		key: "delete",
		label: "Delete content",
		icon: Trash2,
		variant: "destructive",
		status: "resolved",
		description: "Remove the reported content from the platform."
	},
	{
		key: "suspend",
		label: "Suspend user",
		icon: UserX,
		variant: "destructive",
		status: "resolved",
		description: "Temporarily suspend the reported user's account."
	},
	{
		key: "ban",
		label: "Ban user",
		icon: Ban,
		variant: "destructive",
		status: "resolved",
		description: "Permanently ban the reported user."
	}
];
function ModerationPage() {
	const qc = useQueryClient();
	useRealtimeInvalidate(["moderation_reports"], ["moderation-reports"]);
	const query = useQuery({
		queryKey: ["moderation-reports"],
		queryFn: async () => {
			const { data, error } = await supabase.from("moderation_reports").select("*").order("created_at", { ascending: false }).limit(500);
			if (error) throw error;
			return data ?? [];
		}
	});
	const rows = query.data ?? [];
	const [tab, setTab] = (0, import_react.useState)("pending");
	const [severity, setSeverity] = (0, import_react.useState)("all");
	const [reason, setReason] = (0, import_react.useState)("all");
	const [country, setCountry] = (0, import_react.useState)("all");
	const [reporter, setReporter] = (0, import_react.useState)("");
	const [dateRange, setDateRange] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const reasons = (0, import_react.useMemo)(() => Array.from(new Set(rows.map((r) => r.reason).filter(Boolean))).sort(), [rows]);
	const countries = (0, import_react.useMemo)(() => Array.from(new Set(rows.map((r) => r.country).filter(Boolean))).sort(), [rows]);
	const now = Date.now();
	const withinRange = (iso) => {
		if (dateRange === "all") return true;
		const t = new Date(iso).getTime();
		const days = {
			"1": 1,
			"7": 7,
			"30": 30,
			"90": 90
		}[dateRange] ?? 0;
		return now - t <= days * 864e5;
	};
	const filtered = rows.filter((r) => {
		if (tab === "pending" && r.status !== "open") return false;
		if (tab === "queue" && !(r.status === "open" || r.status === "reviewing")) return false;
		if (tab === "resolved" && !(r.status === "resolved" || r.status === "dismissed")) return false;
		if (severity !== "all" && r.severity !== severity) return false;
		if (reason !== "all" && r.reason !== reason) return false;
		if (country !== "all" && r.country !== country) return false;
		if (reporter && !(r.reporter_id ?? "").toLowerCase().includes(reporter.toLowerCase())) return false;
		if (!withinRange(r.created_at)) return false;
		if (search) {
			const s = search.toLowerCase();
			if (!r.reason.toLowerCase().includes(s) && !(r.details ?? "").toLowerCase().includes(s) && !(r.target_id ?? "").toLowerCase().includes(s)) return false;
		}
		return true;
	});
	const open = rows.filter((r) => r.status === "open").length;
	const reviewing = rows.filter((r) => r.status === "reviewing").length;
	const resolved = rows.filter((r) => r.status === "resolved").length;
	const critical = rows.filter((r) => r.severity === "critical" && r.status === "open").length;
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const toggle = (id) => setSelected((s) => {
		const n = new Set(s);
		n.has(id) ? n.delete(id) : n.add(id);
		return n;
	});
	const toggleAll = (checked) => setSelected(checked ? new Set(filtered.map((r) => r.id)) : /* @__PURE__ */ new Set());
	const [actionState, setActionState] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [claimOpen, setClaimOpen] = (0, import_react.useState)(null);
	const [notesFor, setNotesFor] = (0, import_react.useState)(null);
	const [notesDraft, setNotesDraft] = (0, import_react.useState)("");
	const runAction = async (action, ids, noteText) => {
		const spec = ACTIONS.find((a) => a.key === action);
		const { data: userRes } = await supabase.auth.getUser();
		const uid = userRes.user?.id ?? null;
		const targets = rows.filter((r) => ids.includes(r.id));
		const { error } = await supabase.from("moderation_reports").update({
			status: spec.status,
			action_taken: action,
			moderator_notes: noteText || null,
			resolved_by: uid,
			resolved_at: (/* @__PURE__ */ new Date()).toISOString()
		}).in("id", ids);
		if (error) {
			toast.error(error.message);
			return;
		}
		await Promise.all(targets.map((r) => logAudit({
			action: `moderation.${action}`,
			resource_type: "moderation_report",
			resource_id: r.id,
			affected_user: r.target_id,
			before: {
				status: r.status,
				action_taken: r.action_taken
			},
			after: {
				status: spec.status,
				action_taken: action
			},
			extra: {
				target_type: r.target_type,
				severity: r.severity,
				reason: r.reason,
				notes: noteText || null
			}
		})));
		toast.success(ids.length === 1 ? `${spec.label} — report closed` : `${spec.label} — ${ids.length} reports closed`);
		setSelected(/* @__PURE__ */ new Set());
		setActionState(null);
		setNotes("");
		qc.invalidateQueries({ queryKey: ["moderation-reports"] });
	};
	const claim = async (r) => {
		const { data: userRes } = await supabase.auth.getUser();
		const uid = userRes.user?.id ?? null;
		const { error } = await supabase.from("moderation_reports").update({
			status: "reviewing",
			resolved_by: uid
		}).eq("id", r.id);
		if (error) return toast.error(error.message);
		await logAudit({
			action: "moderation.claim",
			resource_type: "moderation_report",
			resource_id: r.id,
			before: { status: r.status },
			after: { status: "reviewing" }
		});
		toast.success("Report claimed for review");
		setClaimOpen(null);
		qc.invalidateQueries({ queryKey: ["moderation-reports"] });
	};
	const saveNotes = async () => {
		if (!notesFor) return;
		const { error } = await supabase.from("moderation_reports").update({ moderator_notes: notesDraft || null }).eq("id", notesFor.id);
		if (error) return toast.error(error.message);
		await logAudit({
			action: "moderation.notes_updated",
			resource_type: "moderation_report",
			resource_id: notesFor.id,
			before: { notes: notesFor.moderator_notes },
			after: { notes: notesDraft }
		});
		toast.success("Notes saved");
		setNotesFor(null);
		setNotesDraft("");
		qc.invalidateQueries({ queryKey: ["moderation-reports"] });
	};
	const spec = actionState ? ACTIONS.find((a) => a.key === actionState.action) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Moderation",
			description: "Triage reports across users and content. Every decision is audit-logged."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pending review",
					value: String(open),
					icon: ShieldAlert
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "In review",
					value: String(reviewing),
					icon: ShieldCheck
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Resolved",
					value: String(resolved),
					icon: ShieldCheck
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Critical open",
					value: String(critical),
					icon: ShieldX
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: (v) => setTab(v),
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "pending",
					children: "Pending review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "queue",
					children: "Approval queue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "resolved",
					children: "Resolved"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "all",
					children: "All"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: tab,
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 grid gap-3 md:grid-cols-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Search reason, details, target id…",
										className: "pl-8",
										value: search,
										onChange: (e) => setSearch(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: severity,
									onValueChange: setSeverity,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Severity" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "all",
											children: "All severities"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "low",
											children: "Low"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "medium",
											children: "Medium"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "high",
											children: "High"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "critical",
											children: "Critical"
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: reason,
									onValueChange: setReason,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Reason" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "all",
										children: "All reasons"
									}), reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: r,
										children: r
									}, r))] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: country,
									onValueChange: setCountry,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Country" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "all",
										children: "All countries"
									}), countries.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: c,
										children: c
									}, c))] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: dateRange,
									onValueChange: setDateRange,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Date" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "all",
											children: "All time"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "1",
											children: "Last 24h"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "7",
											children: "Last 7 days"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "30",
											children: "Last 30 days"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "90",
											children: "Last 90 days"
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Reporter id…",
									value: reporter,
									onChange: (e) => setReporter(e.target.value),
									className: "md:col-span-2"
								})
							]
						}),
						selected.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex flex-wrap items-center gap-2 rounded-md border bg-muted/40 p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-medium",
									children: [selected.size, " selected"]
								}),
								ACTIONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: a.variant,
									onClick: () => setActionState({
										action: a.key,
										ids: Array.from(selected)
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "mr-1 h-3.5 w-3.5" }), a.label]
								}, a.key)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => setSelected(/* @__PURE__ */ new Set()),
									children: "Clear"
								})
							]
						}),
						query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: ShieldAlert,
							title: "Nothing to review",
							description: "No reports match the current filters."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "w-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: selected.size > 0 && selected.size === filtered.length,
									onCheckedChange: (v) => toggleAll(v === true)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Target" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Reason" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Severity" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Country" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Reporter" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Reported" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Actions"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: selected.has(r.id),
								onCheckedChange: () => toggle(r.id)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "capitalize",
								children: r.target_type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs text-muted-foreground",
								children: r.target_id?.slice(0, 8) ?? "—"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "max-w-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: r.reason
									}),
									r.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: r.details
									}),
									r.moderator_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 truncate text-xs italic text-info",
										children: ["note: ", r.moderator_notes]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.severity }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-sm text-muted-foreground",
								children: r.country ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-mono text-xs text-muted-foreground",
								children: r.reporter_id?.slice(0, 8) ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-sm text-muted-foreground",
								children: formatDateTime(r.created_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap justify-end gap-1",
									children: [
										r.status === "open" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => setClaimOpen(r),
											children: "Claim"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => {
												setNotesFor(r);
												setNotesDraft(r.moderator_notes ?? "");
											},
											children: "Notes"
										}),
										(r.status === "open" || r.status === "reviewing") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											onClick: () => setActionState({
												action: "approve",
												ids: [r.id]
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 h-3.5 w-3.5" }), "Approve"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "destructive",
											onClick: () => setActionState({
												action: "delete",
												ids: [r.id]
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 h-3.5 w-3.5" }), "Delete"]
										})] })
									]
								})
							})
						] }, r.id)) })] })
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!actionState,
			onOpenChange: (o) => !o && setActionState(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
					spec?.label,
					" · ",
					actionState?.ids.length ?? 0,
					" report",
					(actionState?.ids.length ?? 0) === 1 ? "" : "s"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: spec?.description })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "mod-notes",
						children: "Moderator notes (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "mod-notes",
						rows: 3,
						placeholder: "Context for the audit log…",
						value: notes,
						onChange: (e) => setNotes(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogAction, {
					onClick: () => actionState && runAction(actionState.action, actionState.ids, notes),
					className: spec?.variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "",
					children: ["Confirm ", spec?.label]
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!claimOpen,
			onOpenChange: (o) => !o && setClaimOpen(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Claim this report?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "You'll be marked as the reviewer and the status moves to \"in review\"." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => claimOpen && claim(claimOpen),
				children: "Claim"
			})] })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!notesFor,
			onOpenChange: (o) => !o && setNotesFor(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Moderator notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Private notes attached to this report. Saved to the audit trail." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 5,
					value: notesDraft,
					onChange: (e) => setNotesDraft(e.target.value),
					placeholder: "What did you find? Context, prior offenses, decisions…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setNotesFor(null),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: saveNotes,
					children: "Save notes"
				})] })
			] })
		})
	] });
}
export { ModerationPage as component };
