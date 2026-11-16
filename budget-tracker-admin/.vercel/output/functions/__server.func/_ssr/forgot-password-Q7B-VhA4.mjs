import { o as __toESM } from "../_runtime.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Bt as ArrowLeft, J as Mail, Q as LoaderCircle } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/forgot-password-Q7B-VhA4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPassword() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
		setLoading(false);
		if (error) return toast.error(error.message);
		setSent(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-md p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/auth",
					className: "mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Back to sign in"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-semibold",
						children: "Forgot your password?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Enter your admin email and we'll send you a secure reset link."
					})]
				}),
				sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-primary/20 bg-primary/5 p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-primary" }), " Check your inbox"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: [
							"If ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: email
							}),
							" is registered, you'll receive an email with a reset link within a minute. The link expires in 1 hour."
						]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							required: true,
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full",
						disabled: loading,
						children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Send reset link"]
					})]
				})
			]
		})
	});
}
export { ForgotPassword as component };
