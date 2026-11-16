globalThis.__nitro_main__ = import.meta.url;
import { t as HookableCore } from "./_libs/hookable.mjs";
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
// #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
// #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/ChartCard-DJ19Jatk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"48a6-qHJOpzipf7HdBkraYxoe/gMBBGA\"",
		"mtime": "2026-11-16T18:31:33.913Z",
		"size": 18598,
		"path": "../public/assets/ChartCard-DJ19Jatk.js"
	},
	"/assets/Combination-BWBho2HD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5831-0pDkCtQVMRPvv2hXLYm9x6HX2+c\"",
		"mtime": "2026-11-16T18:31:33.913Z",
		"size": 22577,
		"path": "../public/assets/Combination-BWBho2HD.js"
	},
	"/assets/EmptyState-BAbCr0DK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f8-Vm+rypqPyzP9fwDa8fpQVtl1n3E\"",
		"mtime": "2026-11-16T18:31:33.913Z",
		"size": 2040,
		"path": "../public/assets/EmptyState-BAbCr0DK.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-11-16T18:31:35.236Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/Forbidden-DkEttboU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54e-7ZGM8HZ0MCyieUpvOCwj1MDpVp0\"",
		"mtime": "2026-11-16T18:31:33.913Z",
		"size": 1358,
		"path": "../public/assets/Forbidden-DkEttboU.js"
	},
	"/assets/ExportMenu-DW6stf4w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a5-m/vfVXNGraMRd+tmZOGuIUZb97k\"",
		"mtime": "2026-11-16T18:31:33.913Z",
		"size": 1445,
		"path": "../public/assets/ExportMenu-DW6stf4w.js"
	},
	"/assets/BarChart-C2TmuvBp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8dd-LreKR3a6MstCrHoX8qEjk8IA8AE\"",
		"mtime": "2026-11-16T18:31:33.913Z",
		"size": 47325,
		"path": "../public/assets/BarChart-C2TmuvBp.js"
	},
	"/assets/PageHeader-BFDwcmVo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-PINt62GDHlA0atbt7ezEuDOKxFQ\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 487,
		"path": "../public/assets/PageHeader-BFDwcmVo.js"
	},
	"/assets/StatusBadge-Cutcsjbo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"795-zQqvNQwgxcWwEJfGlu4xS/CF6V4\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 1941,
		"path": "../public/assets/StatusBadge-Cutcsjbo.js"
	},
	"/assets/TableSkeleton-B_us_qL5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f3-PVpxwyDqaW6lTd0qbCrvdVAgzrk\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 755,
		"path": "../public/assets/TableSkeleton-B_us_qL5.js"
	},
	"/assets/UserActionDialog-Ci0qR-UR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3dd-aPJ8+tTW6LFkHpUol/ElmhEQMaU\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 989,
		"path": "../public/assets/UserActionDialog-Ci0qR-UR.js"
	},
	"/assets/StatCard-C39fkoeV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ddde-C917zmrVLtrS4ZdZPxrdNvRshYA\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 122334,
		"path": "../public/assets/StatCard-C39fkoeV.js"
	},
	"/assets/adminUsers.functions-CzcBBik-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b0f-hB+Q8gSsQxVr+TyyZvDMqPcqKQ8\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 6927,
		"path": "../public/assets/adminUsers.functions-CzcBBik-.js"
	},
	"/assets/LineChart-9OYcW175.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a022-DoGMTK2rrKPo9eK4daDyqOkxk3c\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 368674,
		"path": "../public/assets/LineChart-9OYcW175.js"
	},
	"/assets/ad-manager-Dstn-pS6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d56-Dp1UFtHCfEMnNLsvToUYOW5Yqjo\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 15702,
		"path": "../public/assets/ad-manager-Dstn-pS6.js"
	},
	"/assets/alert-dialog-D9AabIf5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9a-yhLN8jGgIH6m47SVD/owfdJE3N8\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 3994,
		"path": "../public/assets/alert-dialog-D9AabIf5.js"
	},
	"/assets/advertising-CcJZdcgs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3184-pRSjeNdUfGJhdGWlpzUGYePmg5M\"",
		"mtime": "2026-11-16T18:31:33.914Z",
		"size": 12676,
		"path": "../public/assets/advertising-CcJZdcgs.js"
	},
	"/assets/arrow-left-jTWi2v9L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-AuiT1BFbprgaEGOqDKDvgHCTDrA\"",
		"mtime": "2026-11-16T18:31:33.915Z",
		"size": 165,
		"path": "../public/assets/arrow-left-jTWi2v9L.js"
	},
	"/assets/audit-CNz8kOFN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"497-x0C80D3V+Bh9KM40bMaQ+8qaYJA\"",
		"mtime": "2026-11-16T18:31:33.915Z",
		"size": 1175,
		"path": "../public/assets/audit-CNz8kOFN.js"
	},
	"/assets/audit-logs-CjB1MKg0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22fe-PrRZhitrRgYdfi3I0tRE/HAQo0A\"",
		"mtime": "2026-11-16T18:31:33.915Z",
		"size": 8958,
		"path": "../public/assets/audit-logs-CjB1MKg0.js"
	},
	"/assets/avatar-i08goVnP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8e-pZ5iHFFq/5y9QgExffUuSfgIE2Q\"",
		"mtime": "2026-11-16T18:31:33.915Z",
		"size": 2702,
		"path": "../public/assets/avatar-i08goVnP.js"
	},
	"/assets/ban-CVpZ6MNd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b5-BKN0rWCDza7K0h8v9qLJP/d6IdQ\"",
		"mtime": "2026-11-16T18:31:33.915Z",
		"size": 181,
		"path": "../public/assets/ban-CVpZ6MNd.js"
	},
	"/assets/bell-DwwLm6-s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-U5L105WOgsuqX0OXcfpMmQ8PceY\"",
		"mtime": "2026-11-16T18:31:33.915Z",
		"size": 290,
		"path": "../public/assets/bell-DwwLm6-s.js"
	},
	"/assets/badge-CDekfpNB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"325-Az4d/bPiiMgPX/wQjlG23tE9hJ0\"",
		"mtime": "2026-11-16T18:31:33.915Z",
		"size": 805,
		"path": "../public/assets/badge-CDekfpNB.js"
	},
	"/assets/auth-DGy2Fsm4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16fd-lJOohrLrxjKzu4wdqpt4iNhFMag\"",
		"mtime": "2026-11-16T18:31:33.915Z",
		"size": 5885,
		"path": "../public/assets/auth-DGy2Fsm4.js"
	},
	"/assets/button-L8VWCgmo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"113f-YqO9Nq4N/nctXH0Nx/1/LGQp/Yg\"",
		"mtime": "2026-11-16T18:31:33.915Z",
		"size": 4415,
		"path": "../public/assets/button-L8VWCgmo.js"
	},
	"/assets/calendar-clock-CqyfkXz3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17a-VfSJvLz2Y/xDgnKB+1u5+8E7XUo\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 378,
		"path": "../public/assets/calendar-clock-CqyfkXz3.js"
	},
	"/assets/card-C42OYhjP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"432-15xf/2drHPC28xZH+gPnHISYBQk\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 1074,
		"path": "../public/assets/card-C42OYhjP.js"
	},
	"/assets/check-BsjVqRdW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-Jf/m0c2H524ce59E3+u2xXTT444\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 124,
		"path": "../public/assets/check-BsjVqRdW.js"
	},
	"/assets/checkbox-CfE8s8uv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1295-kFYUJCs5caq2YzwrFWfHf7yR9NU\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 4757,
		"path": "../public/assets/checkbox-CfE8s8uv.js"
	},
	"/assets/chevron-down-DmeuMBQB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-GDap8GocwJ2wSQ2VNArwvtbcdD8\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 128,
		"path": "../public/assets/chevron-down-DmeuMBQB.js"
	},
	"/assets/chevron-right-izEjSCkx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-k3YcFnkeS2A68AaGMZxERMLJRq8\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 130,
		"path": "../public/assets/chevron-right-izEjSCkx.js"
	},
	"/assets/content-c6AwqQgC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a5-ki9jpupVJd1Lt5GIzpVo3PUwJLA\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 2213,
		"path": "../public/assets/content-c6AwqQgC.js"
	},
	"/assets/copy-B0259Z7b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-sw1VBCbCtUqPg7hAJu73zhuJVF4\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 236,
		"path": "../public/assets/copy-B0259Z7b.js"
	},
	"/assets/createLucideIcon-CUWTlO2B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d7-AdQ5zJaFPQN3AlyY7TbrzQ90zTw\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 1239,
		"path": "../public/assets/createLucideIcon-CUWTlO2B.js"
	},
	"/assets/credit-card-D53P0sd5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-v6gwBAMPkhthuKaRK9TK5q7JIyg\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 207,
		"path": "../public/assets/credit-card-D53P0sd5.js"
	},
	"/assets/csv-BJT5Ht1r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30c-/JYvOv5fG6vSiELiQd1EEd+j/9s\"",
		"mtime": "2026-11-16T18:31:33.916Z",
		"size": 780,
		"path": "../public/assets/csv-BJT5Ht1r.js"
	},
	"/assets/dashboard-tFGGzPWB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70e6-lj53XHfDVj5kdcVDRMY1A174rlQ\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 28902,
		"path": "../public/assets/dashboard-tFGGzPWB.js"
	},
	"/assets/dialog-BGhr1BGK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d5-Pwhz2stEw7yjUr9owTcklKLBVMM\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 2261,
		"path": "../public/assets/dialog-BGhr1BGK.js"
	},
	"/assets/dist-0os2HCMa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112d-4i0Fsnon0xAj54WI+2E+jfEKdYg\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 4397,
		"path": "../public/assets/dist-0os2HCMa.js"
	},
	"/assets/dist-BUOi14jI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64ca-Oi9oKp/OYIuj63hZ/cFYmtM5Q28\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 25802,
		"path": "../public/assets/dist-BUOi14jI.js"
	},
	"/assets/dist-BnlB05_v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e8-uWP2TEfamELC+U5i6j5qMvuNZK0\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 744,
		"path": "../public/assets/dist-BnlB05_v.js"
	},
	"/assets/dist-C53XFsYP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2204-abFMq/9eQJu5rqLz/JsG40ON+ls\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 8708,
		"path": "../public/assets/dist-C53XFsYP.js"
	},
	"/assets/dist-D7F2kEg7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14e5-Oeq7Z7vAbeIt44C85IAOTSivwKI\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 5349,
		"path": "../public/assets/dist-D7F2kEg7.js"
	},
	"/assets/dist-DDbJtSBj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cd0-jeCEi+/FG3uB24WDWTRkkqodXO4\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 3280,
		"path": "../public/assets/dist-DDbJtSBj.js"
	},
	"/assets/dist-DGc91dJJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1100-MIb6d6zDiOSIAylMBkL1VzJ1ccU\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 4352,
		"path": "../public/assets/dist-DGc91dJJ.js"
	},
	"/assets/dist-DcjjfBe7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6e05-35L8jseFERmoIwY1zke1q/I9Lwo\"",
		"mtime": "2026-11-16T18:31:33.917Z",
		"size": 28165,
		"path": "../public/assets/dist-DcjjfBe7.js"
	},
	"/assets/dist-alSlQFF2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216-PtHgPqa0IPhz3TUED4E94hrmvNY\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 534,
		"path": "../public/assets/dist-alSlQFF2.js"
	},
	"/assets/dist-eD1ZyCV9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"314-BfQGYzvVa9BJAIIw9RTyVeKFgdU\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 788,
		"path": "../public/assets/dist-eD1ZyCV9.js"
	},
	"/assets/dollar-sign-TNIXZu-7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-KTOCurHO55aGbLTm/91H6WSYCU0\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 219,
		"path": "../public/assets/dollar-sign-TNIXZu-7.js"
	},
	"/assets/dropdown-menu-BL4u2V6y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5163-589hLVkNcc9Z0rYNp38ebQozRy4\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 20835,
		"path": "../public/assets/dropdown-menu-BL4u2V6y.js"
	},
	"/assets/ellipsis-x5bSFda-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-O9qWv+FaSiz9N8nZLUYI7/PPXmE\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 226,
		"path": "../public/assets/ellipsis-x5bSFda-.js"
	},
	"/assets/eye-CcpZuk5y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-X/TuH5+BIaBR1w8phK+l4tjTWBU\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 256,
		"path": "../public/assets/eye-CcpZuk5y.js"
	},
	"/assets/file-text-Dwj9ejCK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-Eto78A4s12jPJOrK5sX32uof4mY\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 385,
		"path": "../public/assets/file-text-Dwj9ejCK.js"
	},
	"/assets/finance-D-Ppnm8T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f8f-x8FcJ0MODWNtSaVmCOmdogxHiYo\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 36751,
		"path": "../public/assets/finance-D-Ppnm8T.js"
	},
	"/assets/format-D3ayvTHk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ae-wB0bySu6UcexJjo0RcmYMdZ44xQ\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 686,
		"path": "../public/assets/format-D3ayvTHk.js"
	},
	"/assets/gauge-DK5An3YO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b0-FB5ja5/gKiRzu61C9vFeWCk1Jko\"",
		"mtime": "2026-11-16T18:31:33.919Z",
		"size": 176,
		"path": "../public/assets/gauge-DK5An3YO.js"
	},
	"/assets/forbidden-kCrUPYEf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f9-s5vyBf5z6SRbQKImfXjSVtyvGkI\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 505,
		"path": "../public/assets/forbidden-kCrUPYEf.js"
	},
	"/assets/forgot-password-BeT5uXcO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"938-Bx3l+vZ581pFuzFPEYWAnb8AkwQ\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 2360,
		"path": "../public/assets/forgot-password-BeT5uXcO.js"
	},
	"/assets/html2canvas-muKNebnt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30af1-rmm+oKOregIF6ussFJQ35RWA3Rw\"",
		"mtime": "2026-11-16T18:31:33.919Z",
		"size": 199409,
		"path": "../public/assets/html2canvas-muKNebnt.js"
	},
	"/assets/invariant-CaZ7JkbT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66-J2RBhReGnRjsWz92z/NKgWQ7lwk\"",
		"mtime": "2026-11-16T18:31:33.919Z",
		"size": 102,
		"path": "../public/assets/invariant-CaZ7JkbT.js"
	},
	"/assets/jsx-runtime-DApVmHJR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2033-6ZJ2IO8bJQXoUP1Tiq41ON83Gdg\"",
		"mtime": "2026-11-16T18:31:33.919Z",
		"size": 8243,
		"path": "../public/assets/jsx-runtime-DApVmHJR.js"
	},
	"/assets/life-buoy-q-AjG93G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d-Ghj4SMRS/4lLfKhxicNpP74oJkg\"",
		"mtime": "2026-11-16T18:31:33.920Z",
		"size": 381,
		"path": "../public/assets/life-buoy-q-AjG93G.js"
	},
	"/assets/label-CeiP1Re0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d8-eIUis3CCFMUs68H1MsvIDA881eM\"",
		"mtime": "2026-11-16T18:31:33.919Z",
		"size": 728,
		"path": "../public/assets/label-CeiP1Re0.js"
	},
	"/assets/input-pmTOHm0T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"298-uqarPkvvUzhj3mkpdEmtV+7P8I8\"",
		"mtime": "2026-11-16T18:31:33.919Z",
		"size": 664,
		"path": "../public/assets/input-pmTOHm0T.js"
	},
	"/assets/index.es-yM7cFvea.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f7a-k1GLWWxG8j1uVoZ16EteOrb2NXw\"",
		"mtime": "2026-11-16T18:31:33.919Z",
		"size": 151418,
		"path": "../public/assets/index.es-yM7cFvea.js"
	},
	"/assets/link-D7xGa4hy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"261b-q9MoRdXtsl7cPNZDDefI5UAmt5Q\"",
		"mtime": "2026-11-16T18:31:33.920Z",
		"size": 9755,
		"path": "../public/assets/link-D7xGa4hy.js"
	},
	"/assets/mail-Q734S4x_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-13lCNDgJcICHJ9NZoecdqRR0hjc\"",
		"mtime": "2026-11-16T18:31:33.920Z",
		"size": 213,
		"path": "../public/assets/mail-Q734S4x_.js"
	},
	"/assets/loader-circle-BLMN6fQZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-bchKllo4y+ewLuxNI8le43tECPI\"",
		"mtime": "2026-11-16T18:31:33.920Z",
		"size": 144,
		"path": "../public/assets/loader-circle-BLMN6fQZ.js"
	},
	"/assets/megaphone-CK1PlZ21.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a-ZCzJogFkHw1UtqLHrk46juWiDhI\"",
		"mtime": "2026-11-16T18:31:33.920Z",
		"size": 346,
		"path": "../public/assets/megaphone-CK1PlZ21.js"
	},
	"/assets/moderation-CxdB0BYK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3429-nQqGuMau27s1adgJNf3oVdwawEY\"",
		"mtime": "2026-11-16T18:31:33.920Z",
		"size": 13353,
		"path": "../public/assets/moderation-CxdB0BYK.js"
	},
	"/assets/notifications-BsoNoagu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"482d-vYeBSl05Au7b5naLtYQ7BEuDIEY\"",
		"mtime": "2026-11-16T18:31:33.920Z",
		"size": 18477,
		"path": "../public/assets/notifications-BsoNoagu.js"
	},
	"/assets/export-CI19Dfgt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"adaf9-6PxO2c4uZ+2w9DOPNCv9yGisM6g\"",
		"mtime": "2026-11-16T18:31:33.918Z",
		"size": 711417,
		"path": "../public/assets/export-CI19Dfgt.js"
	},
	"/assets/monitor-smartphone-BucZqTAJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146-Ts2ugdk95ISAZpr2jOhQiWH+Edk\"",
		"mtime": "2026-11-16T18:31:33.920Z",
		"size": 326,
		"path": "../public/assets/monitor-smartphone-BucZqTAJ.js"
	},
	"/assets/index-DFUwK6gb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"965b4-76uE6qL8ZY9aqLWQYFuR/S5FMS4\"",
		"mtime": "2026-11-16T18:31:33.913Z",
		"size": 615860,
		"path": "../public/assets/index-DFUwK6gb.js"
	},
	"/assets/pencil-3w3E_sA-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-JQr5reRQn6XN+YOkUSF8pK48EEE\"",
		"mtime": "2026-11-16T18:31:33.920Z",
		"size": 276,
		"path": "../public/assets/pencil-3w3E_sA-.js"
	},
	"/assets/play-BdshlC4k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-hJUXfvWHMa7JotqGOy4imLK9PMM\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 190,
		"path": "../public/assets/play-BdshlC4k.js"
	},
	"/assets/plus-D1TT14dD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-Ls4uwTA80brddZe+wENofiZplVg\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 153,
		"path": "../public/assets/plus-D1TT14dD.js"
	},
	"/assets/remember-NweFcR_U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e-aBAe67FvVpPRtv3biKPx/yDA37Q\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 574,
		"path": "../public/assets/remember-NweFcR_U.js"
	},
	"/assets/receipt-CjJS4Ew1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124-YvsnzTUwKj+Eq+kcjNFXzozDuQU\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 292,
		"path": "../public/assets/receipt-CjJS4Ew1.js"
	},
	"/assets/reports-BlpdGFWP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cc8-nVfdJk9UVA7aq3AFmgjMvLppjBw\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 19656,
		"path": "../public/assets/reports-BlpdGFWP.js"
	},
	"/assets/purify.es-Dqk5qvad.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"715f-L5ciiKmHOL1BNN+WjZyDI0Rzin4\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 29023,
		"path": "../public/assets/purify.es-Dqk5qvad.js"
	},
	"/assets/reset-password-Dd36zOrj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a38-0R/2F5nGB0i+0j8HjwXzHbP/N5Y\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 2616,
		"path": "../public/assets/reset-password-Dd36zOrj.js"
	},
	"/assets/rolldown-runtime-BWaJ3C7D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38f-8yiUtcGFA57A27925j8wamv82VA\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 911,
		"path": "../public/assets/rolldown-runtime-BWaJ3C7D.js"
	},
	"/assets/revenue-CwjNnnfH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e92-sXlvsSHRD8zAh5/gZjllRMCd86g\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 3730,
		"path": "../public/assets/revenue-CwjNnnfH.js"
	},
	"/assets/remote-config-BxaP8lHA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87af-aG7G/o8YuyGqG8hOxIgR0Uc1D+8\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 34735,
		"path": "../public/assets/remote-config-BxaP8lHA.js"
	},
	"/assets/routes-CNorscO8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c-xg83NSYDk0Qwrl2g/5aVdjkgn0I\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 556,
		"path": "../public/assets/routes-CNorscO8.js"
	},
	"/assets/save-nT0v528u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-Q+WJKIp4HBk4BEHeVGkMU2BT4RI\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 327,
		"path": "../public/assets/save-nT0v528u.js"
	},
	"/assets/scroll-text-D5NNGz9N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d-lZIJ2e+NEADPj9avsaFC2A6oDXM\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 349,
		"path": "../public/assets/scroll-text-D5NNGz9N.js"
	},
	"/assets/route-eRAhaLJ7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6a9-PxAXlVtZ1MNGf+29VzstucC8lKE\"",
		"mtime": "2026-11-16T18:31:33.921Z",
		"size": 42665,
		"path": "../public/assets/route-eRAhaLJ7.js"
	},
	"/assets/select-bXaXYfUk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a8d-asG9KGbevRAI2WQdjsf3cQOmUX4\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 23181,
		"path": "../public/assets/select-bXaXYfUk.js"
	},
	"/assets/search-CcIbaqSb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-pxixsGa/BtchwLhwWAFG1sXszAE\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 174,
		"path": "../public/assets/search-CcIbaqSb.js"
	},
	"/assets/send-TPnkgH8p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-q+En4LjOL5F+665pl7009TlVhuY\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 290,
		"path": "../public/assets/send-TPnkgH8p.js"
	},
	"/assets/shield-alert-C1NJC2a4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-yRkSZWTlQE0OWDWjAgbnT94UpyQ\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 353,
		"path": "../public/assets/shield-alert-C1NJC2a4.js"
	},
	"/assets/separator-DgWzv_ZH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a3-KmY1uHVrH2ivPsKvLltbTW8qeRo\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 931,
		"path": "../public/assets/separator-DgWzv_ZH.js"
	},
	"/assets/settings-CpjCnBAE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8a-TrcAwMzSooQGc4voQBMeQfVRyyI\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 3210,
		"path": "../public/assets/settings-CpjCnBAE.js"
	},
	"/assets/sliders-vertical-B2dDUt2M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6-w9xtlxgWlrjYA3P1cvJZLWQrVL4\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 422,
		"path": "../public/assets/sliders-vertical-B2dDUt2M.js"
	},
	"/assets/shield-off-CiyrF-gS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"190-QoZHGcWK1F8YiJdNjRnaN7Y2p/s\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 400,
		"path": "../public/assets/shield-off-CiyrF-gS.js"
	},
	"/assets/shield-check-CYz_4If5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-p1z9LxPBzYWwJ8V5AFw2dzwBCZ0\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 320,
		"path": "../public/assets/shield-check-CYz_4If5.js"
	},
	"/assets/sparkles-Cvgun291.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-qg5wgBk5TCsmZfBUXjqIGn9umhA\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 494,
		"path": "../public/assets/sparkles-Cvgun291.js"
	},
	"/assets/subDays-CFzxtiqO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c05-lN2A3XsYZaKKbDJ5kzf8ChsKCgM\"",
		"mtime": "2026-11-16T18:31:33.922Z",
		"size": 19461,
		"path": "../public/assets/subDays-CFzxtiqO.js"
	},
	"/assets/subscriptions-DruDKpqe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a04-SLmPWXmolKfIocGhUFnFijU1jZc\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 2564,
		"path": "../public/assets/subscriptions-DruDKpqe.js"
	},
	"/assets/switch-B7ctcpdN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1194-uiFXyq9F69cmO8pPBpck1YDY5iU\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 4500,
		"path": "../public/assets/switch-B7ctcpdN.js"
	},
	"/assets/support-oou678hI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"49ad-otpO2bGT+fLmjq5548Lbevz3FaU\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 18861,
		"path": "../public/assets/support-oou678hI.js"
	},
	"/assets/table-CSDH_tLD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"697-AxDH5bmEE274Hg95p4ywhRt6y6A\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 1687,
		"path": "../public/assets/table-CSDH_tLD.js"
	},
	"/assets/styles-BXC2ypah.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1654d-4+kQWqZ9T+DHS6fnCpqcYoViWLU\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 91469,
		"path": "../public/assets/styles-BXC2ypah.css"
	},
	"/assets/tabs-3F7rBwHJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7f-EczwvH+9SvPvTJV5Esq19ozSffI\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 3711,
		"path": "../public/assets/tabs-3F7rBwHJ.js"
	},
	"/assets/textarea-DwjADcc9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"232-Lr2K/I85V2pyP12Sv53ykAk6gus\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 562,
		"path": "../public/assets/textarea-DwjADcc9.js"
	},
	"/assets/triangle-alert-iVI8fxDb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-A0gfeE1rHD8Cqi1IUSfq0d2cid8\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-iVI8fxDb.js"
	},
	"/assets/theme-BAaEdfkt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b1c-rTFXBONGqBv4iew30Lymu7yOQpw\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 2844,
		"path": "../public/assets/theme-BAaEdfkt.js"
	},
	"/assets/useDateRange-ClgRONCg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb0d-T2T373TrAJ4/lCuLFP/sNDI8zCo\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 60173,
		"path": "../public/assets/useDateRange-ClgRONCg.js"
	},
	"/assets/useAdminSession-B4wuXVH8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"672-rndNgm3rBwD8WTlJ9sd6OVhOww0\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 1650,
		"path": "../public/assets/useAdminSession-B4wuXVH8.js"
	},
	"/assets/useQuery-BWx2BZVn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f4e-YXDT5+E07JeZEEHVlFVNPEWDdYY\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 8014,
		"path": "../public/assets/useQuery-BWx2BZVn.js"
	},
	"/assets/useMutation-7lIpKMdM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93e-94L1DSFkIeTruo5zPT5ov+Se7B8\"",
		"mtime": "2026-11-16T18:31:33.923Z",
		"size": 2366,
		"path": "../public/assets/useMutation-7lIpKMdM.js"
	},
	"/assets/useRouter-BhwBRBcx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3-AXhaMTVEVNAA40+bGgIlwwnMD24\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 195,
		"path": "../public/assets/useRouter-BhwBRBcx.js"
	},
	"/assets/useRealtimeInvalidate-DnYeFW14.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b7-+usRmuMahRK+a5oW2ZzVmUp1V7I\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 439,
		"path": "../public/assets/useRealtimeInvalidate-DnYeFW14.js"
	},
	"/assets/user-DjAzrztb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-M3IWcGWMo9gmRdUApQdXivRMc34\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 196,
		"path": "../public/assets/user-DjAzrztb.js"
	},
	"/assets/user-x-BYa9c_p5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-KZn+Xzg9cGNwwx+Pf2tCTFKjw0k\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 306,
		"path": "../public/assets/user-x-BYa9c_p5.js"
	},
	"/assets/users-DRznMCB0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-kT6RHF789B82FbBGYFnjqYghxu8\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 306,
		"path": "../public/assets/users-DRznMCB0.js"
	},
	"/assets/users.index-lGpypwSA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37ce-nmVlUNL+Ft+CWTzQnm738AZ+AXU\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 14286,
		"path": "../public/assets/users.index-lGpypwSA.js"
	},
	"/assets/users._userId-3cOBASEf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3be0-6VUCPz228pNyRdszi2aH7zlX4MQ\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 15328,
		"path": "../public/assets/users._userId-3cOBASEf.js"
	},
	"/assets/wallet-BTUAQ0bw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11e-827FJjjOHj2YgCca/UGFrPh+kGw\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 286,
		"path": "../public/assets/wallet-BTUAQ0bw.js"
	},
	"/assets/with-selector-bf0_gioy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"686-NL7tjGbFEWh8JruJml+TYIt5BXs\"",
		"mtime": "2026-11-16T18:31:33.924Z",
		"size": 1670,
		"path": "../public/assets/with-selector-bf0_gioy.js"
	}
};
// #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
// node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
// #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_iQfEtz = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_iQfEtz
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
// node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
// #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
// #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
// node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
// node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
// node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
export { cloudflare_module_default as default };
