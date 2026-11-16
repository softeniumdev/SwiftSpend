import { a as __toESM } from "../_runtime.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-BhTUzQ_y.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BcA_O_PB.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { q as isRedirect, w as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
// node_modules/.nitro/vite/services/ssr/assets/adminUsers.functions-Be7w9yLa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var StatusEnum = enumType([
	"active",
	"frozen",
	"suspended",
	"blocked",
	"deleted"
]);
/** Update a user's status (freeze/suspend/block/restore/soft-delete). */
var setUserStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	userId: stringType().uuid(),
	status: StatusEnum
}).parse(i)).handler(createSsrRpc("978c7d915f863120cfd2b14b50fbc04876ce5f93b496c4222b3207d8bb3e0457"));
/** Send a password reset email through Supabase Auth. */
var sendPasswordReset = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ email: stringType().email() }).parse(i)).handler(createSsrRpc("c885a4a4687cfc55eb9955adb24d5bffd5f5e18dd5b6338ff9443f14a8b67296"));
/** Generate a magic link the admin can use to "impersonate" the target user. */
var impersonateUser = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ email: stringType().email() }).parse(i)).handler(createSsrRpc("518f566b17ad14494106544eac5b123bd77dacae9406e47b506ee3a9f3307b61"));
/** Permanently delete a user from Auth (cascades to profiles via FK). */
var deleteUser = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ userId: stringType().uuid() }).parse(i)).handler(createSsrRpc("234a866abde1f5b58d23fca94cf7f905e19451ee35afd8065d6aca11dcaa9d85"));
/** Update basic profile fields (edit user). */
var updateProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	userId: stringType().uuid(),
	full_name: stringType().trim().max(120).optional(),
	country: stringType().trim().max(80).optional().nullable(),
	platform: stringType().trim().max(40).optional().nullable()
}).parse(i)).handler(createSsrRpc("6cf5ff4cd3edabc8dd53aff8be3afc34a060b3da8bd85a8915031ce6092ac2c7"));
export { updateProfile as a, setUserStatus as i, impersonateUser as n, useServerFn as o, sendPasswordReset as r, deleteUser as t };
