import { a as __toESM } from "../_runtime.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { t as Checkbox } from "./checkbox-D7fL-acd.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DJmpbwhv.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { setRememberMe } from "./remember-DXJr3Vgh.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as ShieldCheck, Q as LoaderCircle, a as Wallet } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/auth-qHSRImFq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [remember, setRemember] = (0, import_react.useState)(true);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.auth.getSession();
			if (data.session) navigate({
				to: "/dashboard",
				replace: true
			});
		})();
	}, [navigate]);
	const signIn = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) {
			await logAudit({
				action: "auth.signin_failed",
				resource_type: "auth",
				extra: {
					email,
					reason: error.message
				}
			});
			return toast.error(error.message);
		}
		setRememberMe(remember);
		await logAudit({
			action: "auth.signin",
			resource_type: "auth"
		});
		navigate({
			to: "/dashboard",
			replace: true
		});
	};
	const signUp = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: window.location.origin,
				data: { full_name: name }
			}
		});
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("Account created. Ask an existing admin to grant you a role, then sign in.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: "Budget Buddy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-sidebar-foreground/60",
						children: "Admin Console"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-semibold leading-tight",
							children: "Run the numbers behind Budget Buddy."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-sidebar-foreground/70",
							children: "One command center for subscriptions, revenue, moderation, and remote config — wired directly to production with role-based access, audit logs, and RLS-enforced queries."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3 text-xs text-sidebar-foreground/80",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-sidebar-primary" }), "Every action is scoped by role and recorded to the audit log."]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-sidebar-foreground/50",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Budget Buddy. Internal use only."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "w-full max-w-md p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 space-y-1 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Welcome back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Sign in with your admin credentials"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "signin",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "signin",
								children: "Sign in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "signup",
								children: "Create account"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "signin",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: signIn,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "email",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value),
											autoComplete: "email"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "password",
												children: "Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/forgot-password",
												className: "text-xs text-muted-foreground hover:text-foreground",
												children: "Forgot password?"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "password",
											type: "password",
											required: true,
											value: password,
											onChange: (e) => setPassword(e.target.value),
											autoComplete: "current-password"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex cursor-pointer items-center gap-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: remember,
											onCheckedChange: (v) => setRemember(v === true)
										}), "Remember me on this device"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										className: "w-full",
										disabled: loading,
										children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Sign in"]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "signup",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: signUp,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "name",
											children: "Full name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "name",
											required: true,
											value: name,
											onChange: (e) => setName(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "email-up",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "email-up",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value),
											autoComplete: "email"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "password-up",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "password-up",
											type: "password",
											minLength: 8,
											required: true,
											value: password,
											onChange: (e) => setPassword(e.target.value),
											autoComplete: "new-password"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										className: "w-full",
										disabled: loading,
										children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Create account"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-center text-xs text-muted-foreground",
										children: "New accounts have no admin access until a role is granted."
									})
								]
							})
						})
					]
				})]
			})
		})]
	});
}
export { AuthPage as component };
