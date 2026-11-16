import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as StatCard } from "./StatCard-CVanclUU.mjs";
import { t as StatusBadge } from "./StatusBadge-DZp6xNSP.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { i as formatDateTime, n as formatCurrency } from "./format-D3NUXAym.mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as Receipt, mt as DollarSign } from "../_libs/lucide-react.mjs";
import { _ as Tooltip, c as XAxis, d as Line, f as CartesianGrid, o as LineChart, s as YAxis, y as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
import { a as subDays, f as format } from "../_libs/date-fns.mjs";
// node_modules/.nitro/vite/services/ssr/assets/revenue-C34--NV3.js
var import_jsx_runtime = require_jsx_runtime();
function RevenuePage() {
	const query = useQuery({
		queryKey: ["revenue-tx"],
		queryFn: async () => {
			const { data, error } = await supabase.from("transactions").select("*").order("created_at", { ascending: false }).limit(500);
			if (error) throw error;
			return data ?? [];
		}
	});
	const tx = query.data ?? [];
	const getCents = (t) => Number(t.amount_cents || (t.amount ? t.amount * 100 : 0));
	const gross = tx.filter((t) => t.status === "succeeded" && t.type === "charge").reduce((s, t) => s + getCents(t), 0);
	const refunded = tx.filter((t) => t.type === "refund").reduce((s, t) => s + Math.abs(getCents(t)), 0);
	const failed = tx.filter((t) => t.status === "failed").length;
	const net = gross - refunded;
	const trend = Array.from({ length: 30 }, (_, i) => subDays(/* @__PURE__ */ new Date(), 29 - i)).map((d) => {
		const key = format(d, "MMM d");
		return {
			day: key,
			revenue: tx.filter((t) => t.status === "succeeded" && t.type === "charge" && format(new Date(t.created_at), "MMM d") === key).reduce((s, t) => s + getCents(t), 0) / 100
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Revenue",
			description: "Charges, refunds, and payouts across the last 500 transactions."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Gross revenue",
					value: formatCurrency(gross),
					icon: DollarSign
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Refunded",
					value: formatCurrency(refunded),
					icon: Receipt
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Net revenue",
					value: formatCurrency(net),
					icon: DollarSign
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Failed charges",
					value: String(failed),
					icon: Receipt
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold",
					children: "Daily revenue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Last 30 days"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: trend,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--color-border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								stroke: "var(--color-muted-foreground)",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "var(--color-muted-foreground)",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--color-popover)",
								border: "1px solid var(--color-border)",
								borderRadius: 8,
								fontSize: 12
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "revenue",
								stroke: "var(--color-chart-1)",
								strokeWidth: 2,
								dot: false
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-4",
			children: query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {}) : tx.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Receipt,
				title: "No transactions yet",
				description: "Charges, refunds, and payouts will appear here as they process."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Description" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: tx.slice(0, 100).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs text-muted-foreground",
					children: t.id.slice(0, 8)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "capitalize",
					children: t.type
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono",
					children: formatCurrency(t.amount_cents, t.currency)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-sm text-muted-foreground",
					children: t.description ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-sm text-muted-foreground",
					children: formatDateTime(t.created_at)
				})
			] }, t.id)) })] })
		})
	] });
}
export { RevenuePage as component };
