import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as EmptyState } from "./EmptyState-DTeUUI_J.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as StatusBadge } from "./StatusBadge-DZp6xNSP.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-CSUWlZQQ.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { a as formatNumber, r as formatDate } from "./format-D3NUXAym.mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { ct as FileText } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/content-C3TGdDnw.js
var import_jsx_runtime = require_jsx_runtime();
function ContentPage() {
	const query = useQuery({
		queryKey: ["content-posts"],
		queryFn: async () => {
			const { data, error } = await supabase.from("content_posts").select("*").order("updated_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const rows = query.data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Content",
		description: "Articles and tips surfaced inside the Budget Buddy mobile app.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "New post" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-4",
		children: query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: FileText,
			title: "No posts yet",
			description: "Create your first tip or article to publish it to mobile users.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "New post" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Title" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Category" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "text-right",
				children: "Views"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Published" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Updated" })
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-medium",
				children: p.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-mono text-xs text-muted-foreground",
				children: ["/", p.slug]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				children: p.category
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: p.status }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right font-mono",
				children: formatNumber(Number(p.views))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-sm text-muted-foreground",
				children: p.published_at ? formatDate(p.published_at) : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-sm text-muted-foreground",
				children: formatDate(p.updated_at)
			})
		] }, p.id)) })] })
	})] });
}
export { ContentPage as component };
