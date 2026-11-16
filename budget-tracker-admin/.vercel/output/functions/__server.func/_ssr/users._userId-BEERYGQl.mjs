import { o as __toESM } from "../_runtime.mjs";
import { a as updateProfile, i as setUserStatus, n as impersonateUser, o as useServerFn, r as sendPasswordReset, t as deleteUser } from "./adminUsers.functions-Be7w9yLa.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-Bp0QKi9c.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DJmpbwhv.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { t as StatusBadge } from "./StatusBadge-DZp6xNSP.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as UserActionDialog } from "./UserActionDialog-DCsJz8n7.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { i as formatDateTime, n as formatCurrency, o as initials, r as formatDate } from "./format-D3NUXAym.mjs";
import { n as toCSV, t as downloadCSV } from "./csv-C5d8Sirq.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as useParams, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as RotateCw, Bt as ArrowLeft, Q as LoaderCircle, Rt as Ban, S as ShieldOff, X as LogIn, h as Trash2, nt as KeyRound, pt as Download, y as Snowflake, z as PenLine } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/users._userId-BEERYGQl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UserProfilePage() {
	const { userId } = useParams({ from: "/_authenticated/users/$userId" });
	const qc = useQueryClient();
	const [pending, setPending] = (0, import_react.useState)(null);
	const profile = useQuery({
		queryKey: ["user-profile", userId],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const subs = useQuery({
		queryKey: ["user-subs", userId],
		queryFn: async () => (await supabase.from("subscriptions").select("*").eq("user_id", userId).order("created_at", { ascending: false })).data ?? []
	});
	const txs = useQuery({
		queryKey: ["user-txs", userId],
		queryFn: async () => (await supabase.from("transactions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(100)).data ?? []
	});
	const devices = useQuery({
		queryKey: ["user-devices", userId],
		queryFn: async () => (await supabase.from("user_devices").select("*").eq("user_id", userId).order("last_seen_at", { ascending: false })).data ?? []
	});
	const reports = useQuery({
		queryKey: ["user-reports", userId],
		queryFn: async () => (await supabase.from("moderation_reports").select("*").or(`target_id.eq.${userId},reporter_id.eq.${userId}`).order("created_at", { ascending: false }).limit(50)).data ?? []
	});
	const tickets = useQuery({
		queryKey: ["user-tickets", userId],
		queryFn: async () => (await supabase.from("support_tickets").select("*").eq("user_id", userId).order("created_at", { ascending: false })).data ?? []
	});
	const audits = useQuery({
		queryKey: ["user-audits", userId],
		queryFn: async () => (await supabase.from("audit_logs").select("*").or(`resource_id.eq.${userId},actor_id.eq.${userId}`).order("created_at", { ascending: false }).limit(100)).data ?? []
	});
	const setStatusFn = useServerFn(setUserStatus);
	const resetFn = useServerFn(sendPasswordReset);
	const deleteFn = useServerFn(deleteUser);
	const impersonateFn = useServerFn(impersonateUser);
	const updateFn = useServerFn(updateProfile);
	const editMut = useMutation({
		mutationFn: async (v) => updateFn({ data: {
			userId,
			...v
		} }),
		onSuccess: async (res) => {
			toast.success("Profile updated");
			await logAudit({
				action: "user.update",
				resource_type: "user",
				resource_id: userId,
				affected_user: userId,
				before: res.before,
				after: res.after
			});
			qc.invalidateQueries({ queryKey: ["user-profile", userId] });
			qc.invalidateQueries({ queryKey: ["admin-users"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const statusMut = useMutation({
		mutationFn: async (status) => setStatusFn({ data: {
			userId,
			status
		} }),
		onSuccess: async (res, status) => {
			toast.success(`User ${status}`);
			await logAudit({
				action: `user.${status}`,
				resource_type: "user",
				resource_id: userId,
				affected_user: userId,
				before: res.before,
				after: res.after
			});
			qc.invalidateQueries({ queryKey: ["user-profile", userId] });
		},
		onError: (e) => toast.error(e.message)
	});
	const runPending = async () => {
		if (!pending || !profile.data) return;
		switch (pending) {
			case "freeze":
				await statusMut.mutateAsync("frozen");
				break;
			case "suspend":
				await statusMut.mutateAsync("suspended");
				break;
			case "block":
				await statusMut.mutateAsync("blocked");
				break;
			case "restore":
				await statusMut.mutateAsync("active");
				break;
			case "delete":
				await deleteFn({ data: { userId } });
				toast.success("User deleted");
				await logAudit({
					action: "user.delete",
					resource_type: "user",
					resource_id: userId,
					affected_user: userId
				});
				break;
			case "reset":
				await resetFn({ data: { email: profile.data.email } });
				toast.success("Password reset link sent");
				await logAudit({
					action: "user.password_reset",
					resource_type: "user",
					affected_user: profile.data.email
				});
				break;
			case "impersonate": {
				const res = await impersonateFn({ data: { email: profile.data.email } });
				if (res.actionLink) {
					await navigator.clipboard.writeText(res.actionLink).catch(() => {});
					toast.success("Impersonation link copied to clipboard");
				}
				await logAudit({
					action: "user.impersonate",
					resource_type: "user",
					affected_user: profile.data.email
				});
				break;
			}
		}
	};
	const timeline = (0, import_react.useMemo)(() => {
		const items = [];
		(audits.data ?? []).forEach((a) => items.push({
			at: a.created_at,
			kind: "audit",
			label: a.action
		}));
		(tickets.data ?? []).forEach((t) => items.push({
			at: t.created_at,
			kind: "ticket",
			label: `Ticket: ${t.subject}`
		}));
		(reports.data ?? []).forEach((r) => items.push({
			at: r.created_at,
			kind: "report",
			label: `Report: ${r.reason}`
		}));
		(subs.data ?? []).forEach((s) => items.push({
			at: s.created_at,
			kind: "sub",
			label: `Subscription ${s.plan} (${s.status})`
		}));
		return items.sort((a, b) => +new Date(b.at) - +new Date(a.at)).slice(0, 40);
	}, [
		audits.data,
		tickets.data,
		reports.data,
		subs.data
	]);
	if (profile.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-64 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	if (!profile.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "User not found",
		description: "This user may have been deleted.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/users",
				children: "Back to Users"
			})
		})
	});
	const p = profile.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex items-center gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/users",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1 h-4 w-4" }), " Users"]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "h-16 w-16",
						children: [p.avatar_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
							src: p.avatar_url,
							alt: ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "text-lg",
							children: initials(p.full_name, p.email)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-xl font-semibold",
								children: p.full_name || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: p.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-center gap-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: "font-mono",
										children: [p.id.slice(0, 8), "…"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status }),
									p.country && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										children: p.country
									}),
									p.platform && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "capitalize",
										children: p.platform
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setPending("reset"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "mr-1 h-4 w-4" }), " Reset password"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setPending("impersonate"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "mr-1 h-4 w-4" }), " Impersonate"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setPending("freeze"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Snowflake, { className: "mr-1 h-4 w-4" }), " Freeze"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setPending("suspend"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, { className: "mr-1 h-4 w-4" }), " Suspend"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setPending("block"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "mr-1 h-4 w-4" }), " Block"]
							}),
							p.status !== "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setPending("restore"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "mr-1 h-4 w-4" }), " Restore"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "destructive",
								size: "sm",
								onClick: () => setPending("delete"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 h-4 w-4" }), " Delete"]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "personal",
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "flex flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "personal",
							children: "Personal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "subscription",
							children: "Subscription"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "purchases",
							children: "Purchases"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "devices",
							children: "Devices"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "sessions",
							children: "Sessions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "reports",
							children: "Reports"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "tickets",
							children: "Support"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "timeline",
							children: "Activity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "moderation",
							children: "Moderation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "audit",
							children: "Audit"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "personal",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonalForm, {
							initial: {
								full_name: p.full_name ?? "",
								email: p.email,
								country: p.country ?? "",
								platform: p.platform ?? "",
								joined: p.created_at,
								lastSeen: p.last_seen_at
							},
							onSubmit: (v) => editMut.mutateAsync(v),
							submitting: editMut.isPending
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "subscription",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-4",
						children: subs.data && subs.data.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Plan" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Interval" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Started" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Renews" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: subs.data.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "capitalize font-medium",
								children: s.plan
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s.status }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatCurrency(s.amount_cents, s.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "capitalize",
								children: s.interval
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(s.started_at) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s.renews_at ? formatDate(s.renews_at) : "—" })
						] }, s.id)) })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No subscriptions",
							description: "This user has not subscribed to any plan."
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "purchases",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
						title: "Purchase history",
						data: txs.data ?? [],
						columns: [
							{
								header: "Type",
								key: "type",
								capitalize: true
							},
							{
								header: "Amount",
								key: "amount_cents",
								render: (v, r) => formatCurrency(v, r.currency)
							},
							{
								header: "Status",
								key: "status",
								render: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: v })
							},
							{
								header: "Description",
								key: "description"
							},
							{
								header: "Date",
								key: "created_at",
								render: (v) => formatDateTime(v)
							}
						],
						exportName: `purchases-${userId}.csv`,
						emptyDescription: "No purchases yet."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "devices",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
						title: "Devices",
						data: devices.data ?? [],
						columns: [
							{
								header: "Device",
								key: "device_name"
							},
							{
								header: "Platform",
								key: "platform",
								capitalize: true
							},
							{
								header: "OS",
								key: "os"
							},
							{
								header: "Browser",
								key: "browser"
							},
							{
								header: "IP",
								key: "ip_address"
							},
							{
								header: "Last seen",
								key: "last_seen_at",
								render: (v) => formatDateTime(v)
							}
						],
						exportName: `devices-${userId}.csv`,
						emptyDescription: "No devices recorded."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "sessions",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
						title: "Sessions",
						data: (audits.data ?? []).filter((a) => a.action.startsWith("session.")),
						columns: [
							{
								header: "Event",
								key: "action"
							},
							{
								header: "IP",
								key: "ip_address"
							},
							{
								header: "When",
								key: "created_at",
								render: (v) => formatDateTime(v)
							}
						],
						exportName: `sessions-${userId}.csv`,
						emptyDescription: "No session events recorded."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "reports",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
						title: "Reports",
						data: reports.data ?? [],
						columns: [
							{
								header: "Target",
								key: "target_type",
								capitalize: true
							},
							{
								header: "Reason",
								key: "reason"
							},
							{
								header: "Severity",
								key: "severity",
								render: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: v })
							},
							{
								header: "Status",
								key: "status",
								render: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: v })
							},
							{
								header: "When",
								key: "created_at",
								render: (v) => formatDateTime(v)
							}
						],
						exportName: `reports-${userId}.csv`,
						emptyDescription: "No reports involving this user."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "tickets",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
						title: "Support tickets",
						data: tickets.data ?? [],
						columns: [
							{
								header: "Subject",
								key: "subject"
							},
							{
								header: "Priority",
								key: "priority",
								render: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: v })
							},
							{
								header: "Status",
								key: "status",
								render: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: v })
							},
							{
								header: "Created",
								key: "created_at",
								render: (v) => formatDateTime(v)
							}
						],
						exportName: `tickets-${userId}.csv`,
						emptyDescription: "No support tickets."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "timeline",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6",
						children: timeline.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No activity yet",
							description: "Actions will appear here in real time."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "relative space-y-4 border-l pl-6",
							children: timeline.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium",
										children: t.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											formatDateTime(t.at),
											" · ",
											t.kind
										]
									})
								]
							}, i))
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "moderation",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
						title: "Moderation history",
						data: (audits.data ?? []).filter((a) => /suspend|freeze|block|restore|delete/.test(a.action)),
						columns: [
							{
								header: "Action",
								key: "action"
							},
							{
								header: "Actor",
								key: "actor_email"
							},
							{
								header: "When",
								key: "created_at",
								render: (v) => formatDateTime(v)
							}
						],
						exportName: `moderation-${userId}.csv`,
						emptyDescription: "No moderation events."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "audit",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
						title: "Audit history",
						data: audits.data ?? [],
						columns: [
							{
								header: "Action",
								key: "action"
							},
							{
								header: "Actor",
								key: "actor_email"
							},
							{
								header: "Resource",
								key: "resource_type"
							},
							{
								header: "When",
								key: "created_at",
								render: (v) => formatDateTime(v)
							}
						],
						exportName: `audit-${userId}.csv`,
						emptyDescription: "No audit events."
					})
				})
			]
		}),
		pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserActionDialog, {
			open: true,
			onOpenChange: (o) => !o && setPending(null),
			title: {
				freeze: "Freeze this account?",
				suspend: "Suspend this account?",
				block: "Block this account?",
				restore: "Restore this account?",
				delete: "Delete this account?",
				reset: "Send password reset?",
				impersonate: "Generate impersonation link?"
			}[pending],
			description: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Confirm this action for ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: p.full_name || p.email
				}),
				"."
			] }),
			destructive: [
				"delete",
				"block",
				"suspend"
			].includes(pending),
			onConfirm: runPending
		})
	] });
}
function PersonalForm({ initial, onSubmit, submitting }) {
	const [name, setName] = (0, import_react.useState)(initial.full_name);
	const [country, setCountry] = (0, import_react.useState)(initial.country);
	const [platform, setPlatform] = (0, import_react.useState)(initial.platform);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-4 md:grid-cols-2",
		onSubmit: (e) => {
			e.preventDefault();
			onSubmit({
				full_name: name,
				country: country || null,
				platform: platform || null
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					maxLength: 120
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: initial.email,
					readOnly: true,
					disabled: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Country" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: country,
					onChange: (e) => setCountry(e.target.value),
					maxLength: 80
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Platform" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: platform,
					onChange: (e) => setPlatform(e.target.value),
					maxLength: 40
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Joined" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: formatDate(initial.joined),
					readOnly: true,
					disabled: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Last seen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: initial.lastSeen ? formatDateTime(initial.lastSeen) : "—",
					readOnly: true,
					disabled: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: submitting,
					children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "mr-2 h-4 w-4" }), "Save changes"]
				})
			})
		]
	});
}
function ListCard({ title, data, columns, emptyDescription, exportName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium",
				children: title
			}), data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => downloadCSV(exportName, toCSV(data)),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1 h-3.5 w-3.5" }), " Export"]
			})]
		}), data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Nothing to show",
			description: emptyDescription
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: c.header }, c.key)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: data.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: columns.map((c) => {
				const v = row[c.key];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: c.capitalize ? "capitalize" : void 0,
					children: c.render ? c.render(v, row) : v == null || v === "" ? "—" : String(v)
				}, c.key);
			}) }, row.id ?? i)) })] })
		})]
	});
}
export { UserProfilePage as component };
