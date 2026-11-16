import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as StatCard } from "./StatCard-CVanclUU.mjs";
import { t as StatusBadge } from "./StatusBadge-DZp6xNSP.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { n as formatCurrency, r as formatDate } from "./format-D3NUXAym.mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { gt as CreditCard } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/subscriptions-DLH9491D.js
var import_jsx_runtime = require_jsx_runtime();
function SubscriptionsPage() {
	const query = useQuery({
		queryKey: ["subscriptions-list"],
		queryFn: async () => {
			const { data, error } = await supabase.from("subscriptions").select("*").order("created_at", { ascending: false }).limit(200);
			if (error) throw error;
			return data ?? [];
		}
	});
	const rows = query.data ?? [];
	const active = rows.filter((r) => r.status === "active").length;
	const trialing = rows.filter((r) => r.status === "trialing").length;
	const past_due = rows.filter((r) => r.status === "past_due").length;
	const churnedPct = rows.length ? (rows.filter((r) => r.status === "canceled").length / rows.length * 100).toFixed(1) : "0";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Subscriptions",
			description: "Plans, statuses, and billing cadence across all customers."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Active",
					value: String(active),
					icon: CreditCard
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Trialing",
					value: String(trialing),
					icon: CreditCard
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Past due",
					value: String(past_due),
					icon: CreditCard
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Churn",
					value: `${churnedPct}%`,
					icon: CreditCard
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-4",
			children: query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: CreditCard,
				title: "No subscriptions yet",
				description: "Once users subscribe from the mobile app, they'll show up here in real time."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Plan" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Interval" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Started" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Renews" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "capitalize",
					children: s.plan
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: s.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono",
					children: formatCurrency(s.amount_cents, s.currency)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "capitalize text-sm text-muted-foreground",
					children: s.interval
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-sm text-muted-foreground",
					children: formatDate(s.started_at)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-sm text-muted-foreground",
					children: s.renews_at ? formatDate(s.renews_at) : "—"
				})
			] }, s.id)) })] })
		})
	] });
}
export { SubscriptionsPage as component };
