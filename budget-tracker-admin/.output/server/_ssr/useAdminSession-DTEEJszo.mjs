import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/useAdminSession-DTEEJszo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Pages -> roles allowed to see them.
* `super_admin` implicitly gets everything (enforced in hasPermission).
*/
var PAGE_ROLES = {
	"/dashboard": [
		"admin",
		"moderator",
		"support",
		"analyst"
	],
	"/users": ["admin", "support"],
	"/subscriptions": [
		"admin",
		"support",
		"analyst"
	],
	"/revenue": ["admin", "analyst"],
	"/finance": ["admin", "analyst"],
	"/advertising": ["admin", "analyst"],
	"/content": ["admin", "moderator"],
	"/moderation": ["admin", "moderator"],
	"/support": ["admin", "support"],
	"/reports": ["admin", "analyst"],
	"/remote-config": ["admin"],
	"/notifications": ["admin"],
	"/ad-manager": ["admin"],
	"/settings": ["admin"],
	"/audit-logs": ["admin"]
};
var STAFF_ROLES = [
	"super_admin",
	"admin",
	"moderator",
	"support",
	"analyst"
];
function hasAnyRole(userRoles, allowed) {
	if (userRoles.includes("super_admin")) return true;
	return allowed.some((r) => userRoles.includes(r));
}
function canAccessPath(userRoles, path) {
	if (userRoles.includes("super_admin")) return true;
	const match = Object.entries(PAGE_ROLES).find(([p]) => path === p || path.startsWith(p + "/"));
	if (!match) return true;
	return hasAnyRole(userRoles, match[1]);
}
function useAdminSession() {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [session, setSession] = (0, import_react.useState)(null);
	const [roles, setRoles] = (0, import_react.useState)([]);
	const loadRoles = async (uid) => {
		if (!uid) {
			setRoles([]);
			return;
		}
		const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
		setRoles((data ?? []).map((r) => r.role));
	};
	const refresh = async () => {
		const { data } = await supabase.auth.getSession();
		setSession(data.session);
		await loadRoles(data.session?.user.id);
	};
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
			setSession(s);
			loadRoles(s?.user.id);
		});
		(async () => {
			await refresh();
			setLoading(false);
		})();
		return () => sub.subscription.unsubscribe();
	}, []);
	const isAdmin = roles.includes("admin") || roles.includes("super_admin");
	const isStaff = hasAnyRole(roles, STAFF_ROLES);
	return {
		loading,
		session,
		user: session?.user ?? null,
		roles,
		isAdmin,
		isStaff,
		hasRole: (r) => roles.includes(r) || roles.includes("super_admin"),
		hasAnyRole: (rs) => hasAnyRole(roles, rs),
		canAccess: (p) => canAccessPath(roles, p),
		refresh
	};
}
export { useAdminSession as n, PAGE_ROLES as t };
