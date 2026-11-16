import { o as __toESM, r as __exportAll } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, w as useRouter, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/router-DUs2z4nX.js
var router_DUs2z4nX_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BXC2ypah.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: "404 · Not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-2xl font-semibold",
					children: "This page doesn't exist"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90",
					children: "Go home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. You can retry or head back to the dashboard."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset?.();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$22 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Budget Buddy · Admin Console" },
			{
				name: "description",
				content: "Internal admin console for Budget Buddy — users, subscriptions, revenue, moderation, and remote config."
			},
			{
				name: "robots",
				content: "noindex, nofollow"
			},
			{
				property: "og:title",
				content: "Budget Buddy · Admin Console"
			},
			{
				property: "og:description",
				content: "Internal admin console for Budget Buddy."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$22.useRouteContext();
	(0, import_react.useEffect)(() => {
		import("./remember-DXJr3Vgh.mjs").then((m) => m.enforceRememberMe());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})]
	});
}
var $$splitComponentImporter$21 = () => import("./routes-CbBINhy1.mjs");
var Route$21 = createFileRoute("/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./route-DG9SXMR9.mjs");
var Route$20 = createFileRoute("/_authenticated")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./auth-qHSRImFq.mjs");
var Route$19 = createFileRoute("/auth")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./forbidden-Da29dSra.mjs");
var Route$18 = createFileRoute("/forbidden")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./forgot-password-Q7B-VhA4.mjs");
var Route$17 = createFileRoute("/forgot-password")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./reset-password-DM9bW8JA.mjs");
var Route$16 = createFileRoute("/reset-password")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./ad-manager-B4u1C_OQ.mjs");
var Route$15 = createFileRoute("/_authenticated/ad-manager")({
	head: () => ({ meta: [
		{ title: "Advertisement Manager · Budget Buddy Admin" },
		{
			name: "description",
			content: "Create, schedule and control every ad shown in the mobile app."
		},
		{
			property: "og:title",
			content: "Advertisement Manager · Budget Buddy Admin"
		},
		{
			property: "og:description",
			content: "Create, schedule and control every ad shown in the mobile app."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./advertising-D753uQsk.mjs");
var Route$14 = createFileRoute("/_authenticated/advertising")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./audit-logs-DbulUh7j.mjs");
var Route$13 = createFileRoute("/_authenticated/audit-logs")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./content-C3TGdDnw.mjs");
var Route$12 = createFileRoute("/_authenticated/content")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./dashboard-CB2Wjt6V.mjs");
var Route$11 = createFileRoute("/_authenticated/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./finance-CvkhJLO-.mjs");
var Route$10 = createFileRoute("/_authenticated/finance")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./moderation-BmsIDIg3.mjs");
var Route$9 = createFileRoute("/_authenticated/moderation")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./notifications-iGnaL_2F.mjs");
var Route$8 = createFileRoute("/_authenticated/notifications")({
	head: () => ({ meta: [{ title: "Notification Center · Budget Buddy Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./remote-config-Cc7qMlMu.mjs");
var Route$7 = createFileRoute("/_authenticated/remote-config")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./reports-B8E8kdIg.mjs");
var Route$6 = createFileRoute("/_authenticated/reports")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./revenue-C34--NV3.mjs");
var Route$5 = createFileRoute("/_authenticated/revenue")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./settings-BoeD1qcj.mjs");
var Route$4 = createFileRoute("/_authenticated/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./subscriptions-DLH9491D.mjs");
var Route$3 = createFileRoute("/_authenticated/subscriptions")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./support-DXW_8fYt.mjs");
var Route$2 = createFileRoute("/_authenticated/support")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./users.index-B4UlylIr.mjs");
var Route$1 = createFileRoute("/_authenticated/users/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./users._userId-BEERYGQl.mjs");
var Route = createFileRoute("/_authenticated/users/$userId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$21.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$22
});
var AuthenticatedRouteRoute = Route$20.update({
	id: "/_authenticated",
	getParentRoute: () => Route$22
});
var AuthRoute = Route$19.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$22
});
var ForbiddenRoute = Route$18.update({
	id: "/forbidden",
	path: "/forbidden",
	getParentRoute: () => Route$22
});
var ForgotPasswordRoute = Route$17.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$22
});
var ResetPasswordRoute = Route$16.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$22
});
var AuthenticatedAdManagerRoute = Route$15.update({
	id: "/ad-manager",
	path: "/ad-manager",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdvertisingRoute = Route$14.update({
	id: "/advertising",
	path: "/advertising",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAuditLogsRoute = Route$13.update({
	id: "/audit-logs",
	path: "/audit-logs",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedContentRoute = Route$12.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$11.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFinanceRoute = Route$10.update({
	id: "/finance",
	path: "/finance",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedModerationRoute = Route$9.update({
	id: "/moderation",
	path: "/moderation",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$8.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRemoteConfigRoute = Route$7.update({
	id: "/remote-config",
	path: "/remote-config",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedReportsRoute = Route$6.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRevenueRoute = Route$5.update({
	id: "/revenue",
	path: "/revenue",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$4.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSubscriptionsRoute = Route$3.update({
	id: "/subscriptions",
	path: "/subscriptions",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSupportRoute = Route$2.update({
	id: "/support",
	path: "/support",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedUsersIndexRoute = Route$1.update({
	id: "/users/",
	path: "/users/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdManagerRoute,
	AuthenticatedAdvertisingRoute,
	AuthenticatedAuditLogsRoute,
	AuthenticatedContentRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedFinanceRoute,
	AuthenticatedModerationRoute,
	AuthenticatedNotificationsRoute,
	AuthenticatedRemoteConfigRoute,
	AuthenticatedReportsRoute,
	AuthenticatedRevenueRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedSubscriptionsRoute,
	AuthenticatedSupportRoute,
	AuthenticatedUsersUserIdRoute: Route.update({
		id: "/users/$userId",
		path: "/users/$userId",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedUsersIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	ForbiddenRoute,
	ForgotPasswordRoute,
	ResetPasswordRoute
};
var routeTree = Route$22._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient({ defaultOptions: {
		queries: {
			staleTime: 6e4,
			gcTime: 6e5,
			refetchOnWindowFocus: false,
			refetchOnReconnect: "always",
			retry: 1
		},
		mutations: { retry: 0 }
	} });
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultPreloadDelay: 50
	});
};
export { getRouter, router_DUs2z4nX_exports as t };
