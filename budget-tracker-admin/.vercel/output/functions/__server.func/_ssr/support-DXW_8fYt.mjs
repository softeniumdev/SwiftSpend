import { o as __toESM } from "../_runtime.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Textarea } from "./textarea-DvN15-gJ.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BdJfjbEJ.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-DJmpbwhv.mjs";
import { t as Separator } from "./separator-DA5o5Z3r.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as StatCard } from "./StatCard-CVanclUU.mjs";
import { t as StatusBadge } from "./StatusBadge-DZp6xNSP.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { i as formatDateTime, r as formatDate } from "./format-D3NUXAym.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { t as useRealtimeInvalidate } from "./useRealtimeInvalidate-Bt8_dkae.mjs";
import { n as useAdminSession } from "./useAdminSession-DTEEJszo.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LifeBuoy, D as Search, E as Send, Ft as CalendarClock, G as MessageSquare, It as Bug, Z as Lock, gt as CreditCard, l as UserRound, r as Wrench, v as Sparkles, xt as CircleQuestionMark } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/support-DXW_8fYt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	{
		key: "general",
		label: "General",
		icon: CircleQuestionMark
	},
	{
		key: "bug",
		label: "Bug report",
		icon: Bug
	},
	{
		key: "feature",
		label: "Feature request",
		icon: Sparkles
	},
	{
		key: "system",
		label: "System issue",
		icon: Wrench
	}
];
function categoryMeta(key) {
	return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[0];
}
function SupportPage() {
	const qc = useQueryClient();
	const { user: adminUser } = useAdminSession();
	useRealtimeInvalidate(["support_tickets"], ["support-tickets"]);
	const ticketsQ = useQuery({
		queryKey: ["support-tickets"],
		queryFn: async () => {
			const { data, error } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false }).limit(500);
			if (error) throw error;
			return data ?? [];
		}
	});
	const tickets = ticketsQ.data ?? [];
	const admins = useQuery({
		queryKey: ["support-admins"],
		queryFn: async () => {
			const { data } = await supabase.from("user_roles").select("user_id, role");
			const ids = Array.from(new Set((data ?? []).filter((r) => [
				"admin",
				"super_admin",
				"support"
			].includes(r.role)).map((r) => r.user_id)));
			if (ids.length === 0) return [];
			const { data: profs } = await supabase.from("profiles").select("id,email,full_name,avatar_url,country,platform,status,created_at").in("id", ids);
			return profs ?? [];
		}
	}).data ?? [];
	const [tab, setTab] = (0, import_react.useState)("all");
	const [priority, setPriority] = (0, import_react.useState)("all");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [assignee, setAssignee] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => {
		return tickets.filter((t) => {
			if (tab !== "all" && t.status !== tab) return false;
			if (priority !== "all" && t.priority !== priority) return false;
			if (category !== "all" && t.category !== category) return false;
			if (assignee !== "all") {
				if (assignee === "unassigned" && t.assigned_to) return false;
				if (assignee === "me" && t.assigned_to !== adminUser?.id) return false;
				if (assignee !== "unassigned" && assignee !== "me" && t.assigned_to !== assignee) return false;
			}
			if (search) {
				const s = search.toLowerCase();
				if (!t.subject.toLowerCase().includes(s) && !t.message.toLowerCase().includes(s) && !t.id.toLowerCase().startsWith(s)) return false;
			}
			return true;
		});
	}, [
		tickets,
		tab,
		priority,
		category,
		assignee,
		search,
		adminUser?.id
	]);
	(0, import_react.useEffect)(() => {
		if (!activeId && filtered.length > 0) setActiveId(filtered[0].id);
		if (activeId && !filtered.some((t) => t.id === activeId) && filtered.length > 0) setActiveId(filtered[0].id);
	}, [filtered, activeId]);
	const active = tickets.find((t) => t.id === activeId) ?? null;
	const counts = {
		open: tickets.filter((t) => t.status === "open").length,
		pending: tickets.filter((t) => t.status === "pending").length,
		solved: tickets.filter((t) => t.status === "solved").length,
		critical: tickets.filter((t) => t.priority === "critical" && t.status !== "closed" && t.status !== "solved").length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Help Desk",
			description: "Triage, chat, and resolve customer tickets. Every action is audit-logged."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Open",
					value: String(counts.open),
					icon: LifeBuoy
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pending",
					value: String(counts.pending),
					icon: LifeBuoy
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Solved",
					value: String(counts.solved),
					icon: LifeBuoy
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Critical open",
					value: String(counts.critical),
					icon: LifeBuoy
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: tab,
					onValueChange: setTab,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "all",
							children: "All"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "open",
							children: "Open"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "pending",
							children: "Pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "solved",
							children: "Solved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "closed",
							children: "Closed"
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-[220px] flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Search subject, message, id…",
						className: "pl-8",
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: priority,
					onValueChange: setPriority,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-[140px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Priority" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All priorities"
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
					value: category,
					onValueChange: setCategory,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-[160px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Category" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: "All categories"
					}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: c.key,
						children: c.label
					}, c.key))] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: assignee,
					onValueChange: setAssignee,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-[180px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Assignee" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All assignees"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "me",
							children: "Assigned to me"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "unassigned",
							children: "Unassigned"
						}),
						admins.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: a.id,
							children: a.full_name || a.email
						}, a.id))
					] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)_minmax(280px,340px)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "max-h-[calc(100vh-320px)] overflow-y-auto p-0",
					children: ticketsQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 text-sm text-muted-foreground",
						children: "Loading tickets…"
					}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: LifeBuoy,
						title: "Inbox zero",
						description: "No tickets match the current filters."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: filtered.map((t) => {
							const Cat = categoryMeta(t.category).icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveId(t.id),
								className: cn("flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-muted/50", activeId === t.id && "bg-muted"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate text-sm font-medium",
												children: t.subject
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.priority })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: t.message
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(t.created_at) })]
									})
								]
							}) }, t.id);
						})
					})
				}),
				active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketChat, {
					ticket: active,
					admins,
					adminId: adminUser?.id ?? null,
					onChanged: () => qc.invalidateQueries({ queryKey: ["support-tickets"] })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "flex items-center justify-center p-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: MessageSquare,
						title: "Select a ticket",
						description: "Pick a conversation from the list to view details and reply."
					})
				}),
				active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketSidebar, {
					ticket: active,
					admins
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-6 text-sm text-muted-foreground",
					children: "User profile, purchases, and subscription details appear here."
				})
			]
		})
	] });
}
function TicketChat({ ticket, admins, adminId, onChanged }) {
	const qc = useQueryClient();
	const [reply, setReply] = (0, import_react.useState)("");
	const [internal, setInternal] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(null);
	const msgsQ = useQuery({
		queryKey: ["ticket-messages", ticket.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("ticket_messages").select("*").eq("ticket_id", ticket.id).order("created_at", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel(`ticket-${ticket.id}`).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "ticket_messages",
			filter: `ticket_id=eq.${ticket.id}`
		}, () => qc.invalidateQueries({ queryKey: ["ticket-messages", ticket.id] })).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [ticket.id, qc]);
	(0, import_react.useEffect)(() => {
		if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
	}, [msgsQ.data?.length, ticket.id]);
	const messages = msgsQ.data ?? [];
	const updateTicket = async (patch, action) => {
		const before = {
			status: ticket.status,
			priority: ticket.priority,
			assigned_to: ticket.assigned_to,
			category: ticket.category
		};
		const finalPatch = patch.status === "solved" || patch.status === "closed" ? {
			...patch,
			resolved_at: (/* @__PURE__ */ new Date()).toISOString()
		} : patch;
		const { error } = await supabase.from("support_tickets").update(finalPatch).eq("id", ticket.id);
		if (error) return toast.error(error.message);
		await logAudit({
			action: `support.${action}`,
			resource_type: "support_ticket",
			resource_id: ticket.id,
			affected_user: ticket.user_id,
			before,
			after: {
				...before,
				...patch
			}
		});
		toast.success("Ticket updated");
		onChanged();
	};
	const send = async () => {
		if (!reply.trim() || !adminId) return;
		setSending(true);
		const body = reply.trim();
		const { error } = await supabase.from("ticket_messages").insert({
			ticket_id: ticket.id,
			author_id: adminId,
			author_role: "admin",
			body,
			is_internal: internal
		});
		setSending(false);
		if (error) return toast.error(error.message);
		if (!internal && ticket.status === "open") {
			await supabase.from("support_tickets").update({ status: "pending" }).eq("id", ticket.id);
			onChanged();
		}
		await logAudit({
			action: internal ? "support.internal_note" : "support.reply",
			resource_type: "support_ticket",
			resource_id: ticket.id,
			affected_user: ticket.user_id,
			extra: {
				chars: body.length,
				internal
			}
		});
		setReply("");
		setInternal(false);
		qc.invalidateQueries({ queryKey: ["ticket-messages", ticket.id] });
	};
	const Cat = categoryMeta(ticket.category).icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex max-h-[calc(100vh-320px)] flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 border-b p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, { className: "h-3.5 w-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: categoryMeta(ticket.category).label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono",
									children: ["#", ticket.id.slice(0, 8)]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 truncate text-base font-semibold",
							children: ticket.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: ticket.priority })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: ticket.status,
							onValueChange: (v) => updateTicket({ status: v }, "status_changed"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-8 w-[120px] text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "open",
									children: "Open"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "pending",
									children: "Pending"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "solved",
									children: "Solved"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "closed",
									children: "Closed"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: ticket.priority,
							onValueChange: (v) => updateTicket({ priority: v }, "priority_changed"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-8 w-[120px] text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
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
							value: ticket.assigned_to ?? "unassigned",
							onValueChange: (v) => updateTicket({ assigned_to: v === "unassigned" ? null : v }, "assigned"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "h-8 w-[160px] text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Assign" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "unassigned",
									children: "Unassigned"
								}),
								adminId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: adminId,
									children: "Assign to me"
								}),
								admins.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: a.id,
									children: a.full_name || a.email
								}, a.id))
							] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scrollRef,
				className: "flex-1 space-y-4 overflow-y-auto p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
					side: "user",
					body: ticket.message,
					author: "Customer",
					when: ticket.created_at
				}), messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
					side: m.author_role === "admin" ? "admin" : "user",
					body: m.body,
					author: m.author_role === "admin" ? "You / Team" : "Customer",
					when: m.created_at,
					internal: m.is_internal
				}, m.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: internal ? "default" : "outline",
							onClick: () => setInternal((v) => !v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mr-1 h-3.5 w-3.5" }), internal ? "Internal note" : "Public reply"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: internal ? "Only staff will see this note." : "Sent to the customer."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							value: reply,
							onChange: (e) => setReply(e.target.value),
							placeholder: internal ? "Add an internal note…" : "Reply to the customer…",
							onKeyDown: (e) => {
								if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
									e.preventDefault();
									send();
								}
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: send,
							disabled: !reply.trim() || sending,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1 h-4 w-4" }), "Send"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: "⌘/Ctrl + Enter to send"
					})
				]
			})
		]
	});
}
function MessageBubble({ side, body, author, when, internal }) {
	const isAdmin = side === "admin";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex", isAdmin ? "justify-end" : "justify-start"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-w-[80%] space-y-1"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center gap-2 text-[11px] text-muted-foreground", isAdmin && "justify-end"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: author }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDateTime(when) }),
					internal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "border-warning/30 bg-warning/10 text-warning-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mr-1 h-3 w-3" }), " internal"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("whitespace-pre-wrap rounded-lg border px-3 py-2 text-sm", isAdmin ? internal ? "border-warning/30 bg-warning/10" : "border-primary/20 bg-primary text-primary-foreground" : "bg-muted"),
				children: body
			})]
		})
	});
}
function TicketSidebar({ ticket, admins }) {
	const profileQ = useQuery({
		queryKey: ["ticket-profile", ticket.user_id],
		enabled: !!ticket.user_id,
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("id,email,full_name,avatar_url,country,platform,status,created_at").eq("id", ticket.user_id).maybeSingle();
			return data ?? null;
		}
	});
	const subQ = useQuery({
		queryKey: ["ticket-subscription", ticket.user_id],
		enabled: !!ticket.user_id,
		queryFn: async () => {
			const { data } = await supabase.from("subscriptions").select("*").eq("user_id", ticket.user_id).order("created_at", { ascending: false }).limit(1).maybeSingle();
			return data;
		}
	});
	const txQ = useQuery({
		queryKey: ["ticket-transactions", ticket.user_id],
		enabled: !!ticket.user_id,
		queryFn: async () => {
			const { data } = await supabase.from("transactions").select("id,amount_cents,currency,status,provider,created_at").eq("user_id", ticket.user_id).order("created_at", { ascending: false }).limit(5);
			return data ?? [];
		}
	});
	const profile = profileQ.data;
	const assignedAdmin = admins.find((a) => a.id === ticket.assigned_to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "max-h-[calc(100vh-320px)] space-y-4 overflow-y-auto p-4 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Customer"
			}), profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [profile.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: profile.avatar_url,
					alt: "",
					className: "h-10 w-10 rounded-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-10 w-10 items-center justify-center rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-5 w-5 text-muted-foreground" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate font-medium",
							children: profile.full_name || "Unnamed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-xs text-muted-foreground",
							children: profile.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap gap-1 text-[11px]",
							children: [
								profile.country && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: profile.country
								}),
								profile.platform && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "capitalize",
									children: profile.platform
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: profile.status })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-1 text-[11px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-3 w-3" }),
								"Joined ",
								formatDate(profile.created_at)
							]
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: "No linked customer profile."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Assignment"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm",
				children: assignedAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium",
					children: assignedAdmin.full_name || assignedAdmin.email
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: assignedAdmin.email
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "Unassigned"
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Linked subscription"
			}), subQ.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border p-2 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium capitalize",
						children: subQ.data.plan
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: subQ.data.status })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-muted-foreground",
					children: [
						subQ.data.interval,
						" · started ",
						formatDate(subQ.data.started_at ?? subQ.data.created_at)
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: "No subscription."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Linked purchases"
			}), (txQ.data?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: "No purchases."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: (txQ.data ?? []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-md border p-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: (t.amount_cents / 100).toLocaleString(void 0, {
								style: "currency",
								currency: t.currency ?? "USD"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-muted-foreground",
							children: [
								t.provider,
								" · ",
								formatDate(t.created_at)
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.status })]
				}, t.id))
			})] })
		]
	});
}
export { SupportPage as component };
