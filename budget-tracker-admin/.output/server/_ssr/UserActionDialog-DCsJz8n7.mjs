import { a as __toESM } from "../_runtime.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-lDcqPMk8.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Q as LoaderCircle } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/UserActionDialog-DCsJz8n7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UserActionDialog({ open, onOpenChange, title, description, confirmLabel = "Confirm", destructive, onConfirm }) {
	const [loading, setLoading] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		open,
		onOpenChange: (o) => !loading && onOpenChange(o),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: description })
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
			disabled: loading,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
			disabled: loading,
			onClick: async (e) => {
				e.preventDefault();
				try {
					setLoading(true);
					await onConfirm();
					onOpenChange(false);
				} finally {
					setLoading(false);
				}
			},
			className: cn(destructive && "bg-destructive text-destructive-foreground hover:bg-destructive/90"),
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : confirmLabel
		})] })] })
	});
}
export { UserActionDialog as t };
