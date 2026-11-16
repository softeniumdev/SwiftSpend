import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
// node_modules/.nitro/vite/services/ssr/assets/useRealtimeInvalidate-Bt8_dkae.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Subscribe to postgres changes on the given tables and invalidate
* the given query keys on any change. Enables true real-time dashboards.
*/
function useRealtimeInvalidate(tables, queryKey) {
	const qc = useQueryClient();
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel(`rt-${queryKey.join("-")}`);
		tables.forEach((t) => {
			channel.on("postgres_changes", {
				event: "*",
				schema: "public",
				table: t
			}, () => {
				qc.invalidateQueries({ queryKey });
			});
		});
		channel.subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [qc, queryKey.join("-")]);
}
export { useRealtimeInvalidate as t };
