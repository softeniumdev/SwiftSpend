import { o as __toESM } from "../_runtime.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Textarea } from "./textarea-DvN15-gJ.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BdJfjbEJ.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-pLK6MnOG.mjs";
import { a as DropdownMenuSeparator, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-DoXW0ikn.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as StatusBadge } from "./StatusBadge-DZp6xNSP.mjs";
import { t as UserActionDialog } from "./UserActionDialog-DCsJz8n7.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Search, E as Send, F as Plus, Lt as Bell, R as Pencil, _t as Copy, bt as Circle, ft as Ellipsis, h as Trash2 } from "../_libs/lucide-react.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/radix-ui__react-radio-group.mjs";
// node_modules/.nitro/vite/services/ssr/assets/notifications-iGnaL_2F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var AUDIENCES = {
	all: "All Users",
	free: "Free Users",
	pro: "Pro Users",
	groups: "Specific Users/Groups",
	custom: "Custom"
};
var STATUSES = [
	"draft",
	"scheduled",
	"sent",
	"failed"
];
var KEY = ["admin-notifications"];
var fmt = (d) => d ? new Date(d).toLocaleString() : "—";
function NotificationsPage() {
	const qc = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [audience, setAudience] = (0, import_react.useState)("all");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const query = useQuery({
		queryKey: KEY,
		queryFn: async () => {
			const { data, error } = await supabase.from("admin_notifications").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const rows = (0, import_react.useMemo)(() => {
		const q = search.toLowerCase().trim();
		return (query.data ?? []).filter((r) => (status === "all" || r.status === status) && (audience === "all" || r.audience === audience) && (!q || r.title.toLowerCase().includes(q) || r.body.toLowerCase().includes(q)));
	}, [
		query.data,
		search,
		status,
		audience
	]);
	const invalidate = () => qc.invalidateQueries({ queryKey: KEY });
	const sendNow = useMutation({
		mutationFn: async (r) => {
			const { data, error } = await supabase.rpc("dispatch_admin_notification", { p_notification_id: r.id });
			if (error) throw error;
			if (data && !data.success) throw new Error(data.error ?? "Failed to send notification");
			try {
				await supabase.functions.invoke("send-push-notification", { body: {
					title: r.title.trim(),
					body: r.body.trim(),
					channelId: "swiftspend_notifications",
					icon: "ic_stat_notification",
					color: "#10b981",
					userIds: r.target_user_ids && r.target_user_ids.length > 0 ? r.target_user_ids : void 0,
					data: {
						notificationId: r.id,
						deep_link: r.deep_link?.trim() || "/notifications"
					}
				} });
			} catch (pushErr) {
				console.warn("Push notification edge dispatch error in sendNow:", pushErr);
			}
			await logAudit({
				action: "notification.send",
				resource_type: "notification",
				resource_id: r.id,
				before: { status: r.status },
				after: { status: "sent" },
				extra: data
			});
			return data;
		},
		onSuccess: (data) => {
			toast.success(`Notification sent! Targeted ${data?.users_targeted ?? 0} users (${data?.devices_targeted ?? 0} devices).`);
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	const duplicate = useMutation({
		mutationFn: async (r) => {
			const { data: u } = await supabase.auth.getUser();
			const { data, error } = await supabase.from("admin_notifications").insert({
				title: `${r.title} (copy)`,
				body: r.body,
				audience: r.audience,
				target_user_ids: r.target_user_ids,
				delivery_type: r.delivery_type,
				deep_link: r.deep_link,
				action_text: r.action_text,
				status: "draft",
				created_by: u.user?.id
			}).select("id").single();
			if (error) throw error;
			await logAudit({
				action: "notification.duplicate",
				resource_type: "notification",
				resource_id: data.id,
				extra: { source: r.id }
			});
		},
		onSuccess: () => {
			toast.success("Duplicated as draft");
			invalidate();
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = async () => {
		if (!toDelete) return;
		const { error } = await supabase.from("admin_notifications").delete().eq("id", toDelete.id);
		if (error) {
			toast.error(error.message);
			throw error;
		}
		await logAudit({
			action: "notification.delete",
			resource_type: "notification",
			resource_id: toDelete.id,
			before: toDelete
		});
		toast.success("Notification deleted");
		invalidate();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Notification Center",
			description: "Compose, schedule and send push / in-app notifications to mobile users.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setEditing({}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), "New notification"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-[220px] flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "pl-8",
							placeholder: "Search title or message…",
							value: search,
							onChange: (e) => setSearch(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: status,
						onValueChange: setStatus,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[150px]",
							"aria-label": "Status filter",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All statuses"
						}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: s,
							className: "capitalize",
							children: s
						}, s))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: audience,
						onValueChange: setAudience,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-[190px]",
							"aria-label": "Audience filter",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "All audiences"
						}), Object.entries(AUDIENCES).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: k,
							children: v
						}, k))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto text-sm text-muted-foreground",
						children: [
							rows.length,
							" of ",
							query.data?.length ?? 0,
							" notifications"
						]
					})
				]
			}), query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, { cols: 7 }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Bell,
				title: query.data?.length ? "No matching notifications" : "No notifications yet",
				description: "Create a notification to reach your mobile users.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setEditing({}),
					children: "New notification"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Title" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Message" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Audience" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Scheduled" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "w-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Actions"
					})
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: r.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "max-w-[280px] truncate text-muted-foreground",
					children: r.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: r.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: AUDIENCES[r.audience] ?? r.audience }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "whitespace-nowrap text-sm",
					children: fmt(r.scheduled_at)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "whitespace-nowrap text-sm",
					children: fmt(r.sent_at)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Actions",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							disabled: r.status === "sent",
							onClick: () => setEditing(r),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-2 h-4 w-4" }), "Edit"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => duplicate.mutate(r),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "mr-2 h-4 w-4" }), "Duplicate"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							disabled: r.status === "sent",
							onClick: () => sendNow.mutate(r),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-2 h-4 w-4" }), "Send now"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							className: "text-destructive",
							onClick: () => setToDelete(r),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"]
						})
					]
				})] }) })
			] }, r.id)) })] })]
		}),
		editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorDialog, {
			initial: editing,
			onClose: () => setEditing(null),
			onSaved: invalidate
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserActionDialog, {
			open: !!toDelete,
			onOpenChange: (o) => !o && setToDelete(null),
			title: "Delete notification?",
			description: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"“",
				toDelete?.title,
				"” will be permanently removed. This cannot be undone."
			] }),
			confirmLabel: "Delete",
			destructive: true,
			onConfirm: remove
		})
	] });
}
function toLocalInput(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	return (/* @__PURE__ */ new Date(d.getTime() - d.getTimezoneOffset() * 6e4)).toISOString().slice(0, 16);
}
function EditorDialog({ initial, onClose, onSaved }) {
	const [title, setTitle] = (0, import_react.useState)(initial.title ?? "");
	const [body, setBody] = (0, import_react.useState)(initial.body ?? "");
	const [audience, setAudience] = (0, import_react.useState)(initial.audience ?? "all");
	const [targets, setTargets] = (0, import_react.useState)((initial.target_user_ids ?? []).join(", "));
	const [delivery, setDelivery] = (0, import_react.useState)(initial.delivery_type ?? "immediate");
	const [when, setWhen] = (0, import_react.useState)(toLocalInput(initial.scheduled_at));
	const [deepLink, setDeepLink] = (0, import_react.useState)(initial.deep_link ?? "");
	const [actionText, setActionText] = (0, import_react.useState)(initial.action_text ?? "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const save = async (mode) => {
		if (!title.trim() || !body.trim()) return toast.error("Title and message are required");
		let scheduled_at = null;
		if (delivery === "scheduled") {
			if (!when) return toast.error("Pick a schedule date & time");
			const d = new Date(when);
			if (mode === "submit" && d.getTime() <= Date.now()) return toast.error("Schedule time must be in the future");
			scheduled_at = d.toISOString();
		}
		const status = mode === "draft" ? "draft" : delivery === "scheduled" ? "scheduled" : "sent";
		const payload = {
			title: title.trim(),
			body: body.trim(),
			audience,
			target_user_ids: audience === "groups" || audience === "custom" ? targets.split(",").map((s) => s.trim()).filter(Boolean) : [],
			delivery_type: delivery,
			scheduled_at,
			status,
			sent_at: status === "sent" ? (/* @__PURE__ */ new Date()).toISOString() : null,
			deep_link: deepLink.trim() || null,
			action_text: actionText.trim() || null
		};
		setSaving(true);
		try {
			let id = initial.id;
			if (id) {
				const { error } = await supabase.from("admin_notifications").update(payload).eq("id", id);
				if (error) throw error;
			} else {
				const { data: u } = await supabase.auth.getUser();
				const { data, error } = await supabase.from("admin_notifications").insert({
					...payload,
					created_by: u.user?.id
				}).select("id").single();
				if (error) throw error;
				id = data.id;
			}
			await logAudit({
				action: initial.id ? "notification.update" : "notification.create",
				resource_type: "notification",
				resource_id: id,
				before: initial.id ? initial : null,
				after: payload
			});
			if (status === "sent") {
				await supabase.rpc("dispatch_admin_notification", { p_notification_id: id });
				try {
					await supabase.functions.invoke("send-push-notification", { body: {
						title: title.trim(),
						body: body.trim(),
						channelId: "swiftspend_notifications",
						icon: "ic_stat_notification",
						color: "#10b981",
						userIds: payload.target_user_ids && payload.target_user_ids.length > 0 ? payload.target_user_ids : void 0,
						data: {
							notificationId: id,
							deep_link: deepLink.trim() || "/notifications"
						}
					} });
				} catch (pushErr) {
					console.warn("Push notification edge dispatch error:", pushErr);
				}
			}
			toast.success(status === "draft" ? "Draft saved" : status === "scheduled" ? "Notification scheduled" : "Notification sent");
			onSaved();
			onClose();
		} catch (e) {
			toast.error(e.message);
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (o) => !o && !saving && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initial.id ? "Edit notification" : "New notification" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "n-title",
								children: "Title *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "n-title",
								value: title,
								maxLength: 120,
								onChange: (e) => setTitle(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "n-body",
								children: "Message *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "n-body",
								rows: 4,
								value: body,
								maxLength: 1e3,
								onChange: (e) => setBody(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Target audience" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: audience,
									onValueChange: setAudience,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "all",
											children: "All Users"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "free",
											children: "Free Users Only"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "pro",
											children: "Pro Users Only"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "groups",
											children: "Specific Users/Groups"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "custom",
											children: "Custom"
										})
									] })]
								}),
								(audience === "groups" || audience === "custom") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "User IDs or group names, comma-separated",
									value: targets,
									onChange: (e) => setTargets(e.target.value)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Delivery" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
									value: delivery,
									onValueChange: setDelivery,
									className: "flex gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: "immediate" }), "Send immediately"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, { value: "scheduled" }), "Schedule for later"]
									})]
								}),
								delivery === "scheduled" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "datetime-local",
									"aria-label": "Schedule date and time",
									value: when,
									onChange: (e) => setWhen(e.target.value)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "n-link",
									children: "Deep link (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "n-link",
									placeholder: "app://upgrade",
									value: deepLink,
									onChange: (e) => setDeepLink(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "n-action",
									children: "Button text (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "n-action",
									placeholder: "Upgrade to Pro",
									value: actionText,
									onChange: (e) => setActionText(e.target.value)
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					disabled: saving,
					onClick: () => void save("draft"),
					children: "Save as draft"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: saving,
					onClick: () => void save("submit"),
					children: delivery === "scheduled" ? "Schedule" : "Send now"
				})] })
			]
		})
	});
}
export { NotificationsPage as component };
