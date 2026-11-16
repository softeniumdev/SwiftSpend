import { t as Forbidden } from "./Forbidden-JIo-79Il.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/forbidden-Da29dSra.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "flex min-h-screen flex-col bg-background",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Forbidden, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "pb-6 text-center text-xs text-muted-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/auth",
			className: "underline hover:text-foreground",
			children: "Sign in with another account"
		})
	})]
});
export { SplitComponent as component };
