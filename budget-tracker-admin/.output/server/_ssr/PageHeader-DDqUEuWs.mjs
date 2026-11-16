import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/PageHeader-DDqUEuWs.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-start justify-between gap-4 pb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight",
			children: title
		}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: description
		})] }), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: actions
		})]
	});
}
export { PageHeader as t };
