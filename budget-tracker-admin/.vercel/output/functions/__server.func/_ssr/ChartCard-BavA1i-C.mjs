import { t as Card } from "./card-BeT1cn4g.mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/ChartCard-BavA1i-C.js
var import_jsx_runtime = require_jsx_runtime();
function ChartCard({ title, description, actions, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: `p-5 shadow-elevated ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: title
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: description
			})] }), actions]
		}), children]
	});
}
var tooltipStyle = {
	background: "var(--color-popover)",
	border: "1px solid var(--color-border)",
	borderRadius: 8,
	fontSize: 12,
	color: "var(--color-popover-foreground)"
};
export { tooltipStyle as n, ChartCard as t };
