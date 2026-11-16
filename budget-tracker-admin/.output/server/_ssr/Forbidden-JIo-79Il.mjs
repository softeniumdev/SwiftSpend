import { t as Button } from "./button-BRHp6KPB.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { S as ShieldOff } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/Forbidden-JIo-79Il.js
var import_jsx_runtime = require_jsx_runtime();
function Forbidden({ requiredRoles, userRoles }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-1 items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: "403 · Forbidden"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-semibold",
					children: "You don't have access to this page"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Your role doesn't include permission for this area. Ask a Super Admin to grant access."
				}),
				requiredRoles && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						"Required: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono",
							children: requiredRoles.join(", ")
						}),
						userRoles && userRoles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							" ",
							"· You have ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: userRoles.join(", ")
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						children: "Back to dashboard"
					})
				})
			]
		})
	});
}
export { Forbidden as t };
