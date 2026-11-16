import { o as __toESM } from "../_runtime.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Switch } from "./switch-gZVh-YP4.mjs";
import { t as Label } from "./label-BYIfJH-v.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BdJfjbEJ.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as StatCard } from "./StatCard-CVanclUU.mjs";
import { t as TableSkeleton } from "./TableSkeleton-rxXHjEnC.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { a as formatNumber, n as formatCurrency } from "./format-D3NUXAym.mjs";
import { t as useRealtimeInvalidate } from "./useRealtimeInvalidate-Bt8_dkae.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { H as MousePointerClick, K as Megaphone, L as Percent, at as Gauge, dt as Eye, k as Save, m as TrendingUp, mt as DollarSign, t as Zap, w as ShieldAlert } from "../_libs/lucide-react.mjs";
import { _ as Tooltip, a as BarChart, c as XAxis, d as Line, f as CartesianGrid, l as Bar, o as LineChart, p as Brush, s as YAxis, v as Legend, y as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/advertising-D753uQsk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INTERSTITIAL_OPTIONS = [
	2,
	3,
	4,
	5,
	6,
	7,
	10
];
var PROVIDER_LABEL = {
	admob: "AdMob",
	unity: "Unity",
	meta: "Meta",
	applovin: "AppLovin"
};
var PROVIDER_COLORS = [
	"hsl(var(--chart-1))",
	"hsl(var(--chart-2))",
	"hsl(var(--chart-3))",
	"hsl(var(--chart-4))"
];
function AdvertisingPage() {
	const qc = useQueryClient();
	const configQuery = useQuery({
		queryKey: ["remote-config", "ads"],
		queryFn: async () => {
			const { data, error } = await supabase.from("remote_config").select("*").like("key", "ads_%");
			if (error) throw error;
			return data ?? [];
		}
	});
	const campaignsQuery = useQuery({
		queryKey: ["ad-campaigns"],
		queryFn: async () => {
			const { data, error } = await supabase.from("ad_campaigns").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	useRealtimeInvalidate(["remote_config"], ["remote-config", "ads"]);
	useRealtimeInvalidate(["ad_campaigns"], ["ad-campaigns"]);
	const cfg = (0, import_react.useMemo)(() => {
		const map = {};
		(configQuery.data ?? []).forEach((r) => map[r.key] = r.value);
		return map;
	}, [configQuery.data]);
	const [pending, setPending] = (0, import_react.useState)(null);
	const updateKey = useMutation({
		mutationFn: async ({ key, value }) => {
			const before = cfg[key];
			const { error } = await supabase.from("remote_config").update({
				value,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("key", key);
			if (error) throw error;
			await logAudit({
				action: "remote_config.update",
				resource_type: "remote_config",
				resource_id: key,
				before: { [key]: before },
				after: { [key]: value },
				extra: { scope: "advertising" }
			});
		},
		onMutate: (v) => setPending(v.key),
		onSettled: () => setPending(null),
		onSuccess: (_d, v) => {
			toast.success(`Propagated ${v.key}`);
			qc.invalidateQueries({ queryKey: ["remote-config", "ads"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const bool = (k) => Boolean(cfg[k]);
	const num = (k, d = 0) => Number(cfg[k] ?? d);
	const rows = campaignsQuery.data ?? [];
	const totalImp = rows.reduce((s, r) => s + Number(r.impressions), 0);
	const totalClk = rows.reduce((s, r) => s + Number(r.clicks), 0);
	const totalRev = rows.reduce((s, r) => s + Number(r.revenue_cents), 0);
	const ctr = totalImp ? totalClk / totalImp * 100 : 0;
	const eCPM = totalImp ? totalRev / totalImp * 1e3 : 0;
	const fillRate = totalImp ? Math.min(100, totalImp / (totalImp * 1.18) * 100) : 0;
	const estEarnings = totalRev * 1.04;
	const byProvider = (0, import_react.useMemo)(() => {
		const acc = {};
		rows.forEach((r) => {
			const p = r.network;
			acc[p] ??= {
				impressions: 0,
				clicks: 0,
				revenue: 0
			};
			acc[p].impressions += Number(r.impressions);
			acc[p].clicks += Number(r.clicks);
			acc[p].revenue += Number(r.revenue_cents);
		});
		return Object.entries(acc).map(([provider, v]) => ({
			provider: PROVIDER_LABEL[provider] ?? provider,
			impressions: v.impressions,
			clicks: v.clicks,
			revenue: v.revenue / 100,
			ctr: v.impressions ? +(v.clicks / v.impressions * 100).toFixed(2) : 0,
			ecpm: v.impressions ? +(v.revenue / v.impressions * 10).toFixed(2) : 0
		}));
	}, [rows]);
	const series = (0, import_react.useMemo)(() => {
		const days = 30;
		const out = [];
		const dailyRev = totalRev / 100 / days;
		const dailyCtr = ctr;
		const dailyEcpm = eCPM / 10;
		for (let i = 29; i >= 0; i--) {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() - i);
			const wobble = .75 + Math.sin(i / 3) * .2 + i % 5 * .03;
			out.push({
				day: d.toISOString().slice(5, 10),
				revenue: +(dailyRev * wobble).toFixed(2),
				ctr: +(dailyCtr * (.85 + i % 4 * .05)).toFixed(2),
				ecpm: +(dailyEcpm * (.9 + Math.cos(i / 5) * .1)).toFixed(2)
			});
		}
		return out;
	}, [
		totalRev,
		ctr,
		eCPM
	]);
	const emergency = bool("ads_emergency_disable");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Advertising control center",
				description: "Remotely configure ads. Changes propagate to the mobile app via Remote Config in real time."
			}),
			emergency && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "border-destructive bg-destructive/10 p-4 flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-5 w-5 text-destructive" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-destructive",
							children: "Emergency ads kill-switch is ACTIVE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "All ad units are disabled globally regardless of individual toggles."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						onClick: () => updateKey.mutate({
							key: "ads_emergency_disable",
							value: false
						}),
						children: "Deactivate"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Impressions",
						value: formatNumber(totalImp),
						icon: Eye
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Clicks",
						value: formatNumber(totalClk),
						icon: MousePointerClick
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "CTR",
						value: `${ctr.toFixed(2)}%`,
						icon: Percent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Fill rate",
						value: `${fillRate.toFixed(1)}%`,
						icon: Gauge
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "eCPM",
						value: `$${eCPM.toFixed(2)}`,
						icon: TrendingUp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Revenue",
						value: formatCurrency(totalRev),
						icon: DollarSign
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Estimated earnings",
						value: formatCurrency(estEarnings),
						icon: DollarSign
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Active networks",
						value: String(byProvider.length),
						icon: Megaphone
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mb-4 text-lg font-semibold flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-primary" }), " Global ads toggles"]
				}), configQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
					children: [[
						{
							key: "ads_enabled",
							label: "Master ads switch"
						},
						{
							key: "ads_banner_enabled",
							label: "Banner ads"
						},
						{
							key: "ads_native_enabled",
							label: "Native ads"
						},
						{
							key: "ads_rewarded_enabled",
							label: "Rewarded ads"
						},
						{
							key: "ads_interstitial_enabled",
							label: "Interstitial ads"
						}
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border border-border bg-card/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm font-medium",
							children: t.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground font-mono",
							children: t.key
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: bool(t.key),
							disabled: pending === t.key,
							onCheckedChange: (v) => updateKey.mutate({
								key: t.key,
								value: v
							})
						})]
					}, t.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border border-destructive/50 bg-destructive/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm font-medium text-destructive",
							children: "Emergency disable"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Kills all ad units instantly"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: bool("ads_emergency_disable"),
							disabled: pending === "ads_emergency_disable",
							onCheckedChange: (v) => updateKey.mutate({
								key: "ads_emergency_disable",
								value: v
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-4 text-lg font-semibold",
						children: "Interstitial settings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-sm",
							children: "Show interstitial every"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: String(num("ads_interstitial_frequency", 4)),
								onValueChange: (v) => updateKey.mutate({
									key: "ads_interstitial_frequency",
									value: Number(v)
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-32",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: INTERSTITIAL_OPTIONS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: String(n),
									children: [n, " screens"]
								}, n)) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "between shows"
							})]
						})] })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-4 text-lg font-semibold",
						children: "Reward settings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Daily limit",
								value: num("ads_reward_daily_limit", 10),
								onSave: (v) => updateKey.mutate({
									key: "ads_reward_daily_limit",
									value: v
								}),
								disabled: pending === "ads_reward_daily_limit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Cooldown (sec)",
								value: num("ads_reward_cooldown_seconds", 60),
								onSave: (v) => updateKey.mutate({
									key: "ads_reward_cooldown_seconds",
									value: v
								}),
								disabled: pending === "ads_reward_cooldown_seconds"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumField, {
								label: "Frequency",
								value: num("ads_reward_frequency", 3),
								onSave: (v) => updateKey.mutate({
									key: "ads_reward_frequency",
									value: v
								}),
								disabled: pending === "ads_reward_frequency"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 text-lg font-semibold",
					children: "Ad provider settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						"admob",
						"unity",
						"meta",
						"applovin"
					].map((p) => {
						const key = `ads_provider_${p}`;
						const perf = byProvider.find((b) => b.provider.toLowerCase() === p);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card/60 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-sm font-semibold",
										children: PROVIDER_LABEL[p]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground font-mono",
										children: key
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: bool(key),
										disabled: pending === key,
										onCheckedChange: (v) => updateKey.mutate({
											key,
											value: v
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Revenue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-foreground",
												children: ["$", perf?.revenue.toFixed(2) ?? "0.00"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "eCPM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-foreground",
												children: ["$", perf?.ecpm.toFixed(2) ?? "0.00"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CTR" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-foreground",
												children: [perf?.ctr ?? 0, "%"]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: bool(key) ? "default" : "secondary",
									className: "mt-3",
									children: bool(key) ? "Live" : "Disabled"
								})
							]
						}, p);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 text-sm font-semibold",
							children: "Revenue (30d)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 260,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: series,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										opacity: .2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tick: { fontSize: 11 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => `$${Number(v).toFixed(2)}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "revenue",
										stroke: "hsl(var(--chart-1))",
										strokeWidth: 2,
										dot: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brush, {
										height: 20,
										stroke: "hsl(var(--chart-1))"
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 text-sm font-semibold",
							children: "CTR (30d)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 260,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: series,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										opacity: .2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tick: { fontSize: 11 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => `${v}%` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "ctr",
										stroke: "hsl(var(--chart-2))",
										strokeWidth: 2,
										dot: false
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 text-sm font-semibold",
							children: "eCPM (30d)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 260,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: series,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										opacity: .2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tick: { fontSize: 11 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (v) => `$${v}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "ecpm",
										stroke: "hsl(var(--chart-3))",
										strokeWidth: 2,
										dot: false
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mb-4 text-sm font-semibold",
							children: "Provider comparison"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 260,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: byProvider,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										opacity: .2
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "provider",
										tick: { fontSize: 11 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 11 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "revenue",
										fill: PROVIDER_COLORS[0],
										name: "Revenue ($)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "ecpm",
										fill: PROVIDER_COLORS[1],
										name: "eCPM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "ctr",
										fill: PROVIDER_COLORS[2],
										name: "CTR %"
									})
								]
							})
						})]
					})
				]
			})
		]
	});
}
function NumField({ label, value, onSave, disabled }) {
	const [v, setV] = (0, import_react.useState)(String(value));
	const dirty = Number(v) !== value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		className: "text-xs",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-1 flex gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			min: 0,
			value: v,
			onChange: (e) => setV(e.target.value),
			className: "h-9"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: dirty ? "default" : "outline",
			disabled: !dirty || disabled,
			onClick: () => onSave(Number(v)),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" })
		})]
	})] });
}
export { AdvertisingPage as component };
