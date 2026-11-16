import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-BhTUzQ_y.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-BcA_O_PB.mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
// node_modules/.nitro/vite/services/ssr/assets/adminUsers.functions-BPg5yd7h.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
async function ensureAdmin(ctx) {
	const { data, error } = await ctx.supabase.rpc("has_role", {
		_user_id: ctx.userId,
		_role: "admin"
	});
	if (error) throw new Error(error.message);
	if (!data) {
		const { data: sa } = await ctx.supabase.rpc("has_role", {
			_user_id: ctx.userId,
			_role: "super_admin"
		});
		if (!sa) throw new Error("Forbidden: admin role required");
	}
}
/** Update a user's status (freeze/suspend/block/restore/soft-delete). */
var setUserStatus_createServerFn_handler = createServerRpc({
	id: "978c7d915f863120cfd2b14b50fbc04876ce5f93b496c4222b3207d8bb3e0457",
	name: "setUserStatus",
	filename: "src/lib/adminUsers.functions.ts"
}, (opts) => setUserStatus.__executeServer(opts));
var setUserStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	userId: stringType().uuid(),
	status: StatusEnum
}).parse(i)).handler(setUserStatus_createServerFn_handler, async ({ data, context }) => {
	await ensureAdmin(context);
	const { supabaseAdmin } = await import("./client.server-DP5_l0A2.mjs");
	const { data: before } = await supabaseAdmin.from("profiles").select("status").eq("id", data.userId).maybeSingle();
	const { error } = await supabaseAdmin.from("profiles").update({ status: data.status }).eq("id", data.userId);
	if (error) throw new Error(error.message);
	return {
		ok: true,
		before: before?.status ?? null,
		after: data.status
	};
});
var sendPasswordReset_createServerFn_handler = createServerRpc({
	id: "c885a4a4687cfc55eb9955adb24d5bffd5f5e18dd5b6338ff9443f14a8b67296",
	name: "sendPasswordReset",
	filename: "src/lib/adminUsers.functions.ts"
}, (opts) => sendPasswordReset.__executeServer(opts));
var sendPasswordReset = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ email: stringType().email() }).parse(i)).handler(sendPasswordReset_createServerFn_handler, async ({ data, context }) => {
	await ensureAdmin(context);
	const { supabaseAdmin } = await import("./client.server-DP5_l0A2.mjs");
	const { error } = await supabaseAdmin.auth.admin.generateLink({
		type: "recovery",
		email: data.email
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var impersonateUser_createServerFn_handler = createServerRpc({
	id: "518f566b17ad14494106544eac5b123bd77dacae9406e47b506ee3a9f3307b61",
	name: "impersonateUser",
	filename: "src/lib/adminUsers.functions.ts"
}, (opts) => impersonateUser.__executeServer(opts));
var impersonateUser = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ email: stringType().email() }).parse(i)).handler(impersonateUser_createServerFn_handler, async ({ data, context }) => {
	await ensureAdmin(context);
	const { supabaseAdmin } = await import("./client.server-DP5_l0A2.mjs");
	const { data: link, error } = await supabaseAdmin.auth.admin.generateLink({
		type: "magiclink",
		email: data.email
	});
	if (error) throw new Error(error.message);
	return {
		ok: true,
		actionLink: link.properties?.action_link ?? null
	};
});
var deleteUser_createServerFn_handler = createServerRpc({
	id: "234a866abde1f5b58d23fca94cf7f905e19451ee35afd8065d6aca11dcaa9d85",
	name: "deleteUser",
	filename: "src/lib/adminUsers.functions.ts"
}, (opts) => deleteUser.__executeServer(opts));
var deleteUser = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ userId: stringType().uuid() }).parse(i)).handler(deleteUser_createServerFn_handler, async ({ data, context }) => {
	await ensureAdmin(context);
	const { supabaseAdmin } = await import("./client.server-DP5_l0A2.mjs");
	await supabaseAdmin.from("profiles").delete().eq("id", data.userId);
	const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
	if (error && !/not.?found/i.test(error.message)) throw new Error(error.message);
	return { ok: true };
});
var updateProfile_createServerFn_handler = createServerRpc({
	id: "6cf5ff4cd3edabc8dd53aff8be3afc34a060b3da8bd85a8915031ce6092ac2c7",
	name: "updateProfile",
	filename: "src/lib/adminUsers.functions.ts"
}, (opts) => updateProfile.__executeServer(opts));
var updateProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
	userId: stringType().uuid(),
	full_name: stringType().trim().max(120).optional(),
	country: stringType().trim().max(80).optional().nullable(),
	platform: stringType().trim().max(40).optional().nullable()
}).parse(i)).handler(updateProfile_createServerFn_handler, async ({ data, context }) => {
	await ensureAdmin(context);
	const { supabaseAdmin } = await import("./client.server-DP5_l0A2.mjs");
	const patch = {};
	if (data.full_name !== void 0) patch.full_name = data.full_name;
	if (data.country !== void 0) patch.country = data.country;
	if (data.platform !== void 0) patch.platform = data.platform;
	const { data: before } = await supabaseAdmin.from("profiles").select("full_name, country, platform").eq("id", data.userId).maybeSingle();
	const { error } = await supabaseAdmin.from("profiles").update(patch).eq("id", data.userId);
	if (error) throw new Error(error.message);
	return {
		ok: true,
		before: before ?? null,
		after: {
			full_name: patch.full_name ?? null,
			country: patch.country ?? null,
			platform: patch.platform ?? null
		}
	};
});
export { deleteUser_createServerFn_handler, impersonateUser_createServerFn_handler, sendPasswordReset_createServerFn_handler, setUserStatus_createServerFn_handler, updateProfile_createServerFn_handler };
