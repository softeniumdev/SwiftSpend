import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/StatusBadge-DZp6xNSP.js
var import_jsx_runtime = require_jsx_runtime();
var MAP = {
	active: "bg-success/15 text-success border-success/20",
	trialing: "bg-info/15 text-info border-info/20",
	past_due: "bg-warning/20 text-warning-foreground border-warning/30",
	canceled: "bg-muted text-muted-foreground border-border",
	suspended: "bg-destructive/15 text-destructive border-destructive/20",
	deleted: "bg-destructive/15 text-destructive border-destructive/20",
	succeeded: "bg-success/15 text-success border-success/20",
	pending: "bg-warning/20 text-warning-foreground border-warning/30",
	failed: "bg-destructive/15 text-destructive border-destructive/20",
	refunded: "bg-muted text-muted-foreground border-border",
	paused: "bg-warning/20 text-warning-foreground border-warning/30",
	ended: "bg-muted text-muted-foreground border-border",
	draft: "bg-muted text-muted-foreground border-border",
	scheduled: "bg-info/15 text-info border-info/20",
	sent: "bg-success/15 text-success border-success/20",
	review: "bg-info/15 text-info border-info/20",
	published: "bg-success/15 text-success border-success/20",
	archived: "bg-muted text-muted-foreground border-border",
	open: "bg-info/15 text-info border-info/20",
	reviewing: "bg-warning/20 text-warning-foreground border-warning/30",
	resolved: "bg-success/15 text-success border-success/20",
	dismissed: "bg-muted text-muted-foreground border-border",
	closed: "bg-muted text-muted-foreground border-border",
	low: "bg-muted text-muted-foreground border-border",
	medium: "bg-info/15 text-info border-info/20",
	normal: "bg-info/15 text-info border-info/20",
	high: "bg-warning/20 text-warning-foreground border-warning/30",
	urgent: "bg-destructive/15 text-destructive border-destructive/20",
	critical: "bg-destructive/15 text-destructive border-destructive/20"
};
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("font-medium capitalize", MAP[status] ?? ""),
		children: status.replace("_", " ")
	});
}
export { StatusBadge as t };
