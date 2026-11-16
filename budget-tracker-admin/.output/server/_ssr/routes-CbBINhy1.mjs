import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Q as LoaderCircle } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-CbBINhy1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.auth.getSession();
			navigate({
				to: data.session ? "/dashboard" : "/auth",
				replace: true
			});
		})();
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
}
export { Landing as component };
