import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { rt as Inbox } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/EmptyState-DTeUUI_J.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ icon: Icon = Inbox, title, description, action, className, illustration = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("relative flex flex-col items-center justify-center gap-3 overflow-hidden p-12 text-center page-in", className),
		children: [
			illustration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]",
				viewBox: "0 0 400 200",
				preserveAspectRatio: "xMidYMid slice",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pattern", {
						id: "es-grid",
						width: "24",
						height: "24",
						patternUnits: "userSpaceOnUse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M24 0H0V24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "0.6"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "es-fade",
						cx: "50%",
						cy: "50%",
						r: "50%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "currentColor",
							stopOpacity: "1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "currentColor",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mask", {
						id: "es-mask",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							width: "400",
							height: "200",
							fill: "url(#es-fade)"
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "400",
					height: "200",
					fill: "url(#es-grid)",
					mask: "url(#es-mask)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 rounded-full bg-primary/5 blur-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative rounded-full border border-border/60 bg-muted/60 p-4 text-muted-foreground shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "h-8 w-8",
						"aria-hidden": "true"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "relative mt-1 text-lg font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative max-w-md text-sm text-muted-foreground",
				children: description
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-2",
				children: action
			})
		]
	});
}
export { EmptyState as t };
