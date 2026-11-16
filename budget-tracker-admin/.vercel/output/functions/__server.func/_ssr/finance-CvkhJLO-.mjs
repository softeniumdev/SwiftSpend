import { o as __toESM } from "../_runtime.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as StatCard } from "./StatCard-CVanclUU.mjs";
import { n as tooltipStyle, t as ChartCard } from "./ChartCard-BavA1i-C.mjs";
import { n as useDateRange, t as DateRangePicker } from "./useDateRange-ClgwuHQG.mjs";
import { t as ExportMenu } from "./ExportMenu-D2msg4iY.mjs";
import { t as useRealtimeInvalidate } from "./useRealtimeInvalidate-Bt8_dkae.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { n as formatCurrency, t as formatCompact } from "./format-D3NUXAym.mjs";
import { t as Card } from "./card-BeT1cn4g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { Ct as CircleAlert, Ht as Apple, K as Megaphone, L as Percent, M as Repeat, N as RefreshCw, P as Receipt, St as CirclePlay, g as Target, gt as CreditCard, m as TrendingUp, mt as DollarSign, o as Users, v as Sparkles, vt as Coins } from "../_libs/lucide-react.mjs";
import { _ as Tooltip, a as BarChart, c as XAxis, d as Line, f as CartesianGrid, g as Cell, h as LabelList, i as PieChart, l as Bar, m as Pie, n as Funnel, o as LineChart, p as Brush, s as YAxis, t as FunnelChart, v as Legend, y as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
import { S as eachMonthOfInterval, c as isBefore, f as format, l as isAfter, n as subMonths, x as startOfMonth } from "../_libs/date-fns.mjs";
// node_modules/.nitro/vite/services/ssr/assets/finance-CvkhJLO-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PIE_COLORS = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)"
];
function FinancePage() {
	const { range, setPreset, setCustom } = useDateRange("90d");
	const query = useQuery({
		queryKey: ["finance-center"],
		refetchInterval: 3e4,
		queryFn: async () => {
			const [tx, sub, usr, ad] = await Promise.all([
				supabase.from("transactions").select("id,type,status,amount,amount_cents,currency,provider,created_at").order("created_at", { ascending: false }).limit(5e3),
				supabase.from("subscriptions").select("id,user_id,plan,status,amount_cents,interval,started_at,canceled_at,renews_at").limit(5e3),
				supabase.from("profiles").select("id,country,created_at").limit(5e3),
				supabase.from("ad_campaigns").select("id,budget_cents,status")
			]);
			if (tx.error) console.error("Transactions query error:", tx.error);
			if (sub.error) console.error("Subscriptions query error:", sub.error);
			if (usr.error) console.error("Profiles query error:", usr.error);
			if (ad.error) console.warn("Ad campaigns query warning:", ad.error);
			return {
				txs: tx.data ?? [],
				subs: sub.data ?? [],
				users: usr.data ?? [],
				ads: ad.data ?? []
			};
		}
	});
	useRealtimeInvalidate([
		"transactions",
		"subscriptions",
		"profiles",
		"ad_campaigns"
	], ["finance-center"]);
	const data = query.data;
	const m = (0, import_react.useMemo)(() => {
		if (!data) return null;
		const inRange = (iso) => {
			const d = new Date(iso);
			return !isBefore(d, range.from) && !isAfter(d, range.to);
		};
		const getCents = (t) => {
			if (typeof t.amount_cents === "number" && !isNaN(t.amount_cents)) return t.amount_cents;
			if (typeof t.amount === "number" && !isNaN(t.amount)) return Math.round(t.amount * 100);
			return 0;
		};
		const txs = data.txs.filter((t) => inRange(t.created_at));
		const succeeded = txs.filter((t) => t.status === "succeeded" && t.type === "charge");
		const refunds = txs.filter((t) => t.type === "refund");
		const failed = txs.filter((t) => t.status === "failed");
		const trials = data.subs.filter((s) => s.status === "trialing");
		const renewals = data.subs.filter((s) => s.status === "active" && s.renews_at);
		const gross = succeeded.reduce((s, t) => s + getCents(t), 0);
		const refundedCents = refunds.reduce((s, t) => s + Math.abs(getCents(t)), 0);
		const byProvider = (p) => succeeded.filter((t) => (t.provider ?? "stripe").toLowerCase() === p.toLowerCase()).reduce((s, t) => s + getCents(t), 0);
		const stripeRev = byProvider("stripe");
		const appleRev = byProvider("apple");
		const googleRev = byProvider("google_play") + byProvider("google");
		const adsRev = byProvider("ads") + data.ads.filter((a) => a.status !== "ended").reduce((s, a) => s + (a.revenue_cents ?? a.budget_cents ?? 0), 0);
		const activeSubs = data.subs.filter((s) => s.status === "active");
		const mrrCents = activeSubs.reduce((s, x) => s + (x.interval === "yearly" ? x.amount_cents / 12 : x.amount_cents), 0);
		const arrCents = mrrCents * 12;
		const arpuCents = mrrCents / (new Set(activeSubs.map((s) => s.user_id)).size || 1);
		const churnRate = data.subs.length ? data.subs.filter((s) => s.status === "canceled").length / data.subs.length : 0;
		const ltvCents = churnRate > 0 ? arpuCents / churnRate : arpuCents * 24;
		const cacCents = 1200;
		const refundRate = gross > 0 ? refundedCents / gross : 0;
		const trialConverted = data.subs.filter((s) => s.status === "active" && s.plan !== "free").length;
		const trialTotal = trialConverted + trials.length || 1;
		const trialConversion = trialConverted / trialTotal;
		const renewalRate = data.subs.length ? renewals.length / (renewals.length + data.subs.filter((s) => s.status === "canceled").length || 1) : 0;
		const monthly = eachMonthOfInterval({
			start: startOfMonth(subMonths(range.to, 11)),
			end: startOfMonth(range.to)
		}).map((mo) => {
			const key = format(mo, "MMM yy");
			const items = data.txs.filter((t) => t.status === "succeeded" && t.type === "charge" && format(startOfMonth(new Date(t.created_at)), "MMM yy") === key);
			const totals = {
				month: key,
				stripe: 0,
				apple: 0,
				google: 0,
				ads: 0,
				total: 0
			};
			items.forEach((t) => {
				const p = (t.provider ?? "stripe").toLowerCase();
				const dollars = getCents(t) / 100;
				if (p === "stripe") totals.stripe += dollars;
				else if (p === "apple") totals.apple += dollars;
				else if (p === "google_play" || p === "google") totals.google += dollars;
				else if (p === "ads") totals.ads += dollars;
				totals.total += dollars;
			});
			return totals;
		});
		const userCountry = new Map(data.users.map((u) => [u.id, u.country]));
		const countryMap = /* @__PURE__ */ new Map();
		succeeded.forEach((t) => {
			const uid = data.subs.find((s) => s.status === "active")?.user_id;
			const country = uid && userCountry.get(uid) || (data.users[Math.floor(Math.random() * data.users.length)]?.country ?? "Unknown");
			countryMap.set(country ?? "Unknown", (countryMap.get(country ?? "Unknown") ?? 0) + getCents(t));
		});
		const byCountry = Array.from(countryMap.entries()).map(([country, cents]) => ({
			country,
			revenue: cents / 100
		})).sort((a, b) => b.revenue - a.revenue).slice(0, 10);
		const planMap = /* @__PURE__ */ new Map();
		activeSubs.forEach((s) => {
			const rec = planMap.get(s.plan) ?? {
				count: 0,
				revenue: 0
			};
			rec.count += 1;
			rec.revenue += s.amount_cents / 100;
			planMap.set(s.plan, rec);
		});
		const topPlans = Array.from(planMap.entries()).map(([plan, v]) => ({
			plan,
			...v
		})).sort((a, b) => b.revenue - a.revenue);
		const revenueSources = [
			{
				name: "Stripe",
				value: stripeRev / 100
			},
			{
				name: "Apple",
				value: appleRev / 100
			},
			{
				name: "Google Play",
				value: googleRev / 100
			},
			{
				name: "Advertising",
				value: adsRev / 100
			}
		].filter((r) => r.value > 0);
		const visitors = data.users.length * 4;
		const signups = data.users.length;
		const subscriptionFunnel = [
			{
				name: "Visitors",
				value: visitors,
				fill: "var(--color-chart-1)"
			},
			{
				name: "Signups",
				value: signups,
				fill: "var(--color-chart-2)"
			},
			{
				name: "Trials",
				value: trialTotal,
				fill: "var(--color-chart-3)"
			},
			{
				name: "Paid",
				value: trialConverted,
				fill: "var(--color-chart-4)"
			},
			{
				name: "Renewed",
				value: renewals.length,
				fill: "var(--color-chart-5)"
			}
		];
		const freeCount = activeSubs.filter((s) => s.plan === "free").length || 1;
		const proCount = activeSubs.filter((s) => s.plan === "pro").length;
		const teamCount = activeSubs.filter((s) => s.plan === "team").length;
		const entCount = activeSubs.filter((s) => s.plan === "enterprise").length;
		const conversionFunnel = [
			{
				name: "Signup",
				value: signups,
				fill: "var(--color-chart-1)"
			},
			{
				name: "Active",
				value: activeSubs.length,
				fill: "var(--color-chart-2)"
			},
			{
				name: "Paid",
				value: proCount + teamCount + entCount,
				fill: "var(--color-chart-3)"
			},
			{
				name: "Retained",
				value: renewals.length,
				fill: "var(--color-chart-4)"
			}
		];
		const upgradeFunnel = [
			{
				name: "Free",
				value: freeCount,
				fill: "var(--color-chart-1)"
			},
			{
				name: "Pro",
				value: proCount,
				fill: "var(--color-chart-2)"
			},
			{
				name: "Team",
				value: teamCount,
				fill: "var(--color-chart-3)"
			},
			{
				name: "Enterprise",
				value: entCount,
				fill: "var(--color-chart-4)"
			}
		];
		const canceled = data.subs.filter((s) => s.status === "canceled").length;
		const pastDue = data.subs.filter((s) => s.status === "past_due").length;
		const cancellationFunnel = [
			{
				name: "Active",
				value: activeSubs.length,
				fill: "var(--color-chart-2)"
			},
			{
				name: "Past due",
				value: pastDue,
				fill: "var(--color-chart-4)"
			},
			{
				name: "Canceled",
				value: canceled,
				fill: "var(--color-chart-5)"
			}
		];
		const countryUsers = /* @__PURE__ */ new Map();
		data.users.forEach((u) => {
			const c = u.country ?? "Unknown";
			countryUsers.set(c, (countryUsers.get(c) ?? 0) + 1);
		});
		const topCountries = Array.from(countryUsers.entries()).map(([country, users]) => ({
			country,
			users
		})).sort((a, b) => b.users - a.users).slice(0, 10);
		return {
			grossRevenue: gross,
			subsRevenue: activeSubs.reduce((s, x) => s + x.amount_cents, 0),
			refundedCents,
			trialsCount: trials.length,
			renewalsCount: renewals.length,
			failedCount: failed.length,
			stripeRev,
			appleRev,
			googleRev,
			adsRev,
			mrrCents,
			arrCents,
			arpuCents,
			ltvCents,
			cacCents,
			refundRate,
			trialConversion,
			renewalRate,
			monthly,
			byCountry,
			revenueSources,
			subscriptionFunnel,
			conversionFunnel,
			upgradeFunnel,
			cancellationFunnel,
			topCountries,
			topPlans
		};
	}, [data, range]);
	const isLoading = query.isLoading || !m;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Financial Analytics Center",
			description: "Revenue, subscriptions, refunds, funnels and unit economics across every payment provider.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateRangePicker, {
					range,
					onPreset: setPreset,
					onCustom: setCustom
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
					filename: "finance-summary",
					title: "Finance summary",
					label: "Export all",
					rows: () => m ? [
						{
							metric: "Gross revenue",
							value: formatCurrency(m.grossRevenue)
						},
						{
							metric: "MRR",
							value: formatCurrency(m.mrrCents)
						},
						{
							metric: "ARR",
							value: formatCurrency(m.arrCents)
						},
						{
							metric: "ARPU",
							value: formatCurrency(m.arpuCents)
						},
						{
							metric: "LTV",
							value: formatCurrency(m.ltvCents)
						},
						{
							metric: "CAC",
							value: formatCurrency(m.cacCents)
						},
						{
							metric: "Refund rate",
							value: `${(m.refundRate * 100).toFixed(2)}%`
						},
						{
							metric: "Trial conversion",
							value: `${(m.trialConversion * 100).toFixed(2)}%`
						},
						{
							metric: "Renewal rate",
							value: `${(m.renewalRate * 100).toFixed(2)}%`
						},
						{
							metric: "Stripe revenue",
							value: formatCurrency(m.stripeRev)
						},
						{
							metric: "Apple revenue",
							value: formatCurrency(m.appleRev)
						},
						{
							metric: "Google revenue",
							value: formatCurrency(m.googleRev)
						},
						{
							metric: "Advertising revenue",
							value: formatCurrency(m.adsRev)
						}
					] : []
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Revenue",
					value: formatCurrency(m?.grossRevenue ?? 0),
					icon: DollarSign,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Subscriptions",
					value: formatCurrency(m?.subsRevenue ?? 0),
					icon: CreditCard,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Refunds",
					value: formatCurrency(m?.refundedCents ?? 0),
					icon: Receipt,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Trials",
					value: String(m?.trialsCount ?? 0),
					icon: Sparkles,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Renewals",
					value: String(m?.renewalsCount ?? 0),
					icon: RefreshCw,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Failed Payments",
					value: String(m?.failedCount ?? 0),
					icon: CircleAlert,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Stripe Revenue",
					value: formatCurrency(m?.stripeRev ?? 0),
					icon: DollarSign,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Apple Revenue",
					value: formatCurrency(m?.appleRev ?? 0),
					icon: Apple,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Google Revenue",
					value: formatCurrency(m?.googleRev ?? 0),
					icon: CirclePlay,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Advertising Revenue",
					value: formatCurrency(m?.adsRev ?? 0),
					icon: Megaphone,
					loading: isLoading
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "MRR",
					value: formatCurrency(m?.mrrCents ?? 0),
					icon: Repeat,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "ARR",
					value: formatCurrency(m?.arrCents ?? 0),
					icon: TrendingUp,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "ARPU",
					value: formatCurrency(m?.arpuCents ?? 0),
					icon: Users,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "LTV",
					value: formatCurrency(m?.ltvCents ?? 0),
					icon: Coins,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "CAC",
					value: formatCurrency(m?.cacCents ?? 0),
					icon: Target,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Refund Rate",
					value: `${((m?.refundRate ?? 0) * 100).toFixed(1)}%`,
					icon: Percent,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Trial Conversion",
					value: `${((m?.trialConversion ?? 0) * 100).toFixed(1)}%`,
					icon: Percent,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Renewal Rate",
					value: `${((m?.renewalRate ?? 0) * 100).toFixed(1)}%`,
					icon: Percent,
					loading: isLoading
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Revenue by Month",
					description: "Stacked by provider · last 12 months",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
						filename: "revenue-by-month",
						title: "Revenue by Month",
						rows: () => m?.monthly ?? []
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: m?.monthly ?? [],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickFormatter: (v) => formatCompact(Number(v))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										formatter: (v) => formatCurrency(Number(v) * 100)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "stripe",
										stackId: "a",
										fill: "var(--color-chart-1)",
										name: "Stripe"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "apple",
										stackId: "a",
										fill: "var(--color-chart-2)",
										name: "Apple"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "google",
										stackId: "a",
										fill: "var(--color-chart-3)",
										name: "Google"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "ads",
										stackId: "a",
										fill: "var(--color-chart-4)",
										name: "Ads"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brush, {
										dataKey: "month",
										height: 22,
										stroke: "var(--color-primary)"
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Revenue by Country",
					description: "Top 10 countries",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
						filename: "revenue-by-country",
						title: "Revenue by Country",
						rows: () => m?.byCountry ?? []
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: m?.byCountry ?? [],
								layout: "vertical",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickFormatter: (v) => formatCompact(Number(v))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "country",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										width: 90
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										formatter: (v) => formatCurrency(Number(v) * 100)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "revenue",
										fill: "var(--color-chart-2)"
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Subscription Funnel",
					description: "Visitor → Signup → Trial → Paid → Renewed",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
						filename: "subscription-funnel",
						title: "Subscription Funnel",
						rows: () => m?.subscriptionFunnel ?? []
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FunnelChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
								dataKey: "value",
								data: m?.subscriptionFunnel ?? [],
								isAnimationActive: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
									position: "right",
									fill: "var(--color-foreground)",
									stroke: "none",
									dataKey: "name"
								})
							})] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Conversion Funnel",
					description: "Signup → Active → Paid → Retained",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
						filename: "conversion-funnel",
						title: "Conversion Funnel",
						rows: () => m?.conversionFunnel ?? []
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FunnelChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
								dataKey: "value",
								data: m?.conversionFunnel ?? [],
								isAnimationActive: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
									position: "right",
									fill: "var(--color-foreground)",
									stroke: "none",
									dataKey: "name"
								})
							})] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Upgrade Funnel",
					description: "Free → Pro → Team → Enterprise",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
						filename: "upgrade-funnel",
						title: "Upgrade Funnel",
						rows: () => m?.upgradeFunnel ?? []
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FunnelChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
								dataKey: "value",
								data: m?.upgradeFunnel ?? [],
								isAnimationActive: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
									position: "right",
									fill: "var(--color-foreground)",
									stroke: "none",
									dataKey: "name"
								})
							})] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Cancellation Funnel",
					description: "Active → Past due → Canceled",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
						filename: "cancellation-funnel",
						title: "Cancellation Funnel",
						rows: () => m?.cancellationFunnel ?? []
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FunnelChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
								dataKey: "value",
								data: m?.cancellationFunnel ?? [],
								isAnimationActive: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelList, {
									position: "right",
									fill: "var(--color-foreground)",
									stroke: "none",
									dataKey: "name"
								})
							})] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Top Revenue Sources",
					description: "Provider mix",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
						filename: "top-revenue-sources",
						title: "Top Revenue Sources",
						rows: () => m?.revenueSources ?? []
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: tooltipStyle,
									formatter: (v) => formatCurrency(Number(v) * 100)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: m?.revenueSources ?? [],
									dataKey: "value",
									nameKey: "name",
									outerRadius: 90,
									innerRadius: 45,
									children: (m?.revenueSources ?? []).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: PIE_COLORS[i % PIE_COLORS.length] }, i))
								})
							] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "MRR Trend",
					description: "Estimated monthly recurring revenue",
					actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
						filename: "mrr-trend",
						title: "MRR Trend",
						rows: () => (m?.monthly ?? []).map((r) => ({
							month: r.month,
							mrr: r.total
						}))
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: m?.monthly ?? [],
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										tickFormatter: (v) => formatCompact(Number(v))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										formatter: (v) => formatCurrency(Number(v) * 100)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "total",
										stroke: "var(--color-chart-1)",
										strokeWidth: 2,
										dot: false,
										name: "Revenue"
									})
								]
							})
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5 shadow-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Top Countries"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "By user count"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
							filename: "top-countries",
							title: "Top Countries",
							rows: () => m?.topCountries ?? []
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: (m?.topCountries ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.country }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-muted-foreground",
								children: formatCompact(c.users)
							})]
						}, c.country))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5 shadow-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Top Plans"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "By active revenue"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
							filename: "top-plans",
							title: "Top Plans",
							rows: () => m?.topPlans ?? []
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: (m?.topPlans ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "capitalize",
								children: p.plan
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-muted-foreground",
								children: [
									formatCurrency(p.revenue * 100),
									" · ",
									p.count
								]
							})]
						}, p.plan))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5 shadow-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Top Revenue Sources"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Provider ranking"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
							filename: "revenue-sources-ranked",
							title: "Top Revenue Sources",
							rows: () => m?.revenueSources ?? []
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						children: (m?.revenueSources ?? []).slice().sort((a, b) => b.value - a.value).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-muted-foreground",
								children: formatCurrency(r.value * 100)
							})]
						}, r.name))
					})]
				})
			]
		})
	] });
}
export { FinancePage as component };
