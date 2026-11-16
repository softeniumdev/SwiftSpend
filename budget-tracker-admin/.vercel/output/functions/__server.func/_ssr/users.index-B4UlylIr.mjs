import { o as __toESM } from "../_runtime.mjs";
import { i as setUserStatus, n as impersonateUser, o as useServerFn, r as sendPasswordReset, t as deleteUser } from "./adminUsers.functions-Be7w9yLa.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Checkbox } from "./checkbox-D7fL-acd.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-Bp0QKi9c.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-DoXW0ikn.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BdJfjbEJ.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as StatusBadge } from "./StatusBadge-DZp6xNSP.mjs";
import { t as UserActionDialog } from "./UserActionDialog-DCsJz8n7.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { i as formatDateTime, o as initials, r as formatDate } from "./format-D3NUXAym.mjs";
import { n as toCSV, t as downloadCSV } from "./csv-C5d8Sirq.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as RotateCw, D as Search, J as Mail, Rt as Ban, S as ShieldOff, X as LogIn, dt as Eye, ft as Ellipsis, h as Trash2, nt as KeyRound, o as Users, ot as Funnel, pt as Download, y as Snowflake, z as PenLine } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/users.index-B4UlylIr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UsersPage() {
	const qc = useQueryClient();
	const [q, setQ] = (0, import_react.useState)("");
	const [country, setCountry] = (0, import_react.useState)("all");
	const [platform, setPlatform] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [plan, setPlan] = (0, import_react.useState)("all");
	const [dateRange, setDateRange] = (0, import_react.useState)("all");
	const [selected, setSelected] = (0, import_react.useState)({});
	const [pending, setPending] = (0, import_react.useState)(null);
	const [bulkEmailText, setBulkEmailText] = (0, import_react.useState)("");
	const list = useQuery({
		queryKey: ["admin-users"],
		queryFn: async () => {
			const { data: profiles, error } = await supabase.from("profiles").select("id,email,full_name,avatar_url,country,platform,status,created_at,last_seen_at,is_pro").order("created_at", { ascending: false }).limit(500);
			if (error) throw error;
			const ids = (profiles ?? []).map((p) => p.id);
			let subs = [];
			if (ids.length) {
				const { data: s } = await supabase.from("subscriptions").select("user_id,plan,status").in("user_id", ids);
				subs = s ?? [];
			}
			const byUser = new Map(subs.map((s) => [s.user_id, s]));
			return (profiles ?? []).map((p) => {
				const sub = byUser.get(p.id);
				const isPro = Boolean(p.is_pro || sub && sub.plan === "pro" && sub.status === "active");
				return {
					...p,
					plan: isPro ? "pro" : sub?.plan ?? "free",
					sub_status: isPro ? sub?.status ?? "active" : sub?.status ?? null
				};
			});
		}
	});
	const rows = list.data ?? [];
	const countries = (0, import_react.useMemo)(() => Array.from(new Set(rows.map((r) => r.country).filter(Boolean))).sort(), [rows]);
	const platforms = (0, import_react.useMemo)(() => Array.from(new Set(rows.map((r) => r.platform).filter(Boolean))).sort(), [rows]);
	const filtered = (0, import_react.useMemo)(() => {
		const now = Date.now();
		const rangeMs = dateRange === "7d" ? 6048e5 : dateRange === "30d" ? 2592e6 : dateRange === "90d" ? 7776e6 : dateRange === "1y" ? 31536e6 : 0;
		const search = q.trim().toLowerCase();
		return rows.filter((r) => {
			if (country !== "all" && r.country !== country) return false;
			if (platform !== "all" && r.platform !== platform) return false;
			if (status !== "all" && r.status !== status) return false;
			if (plan !== "all" && (r.plan ?? "free") !== plan) return false;
			if (rangeMs && now - new Date(r.created_at).getTime() > rangeMs) return false;
			if (search) {
				if (!`${r.email} ${r.full_name ?? ""} ${r.id} ${r.country ?? ""}`.toLowerCase().includes(search)) return false;
			}
			return true;
		});
	}, [
		rows,
		q,
		country,
		platform,
		status,
		plan,
		dateRange
	]);
	const allChecked = filtered.length > 0 && filtered.every((r) => selected[r.id]);
	const someChecked = filtered.some((r) => selected[r.id]);
	const selectedIds = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
	const selectedRows = filtered.filter((r) => selected[r.id]);
	const setStatusFn = useServerFn(setUserStatus);
	const resetFn = useServerFn(sendPasswordReset);
	const deleteFn = useServerFn(deleteUser);
	const impersonateFn = useServerFn(impersonateUser);
	const statusMut = useMutation({
		mutationFn: async (v) => setStatusFn({ data: v }),
		onSuccess: async (res, v) => {
			toast.success(`User ${v.status}`);
			await logAudit({
				action: `user.${v.status}`,
				resource_type: "user",
				resource_id: v.userId,
				affected_user: v.userId,
				before: res.before,
				after: res.after
			});
			qc.invalidateQueries({ queryKey: ["admin-users"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const resetMut = useMutation({
		mutationFn: async (email) => resetFn({ data: { email } }),
		onSuccess: async (_r, email) => {
			toast.success("Password reset link sent");
			await logAudit({
				action: "user.password_reset",
				resource_type: "user",
				affected_user: email
			});
		},
		onError: (e) => toast.error(e.message)
	});
	const deleteMut = useMutation({
		mutationFn: async (userId) => deleteFn({ data: { userId } }),
		onSuccess: async (_r, userId) => {
			toast.success("User deleted");
			await logAudit({
				action: "user.delete",
				resource_type: "user",
				resource_id: userId,
				affected_user: userId
			});
			qc.invalidateQueries({ queryKey: ["admin-users"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const impersonateMut = useMutation({
		mutationFn: async (email) => impersonateFn({ data: { email } }),
		onSuccess: async (res, email) => {
			if (res.actionLink) {
				await navigator.clipboard.writeText(res.actionLink).catch(() => {});
				toast.success("Impersonation link copied to clipboard");
			} else toast.success("Impersonation link generated");
			await logAudit({
				action: "user.impersonate",
				resource_type: "user",
				affected_user: email
			});
		},
		onError: (e) => toast.error(e.message)
	});
	const exportRows = (rowsToExport, name) => {
		downloadCSV(name, toCSV(rowsToExport));
		logAudit({
			action: "user.export",
			resource_type: "user",
			extra: { count: rowsToExport.length }
		});
	};
	const runPending = async () => {
		if (!pending) return;
		if ("id" in pending) switch (pending.kind) {
			case "freeze":
				await statusMut.mutateAsync({
					userId: pending.id,
					status: "frozen"
				});
				break;
			case "suspend":
				await statusMut.mutateAsync({
					userId: pending.id,
					status: "suspended"
				});
				break;
			case "block":
				await statusMut.mutateAsync({
					userId: pending.id,
					status: "blocked"
				});
				break;
			case "restore":
				await statusMut.mutateAsync({
					userId: pending.id,
					status: "active"
				});
				break;
			case "delete":
				await deleteMut.mutateAsync(pending.id);
				break;
			case "reset":
				await resetMut.mutateAsync(pending.email);
				break;
			case "impersonate": await impersonateMut.mutateAsync(pending.email);
		}
		else switch (pending.kind) {
			case "bulk-delete":
				for (const id of selectedIds) await deleteMut.mutateAsync(id);
				setSelected({});
				break;
			case "bulk-suspend":
				for (const id of selectedIds) await statusMut.mutateAsync({
					userId: id,
					status: "suspended"
				});
				setSelected({});
				break;
			case "bulk-email":
				await logAudit({
					action: "user.bulk_email",
					resource_type: "user",
					extra: {
						count: selectedIds.length,
						message: bulkEmailText
					}
				});
				toast.success(`Queued email to ${selectedIds.length} user(s)`);
				setBulkEmailText("");
				setSelected({});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Users",
			description: "Search, filter, and manage user accounts.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => exportRows(filtered, `users-${Date.now()}.csv`),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 h-4 w-4" }), " Export"]
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1 min-w-[240px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search name, email, id, country…",
								className: "pl-9"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
							label: "Country",
							value: country,
							onChange: setCountry,
							options: countries
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
							label: "Platform",
							value: platform,
							onChange: setPlatform,
							options: platforms
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
							label: "Status",
							value: status,
							onChange: setStatus,
							options: [
								"active",
								"frozen",
								"suspended",
								"blocked",
								"deleted"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
							label: "Plan",
							value: plan,
							onChange: setPlan,
							options: [
								"free",
								"pro",
								"team",
								"enterprise"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterSelect, {
							label: "Registered",
							value: dateRange,
							onChange: setDateRange,
							options: [
								{
									label: "All time",
									value: "all"
								},
								{
									label: "Last 7 days",
									value: "7d"
								},
								{
									label: "Last 30 days",
									value: "30d"
								},
								{
									label: "Last 90 days",
									value: "90d"
								},
								{
									label: "Last year",
									value: "1y"
								}
							]
						}),
						(country !== "all" || platform !== "all" || status !== "all" || plan !== "all" || dateRange !== "all" || q) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								setQ("");
								setCountry("all");
								setPlatform("all");
								setStatus("all");
								setPlan("all");
								setDateRange("all");
							},
							children: "Clear filters"
						})
					]
				}),
				selectedIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [selectedIds.length, " selected"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => exportRows(selectedRows, `users-selection-${Date.now()}.csv`),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1 h-3.5 w-3.5" }), " Export"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setPending({ kind: "bulk-email" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mr-1 h-3.5 w-3.5" }), " Email"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setPending({ kind: "bulk-suspend" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "mr-1 h-3.5 w-3.5" }), " Suspend"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "destructive",
								onClick: () => setPending({ kind: "bulk-delete" }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 h-3.5 w-3.5" }), " Delete"]
							})
						]
					})]
				}),
				list.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {
					rows: 8,
					cols: 11
				}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Users,
					title: "No users match",
					description: "Adjust the filters or search to find users."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: allChecked ? true : someChecked ? "indeterminate" : false,
								onCheckedChange: (v) => {
									if (v) {
										const next = {};
										filtered.forEach((r) => next[r.id] = true);
										setSelected(next);
									} else setSelected({});
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User ID" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Country" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Platform" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Plan" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Joined" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Last Login" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Subscription" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-10 text-right",
							children: "Actions"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						"data-state": selected[r.id] ? "selected" : void 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: !!selected[r.id],
								onCheckedChange: (v) => setSelected((s) => ({
									...s,
									[r.id]: !!v
								}))
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-8 w-8",
									children: [r.avatar_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										src: r.avatar_url,
										alt: ""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: initials(r.full_name, r.email) })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/users/$userId",
										params: { userId: r.id },
										className: "block truncate font-medium hover:underline",
										children: r.full_name || "—"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: r.email
									})]
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "font-mono text-xs text-muted-foreground",
								children: [r.id.slice(0, 8), "…"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r.country ?? "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "capitalize",
								children: r.platform ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "capitalize",
								children: r.plan ?? "free"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "whitespace-nowrap",
								children: formatDate(r.created_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "whitespace-nowrap",
								children: r.last_seen_at ? formatDateTime(r.last_seen_at) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: r.sub_status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.sub_status }) : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowActions, {
									row: r,
									onAction: (kind) => setPending({
										kind,
										id: r.id,
										email: r.email,
										name: r.full_name ?? r.email
									})
								})
							})
						]
					}, r.id)) })] })
				})
			]
		}),
		pending && "id" in pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserActionDialog, {
			open: true,
			onOpenChange: (o) => !o && setPending(null),
			title: dialogTitle(pending.kind),
			description: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				dialogDescription(pending.kind),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: pending.name
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					children: [
						"(",
						pending.email,
						")"
					]
				}),
				"?"
			] }) }),
			destructive: [
				"delete",
				"block",
				"suspend"
			].includes(pending.kind),
			confirmLabel: dialogConfirm(pending.kind),
			onConfirm: runPending
		}),
		pending && pending.kind === "bulk-delete" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserActionDialog, {
			open: true,
			onOpenChange: (o) => !o && setPending(null),
			title: "Delete selected users?",
			description: `This will permanently delete ${selectedIds.length} account(s). This action cannot be undone.`,
			destructive: true,
			confirmLabel: "Delete all",
			onConfirm: runPending
		}),
		pending && pending.kind === "bulk-suspend" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserActionDialog, {
			open: true,
			onOpenChange: (o) => !o && setPending(null),
			title: "Suspend selected users?",
			description: `This will suspend ${selectedIds.length} account(s). They will lose access until restored.`,
			destructive: true,
			confirmLabel: "Suspend all",
			onConfirm: runPending
		}),
		pending && pending.kind === "bulk-email" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserActionDialog, {
			open: true,
			onOpenChange: (o) => !o && setPending(null),
			title: `Email ${selectedIds.length} user(s)`,
			description: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Compose a short message. It will be logged to the audit trail and queued for delivery."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: bulkEmailText,
					onChange: (e) => setBulkEmailText(e.target.value),
					rows: 4,
					className: "w-full rounded-md border bg-background p-2 text-sm",
					placeholder: "Message…"
				})]
			}),
			confirmLabel: "Queue emails",
			onConfirm: runPending
		})
	] });
}
function dialogTitle(kind) {
	return {
		freeze: "Freeze account?",
		suspend: "Suspend account?",
		block: "Block account?",
		restore: "Restore account?",
		delete: "Delete account?",
		reset: "Send password reset?",
		impersonate: "Generate impersonation link?"
	}[kind] ?? "Confirm";
}
function dialogDescription(kind) {
	return {
		freeze: "Temporarily freeze",
		suspend: "Suspend",
		block: "Block",
		restore: "Restore",
		delete: "Permanently delete",
		reset: "Send a password reset link to",
		impersonate: "Create a one-time sign-in link for"
	}[kind] ?? "Perform this action for";
}
function dialogConfirm(kind) {
	return {
		freeze: "Freeze",
		suspend: "Suspend",
		block: "Block",
		restore: "Restore",
		delete: "Delete",
		reset: "Send link",
		impersonate: "Copy link"
	}[kind] ?? "Confirm";
}
function FilterSelect({ label, value, onChange, options }) {
	const opts = options.map((o) => typeof o === "string" ? {
		label: o,
		value: o
	} : o);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: onChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
			className: "h-9 w-[150px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-1 h-3.5 w-3.5 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: label })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
			value: "all",
			children: [label, ": All"]
		}), opts.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: o.value,
			className: "capitalize",
			children: o.label
		}, o.value))] })]
	});
}
function RowActions({ row, onAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			className: "h-8 w-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-48",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Manage user" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/users/$userId",
					params: { userId: row.id },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-2 h-4 w-4" }), " View profile"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/users/$userId",
					params: { userId: row.id },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "mr-2 h-4 w-4" }), " Edit user"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: () => onAction("reset"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "mr-2 h-4 w-4" }), " Reset password"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: () => onAction("impersonate"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "mr-2 h-4 w-4" }), " Impersonate"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: () => onAction("freeze"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, { className: "mr-2 h-4 w-4" }), " Freeze"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: () => onAction("suspend"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, { className: "mr-2 h-4 w-4" }), " Suspend"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: () => onAction("block"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "mr-2 h-4 w-4" }), " Block"]
			}),
			row.status !== "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onSelect: () => onAction("restore"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "mr-2 h-4 w-4" }), " Restore"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				className: "text-destructive",
				onSelect: () => onAction("delete"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Delete"]
			})
		]
	})] });
}
export { UsersPage as component };
