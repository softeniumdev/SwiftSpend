import { o as __toESM } from "../_runtime.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BdJfjbEJ.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DJmpbwhv.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { t as Switch } from "./switch-gZVh-YP4.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-lDcqPMk8.mjs";
import { n as useDateRange, t as DateRangePicker } from "./useDateRange-ClgwuHQG.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { n as exportExcel, r as exportPDF, t as exportCSV } from "./export-B050p1Wk.mjs";
import { i as formatDateTime } from "./format-D3NUXAym.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-pLK6MnOG.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as Plus, Ft as CalendarClock, I as Play, Q as LoaderCircle, R as Pencil, ct as FileText, h as Trash2, lt as FileSpreadsheet, pt as Download } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/reports-B8E8kdIg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REPORTS = [
	{
		type: "revenue",
		label: "Revenue",
		description: "All transactions with amount, provider, and status.",
		supports: {
			status: true,
			statusOptions: [
				"succeeded",
				"failed",
				"refunded",
				"pending"
			]
		}
	},
	{
		type: "users",
		label: "Users",
		description: "Registered profiles with country, platform, and status.",
		supports: {
			country: true,
			platform: true,
			status: true,
			statusOptions: [
				"active",
				"suspended",
				"banned",
				"deleted"
			]
		}
	},
	{
		type: "subscriptions",
		label: "Subscriptions",
		description: "Active, canceled, and trial subscriptions by plan.",
		supports: {
			plan: true,
			status: true,
			statusOptions: [
				"active",
				"trialing",
				"canceled",
				"past_due",
				"paused"
			]
		}
	},
	{
		type: "advertising",
		label: "Advertising",
		description: "Ad campaign performance — impressions, clicks, revenue.",
		supports: {
			status: true,
			statusOptions: [
				"running",
				"paused",
				"ended"
			]
		}
	},
	{
		type: "support",
		label: "Support",
		description: "Help desk tickets by status, priority, and category.",
		supports: {
			status: true,
			statusOptions: [
				"open",
				"pending",
				"solved",
				"closed"
			]
		}
	},
	{
		type: "moderation",
		label: "Moderation",
		description: "Reports, decisions, severity, and resolution time.",
		supports: {
			country: true,
			status: true,
			statusOptions: [
				"pending",
				"reviewing",
				"resolved",
				"dismissed"
			]
		}
	},
	{
		type: "audit-logs",
		label: "Audit Logs",
		description: "Immutable trail of admin actions.",
		supports: {}
	}
];
function getReportDef(type) {
	return REPORTS.find((r) => r.type === type);
}
var iso = (d) => d.toISOString();
async function fetchReportRows(type, f, limit = 5e3) {
	switch (type) {
		case "revenue": {
			let q = supabase.from("transactions").select("id, created_at, user_id, type, amount_cents, currency, status, provider, description").gte("created_at", iso(f.from)).lte("created_at", iso(f.to)).order("created_at", { ascending: false }).limit(limit);
			if (f.status) q = q.eq("status", f.status);
			const { data, error } = await q;
			if (error) throw error;
			return (data ?? []).map((r) => ({
				id: r.id,
				date: r.created_at,
				user_id: r.user_id,
				type: r.type,
				amount: (r.amount_cents ?? 0) / 100,
				currency: r.currency,
				status: r.status,
				provider: r.provider,
				description: r.description
			}));
		}
		case "users": {
			let q = supabase.from("profiles").select("id, email, full_name, country, platform, status, created_at, last_seen_at").gte("created_at", iso(f.from)).lte("created_at", iso(f.to)).order("created_at", { ascending: false }).limit(limit);
			if (f.country) q = q.eq("country", f.country);
			if (f.platform) q = q.eq("platform", f.platform);
			if (f.status) q = q.eq("status", f.status);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		}
		case "subscriptions": {
			let q = supabase.from("subscriptions").select("id, user_id, plan, status, amount_cents, currency, interval, started_at, renews_at, canceled_at").gte("started_at", iso(f.from)).lte("started_at", iso(f.to)).order("started_at", { ascending: false }).limit(limit);
			if (f.plan) q = q.eq("plan", f.plan);
			if (f.status) q = q.eq("status", f.status);
			const { data, error } = await q;
			if (error) throw error;
			return (data ?? []).map((r) => ({
				...r,
				amount: (r.amount_cents ?? 0) / 100
			}));
		}
		case "advertising": {
			let q = supabase.from("ad_campaigns").select("id, name, advertiser, status, impressions, clicks, budget_cents, start_date, end_date").order("start_date", { ascending: false }).limit(limit);
			if (f.status) q = q.eq("status", f.status);
			const { data, error } = await q;
			if (error) throw error;
			return (data ?? []).map((r) => ({
				id: r.id,
				name: r.name,
				advertiser: r.advertiser,
				network: "all",
				status: r.status,
				impressions: r.impressions,
				clicks: r.clicks,
				ctr: r.impressions ? +(r.clicks / r.impressions * 100).toFixed(2) : 0,
				revenue: (r.revenue_cents ?? r.budget_cents ?? 0) / 100,
				start_date: r.start_date,
				end_date: r.end_date
			}));
		}
		case "support": {
			let q = supabase.from("support_tickets").select("id, user_id, subject, priority, status, category, assigned_to, created_at, resolved_at").gte("created_at", iso(f.from)).lte("created_at", iso(f.to)).order("created_at", { ascending: false }).limit(limit);
			if (f.status) q = q.eq("status", f.status);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		}
		case "moderation": {
			let q = supabase.from("moderation_reports").select("id, target_type, target_id, reason, status, severity, country, action_taken, reporter_id, resolved_by, created_at, resolved_at").gte("created_at", iso(f.from)).lte("created_at", iso(f.to)).order("created_at", { ascending: false }).limit(limit);
			if (f.country) q = q.eq("country", f.country);
			if (f.status) q = q.eq("status", f.status);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		}
		case "audit-logs": {
			const { data, error } = await supabase.from("audit_logs").select("id, created_at, actor_id, actor_email, action, resource_type, resource_id, ip_address").gte("created_at", iso(f.from)).lte("created_at", iso(f.to)).order("created_at", { ascending: false }).limit(limit);
			if (error) throw error;
			return data ?? [];
		}
	}
}
function nextRunAt(frequency, from = /* @__PURE__ */ new Date()) {
	const d = new Date(from);
	d.setUTCHours(6, 0, 0, 0);
	if (d <= from) d.setUTCDate(d.getUTCDate() + 1);
	if (frequency === "daily") return d;
	if (frequency === "weekly") {
		const daysUntilMonday = (8 - d.getUTCDay()) % 7 || 7;
		d.setUTCDate(d.getUTCDate() + daysUntilMonday - 1);
		return d;
	}
	return new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth() + 1, 1, 6));
}
function ScheduleDialog({ open, onOpenChange, onSaved, initial, defaultType }) {
	const [name, setName] = (0, import_react.useState)("");
	const [reportType, setReportType] = (0, import_react.useState)(defaultType ?? "revenue");
	const [frequency, setFrequency] = (0, import_react.useState)("weekly");
	const [format, setFormat] = (0, import_react.useState)("csv");
	const [recipients, setRecipients] = (0, import_react.useState)("");
	const [enabled, setEnabled] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		if (initial) {
			setName(initial.name);
			setReportType(initial.report_type);
			setFrequency(initial.frequency);
			setFormat(initial.format);
			setRecipients(initial.recipients.join(", "));
			setEnabled(initial.enabled);
		} else {
			setName("");
			setReportType(defaultType ?? "revenue");
			setFrequency("weekly");
			setFormat("csv");
			setRecipients("");
			setEnabled(true);
		}
	}, [
		open,
		initial,
		defaultType
	]);
	const save = async () => {
		const emails = recipients.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
		if (!name.trim()) return toast.error("Name is required");
		if (!emails.length) return toast.error("At least one recipient email is required");
		const bad = emails.find((e) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
		if (bad) return toast.error(`Invalid email: ${bad}`);
		setSaving(true);
		try {
			const payload = {
				name: name.trim(),
				report_type: reportType,
				frequency,
				format,
				recipients: emails,
				enabled,
				next_run_at: nextRunAt(frequency).toISOString()
			};
			if (initial) {
				const { error } = await supabase.from("scheduled_reports").update(payload).eq("id", initial.id);
				if (error) throw error;
				await logAudit({
					action: "scheduled_report.update",
					resource_type: "scheduled_report",
					resource_id: initial.id,
					after: payload
				});
				toast.success("Schedule updated");
			} else {
				const { data: sess } = await supabase.auth.getUser();
				const { data, error } = await supabase.from("scheduled_reports").insert({
					...payload,
					created_by: sess.user?.id ?? null
				}).select("id").single();
				if (error) throw error;
				await logAudit({
					action: "scheduled_report.create",
					resource_type: "scheduled_report",
					resource_id: data?.id,
					after: payload
				});
				toast.success("Schedule created");
			}
			onSaved();
			onOpenChange(false);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to save");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initial ? "Edit schedule" : "New scheduled report" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "sr-name",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "sr-name",
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: "Weekly revenue digest"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Report" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: reportType,
									onValueChange: (v) => setReportType(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: REPORTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: r.type,
										children: r.label
									}, r.type)) })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Frequency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: frequency,
									onValueChange: (v) => setFrequency(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "daily",
											children: "Daily"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "weekly",
											children: "Weekly"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "monthly",
											children: "Monthly"
										})
									] })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Format" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: format,
								onValueChange: (v) => setFormat(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "csv",
										children: "CSV"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "xlsx",
										children: "Excel (XLSX)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "pdf",
										children: "PDF"
									})
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sr-emails",
									children: "Recipients"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sr-emails",
									value: recipients,
									onChange: (e) => setRecipients(e.target.value),
									placeholder: "finance@company.com, ceo@company.com"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Comma-separated. Delivered by the scheduled worker on the chosen cadence."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-md border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "Enabled"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Turn off to pause delivery without deleting the schedule."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: enabled,
								onCheckedChange: setEnabled
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: save,
					disabled: saving,
					children: saving ? "Saving…" : initial ? "Save changes" : "Create schedule"
				})] })
			]
		})
	});
}
var PLAN_OPTIONS = [
	"free",
	"plus",
	"pro",
	"family",
	"lifetime"
];
var PLATFORM_OPTIONS = [
	"ios",
	"android",
	"web"
];
function ReportsPage() {
	const [tab, setTab] = (0, import_react.useState)("library");
	const [type, setType] = (0, import_react.useState)("revenue");
	const { range, setPreset, setCustom } = useDateRange("30d");
	const [country, setCountry] = (0, import_react.useState)("");
	const [plan, setPlan] = (0, import_react.useState)("all");
	const [platform, setPlatform] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const def = getReportDef(type);
	const filters = (0, import_react.useMemo)(() => ({
		from: range.from,
		to: range.to,
		country: country.trim() || void 0,
		plan: plan === "all" ? void 0 : plan,
		platform: platform === "all" ? void 0 : platform,
		status: status === "all" ? void 0 : status
	}), [
		range.from,
		range.to,
		country,
		plan,
		platform,
		status
	]);
	const rowsQ = useQuery({
		queryKey: [
			"report",
			type,
			filters
		],
		queryFn: () => fetchReportRows(type, filters),
		staleTime: 3e4
	});
	const rows = rowsQ.data ?? [];
	const filename = `${type}-${range.from.toISOString().slice(0, 10)}-to-${range.to.toISOString().slice(0, 10)}`;
	const doExport = async (fmt) => {
		if (!rows.length) return toast.info("No rows to export");
		try {
			if (fmt === "csv") exportCSV(filename, rows);
			else if (fmt === "xlsx") exportExcel(filename, rows, def.label);
			else exportPDF(filename, `${def.label} report`, rows);
			toast.success(`Exported ${rows.length} rows`);
			await logAudit({
				action: "report.export",
				resource_type: "report",
				resource_id: type,
				extra: {
					format: fmt,
					count: rows.length,
					filters
				}
			});
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Export failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Reports",
		description: "Ad-hoc exports and scheduled deliveries across every domain."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		value: tab,
		onValueChange: (v) => setTab(v),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: "library",
				children: "Report library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: "schedules",
				children: "Scheduled deliveries"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "library",
				className: "mt-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: REPORTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: type === r.type ? "default" : "outline",
							onClick: () => {
								setType(r.type);
								setStatus("all");
							},
							children: r.label
						}, r.type))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-end gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs text-muted-foreground",
									children: "Date range"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateRangePicker, {
										range,
										onPreset: setPreset,
										onCustom: setCustom
									})
								})] }),
								def.supports.country && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs text-muted-foreground",
										children: "Country (ISO)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "mt-1 h-9",
										placeholder: "US",
										value: country,
										onChange: (e) => setCountry(e.target.value.toUpperCase().slice(0, 2))
									})]
								}),
								def.supports.plan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
									label: "Plan",
									value: plan,
									onChange: setPlan,
									options: PLAN_OPTIONS
								}),
								def.supports.platform && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
									label: "Platform",
									value: platform,
									onChange: setPlatform,
									options: PLATFORM_OPTIONS
								}),
								def.supports.status && def.supports.statusOptions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
									label: "Status",
									value: status,
									onChange: setStatus,
									options: def.supports.statusOptions
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ml-auto flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											children: [
												rowsQ.isFetching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1 h-3 w-3 animate-spin" }) : null,
												rows.length,
												" row",
												rows.length === 1 ? "" : "s"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => doExport("csv"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-2 h-4 w-4" }), "CSV"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => doExport("xlsx"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "mr-2 h-4 w-4" }), "Excel"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => doExport("pdf"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), "PDF"]
										})
									]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-semibold",
								children: [def.label, " preview"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: def.description
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportPreview, {
							rows,
							loading: rowsQ.isLoading
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "schedules",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchedulesTab, {})
			})
		]
	})] });
}
function FilterSelect({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value,
			onValueChange: onChange,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				className: "mt-1 h-9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: "all",
				children: "All"
			}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: o,
				children: o
			}, o))] })]
		})]
	});
}
function ReportPreview({ rows, loading }) {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center p-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" })
	});
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10 text-center text-sm text-muted-foreground",
		children: "No rows match these filters."
	});
	const headers = Object.keys(rows[0]);
	const preview = rows.slice(0, 50);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-h-[520px] overflow-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
			className: "sticky top-0 bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "whitespace-nowrap text-xs",
				children: h
			}, h)) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: preview.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "max-w-[240px] truncate text-xs",
			children: formatCell(r[h])
		}, h)) }, i)) })] }), rows.length > preview.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t p-3 text-center text-xs text-muted-foreground",
			children: [
				"Showing first ",
				preview.length,
				" of ",
				rows.length,
				". Export to see everything."
			]
		})]
	});
}
function formatCell(v) {
	if (v === null || v === void 0) return "—";
	if (typeof v === "object") return JSON.stringify(v);
	const s = String(v);
	if (/^\d{4}-\d{2}-\d{2}T/.test(s)) try {
		return formatDateTime(s);
	} catch {}
	return s;
}
function SchedulesTab() {
	const qc = useQueryClient();
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const schedulesQ = useQuery({
		queryKey: ["scheduled-reports"],
		queryFn: async () => {
			const { data, error } = await supabase.from("scheduled_reports").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const toggleEnabled = async (row, next) => {
		const { error } = await supabase.from("scheduled_reports").update({ enabled: next }).eq("id", row.id);
		if (error) return toast.error(error.message);
		await logAudit({
			action: "scheduled_report.toggle",
			resource_type: "scheduled_report",
			resource_id: row.id,
			before: { enabled: row.enabled },
			after: { enabled: next }
		});
		toast.success(next ? "Schedule enabled" : "Schedule paused");
		qc.invalidateQueries({ queryKey: ["scheduled-reports"] });
	};
	const runNow = async (row) => {
		try {
			const to = /* @__PURE__ */ new Date();
			const from = new Date(to);
			if (row.frequency === "daily") from.setUTCDate(from.getUTCDate() - 1);
			else if (row.frequency === "weekly") from.setUTCDate(from.getUTCDate() - 7);
			else from.setUTCMonth(from.getUTCMonth() - 1);
			const rows = await fetchReportRows(row.report_type, {
				from,
				to
			});
			if (!rows.length) toast.info("No rows for the current window");
			else {
				const name = `${row.name}-${to.toISOString().slice(0, 10)}`;
				if (row.format === "csv") exportCSV(name, rows);
				else if (row.format === "xlsx") exportExcel(name, rows, row.name);
				else exportPDF(name, row.name, rows);
				toast.success(`Downloaded ${rows.length} rows`);
			}
			await supabase.from("scheduled_reports").update({
				last_run_at: (/* @__PURE__ */ new Date()).toISOString(),
				next_run_at: nextRunAt(row.frequency).toISOString()
			}).eq("id", row.id);
			await logAudit({
				action: "scheduled_report.run_now",
				resource_type: "scheduled_report",
				resource_id: row.id,
				extra: { count: rows.length }
			});
			qc.invalidateQueries({ queryKey: ["scheduled-reports"] });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Run failed");
		}
	};
	const confirmDelete = async () => {
		if (!toDelete) return;
		const { error } = await supabase.from("scheduled_reports").delete().eq("id", toDelete.id);
		if (error) return toast.error(error.message);
		await logAudit({
			action: "scheduled_report.delete",
			resource_type: "scheduled_report",
			resource_id: toDelete.id,
			before: toDelete
		});
		toast.success("Schedule deleted");
		setToDelete(null);
		qc.invalidateQueries({ queryKey: ["scheduled-reports"] });
	};
	const list = schedulesQ.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2 border-b p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Scheduled deliveries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Daily, weekly, or monthly reports emailed to your team."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => {
						setEditing(null);
						setDialogOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "New schedule"]
				})]
			}),
			schedulesQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-center p-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" })
			}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-10 text-center text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "mx-auto mb-2 h-6 w-6 opacity-50" }), "No scheduled reports yet."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Report" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cadence" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Format" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Recipients" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Last run" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Next run" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Enabled" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: s.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: REPORTS.find((r) => r.type === s.report_type)?.label ?? s.report_type
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "capitalize",
					children: s.frequency
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "uppercase",
					children: s.format
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "max-w-[200px] truncate text-xs",
					children: s.recipients.join(", ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-xs",
					children: s.last_run_at ? formatDateTime(s.last_run_at) : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-xs",
					children: s.next_run_at ? formatDateTime(s.next_run_at) : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: s.enabled,
					onCheckedChange: (v) => void toggleEnabled(s, v)
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								title: "Run now",
								onClick: () => void runNow(s),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								title: "Edit",
								onClick: () => {
									setEditing(s);
									setDialogOpen(true);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								title: "Delete",
								onClick: () => setToDelete(s),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
							})
						]
					})
				})
			] }, s.id)) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduleDialog, {
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				onSaved: () => qc.invalidateQueries({ queryKey: ["scheduled-reports"] }),
				initial: editing
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!toDelete,
				onOpenChange: (o) => !o && setToDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete schedule?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
					"\"",
					toDelete?.name,
					"\" will stop delivering. This can't be undone."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => void confirmDelete(),
					children: "Delete"
				})] })] })
			})
		]
	});
}
export { ReportsPage as component };
