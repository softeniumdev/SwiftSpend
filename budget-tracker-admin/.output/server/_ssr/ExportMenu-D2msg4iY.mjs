import { t as Button } from "./button-BRHp6KPB.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-DoXW0ikn.mjs";
import { n as exportExcel, r as exportPDF, t as exportCSV } from "./export-B050p1Wk.mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { ct as FileText, lt as FileSpreadsheet, pt as Download, st as FileTypeCorner } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/ExportMenu-D2msg4iY.js
var import_jsx_runtime = require_jsx_runtime();
function ExportMenu({ filename, title, rows, size = "sm", label, variant = "outline" }) {
	const resolve = () => typeof rows === "function" ? rows() : rows;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size,
			variant,
			className: "h-8 gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), label ?? "Export"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
				className: "text-xs",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => exportCSV(filename, resolve()),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-2 h-4 w-4" }), " CSV"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => exportExcel(filename, resolve()),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "mr-2 h-4 w-4" }), " Excel"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => exportPDF(filename, title, resolve()),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTypeCorner, { className: "mr-2 h-4 w-4" }), " PDF"]
			})
		]
	})] });
}
export { ExportMenu as t };
