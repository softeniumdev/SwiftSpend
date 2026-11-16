import { t as cn } from "./utils-DWGjSd5x.mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/TableSkeleton-rxXHjEnC.js
var import_jsx_runtime = require_jsx_runtime();
function TableSkeleton({ rows = 8, cols = 5, className, showHeader = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-2", className),
		role: "status",
		"aria-label": "Loading data",
		children: [
			showHeader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-3 border-b pb-2",
				children: Array.from({ length: cols }).map((_, c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 flex-1 rounded shimmer bg-muted/60" }, c))
			}),
			Array.from({ length: rows }).map((_, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-3 py-1",
				children: Array.from({ length: cols }).map((_, c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-8 flex-1 rounded shimmer bg-muted/60", c === 0 && "max-w-[24%]", c === cols - 1 && "max-w-[10%]") }, c))
			}, r)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Loading…"
			})
		]
	});
}
export { TableSkeleton as t };
