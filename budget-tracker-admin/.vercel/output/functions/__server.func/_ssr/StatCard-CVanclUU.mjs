import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Vt as ArrowDownRight, zt as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
// node_modules/.nitro/vite/services/ssr/assets/StatCard-CVanclUU.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, icon: Icon, delta, hint, loading }) {
	const positive = (delta ?? 0) >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { duration: .25 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5 shadow-elevated",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
							children: label
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-24 animate-pulse rounded bg-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-semibold tracking-tight",
							children: value
						}),
						hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: hint
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg bg-primary/10 p-2 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				})]
			}), typeof delta === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-4 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"),
				children: [
					positive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-3 w-3" }),
					Math.abs(delta).toFixed(1),
					"% vs last period"
				]
			})]
		})
	});
}
export { StatCard as t };
