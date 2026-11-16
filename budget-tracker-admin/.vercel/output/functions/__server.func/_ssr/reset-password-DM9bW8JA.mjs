import { o as __toESM } from "../_runtime.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as ShieldCheck, Q as LoaderCircle } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/reset-password-DM9bW8JA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [recoveryReady, setRecoveryReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const { data } = supabase.auth.onAuthStateChange((event) => {
			if (event === "PASSWORD_RECOVERY") setRecoveryReady(true);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setRecoveryReady(true);
		});
		return () => data.subscription.unsubscribe();
	}, []);
	const submit = async (e) => {
		e.preventDefault();
		if (password.length < 8) return toast.error("Password must be at least 8 characters.");
		if (password !== confirm) return toast.error("Passwords do not match.");
		setLoading(true);
		const { error } = await supabase.auth.updateUser({ password });
		setLoading(false);
		if (error) return toast.error(error.message);
		await logAudit({
			action: "auth.password_reset",
			resource_type: "auth"
		});
		toast.success("Password updated. Please sign in.");
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-md p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Set a new password"
				})]
			}), !recoveryReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Waiting for the recovery link… If you didn't arrive here from a password reset email, request a new link from the sign-in page."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "new-pass",
								children: "New password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "new-pass",
								type: "password",
								autoComplete: "new-password",
								required: true,
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "At least 8 characters. Longer is better."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "confirm-pass",
							children: "Confirm password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "confirm-pass",
							type: "password",
							autoComplete: "new-password",
							required: true,
							minLength: 8,
							value: confirm,
							onChange: (e) => setConfirm(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full",
						disabled: loading,
						children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Update password"]
					})
				]
			})]
		})
	});
}
export { ResetPassword as component };
