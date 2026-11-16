import { a as __toESM } from "../_runtime.mjs";
import { t as PageHeader } from "./PageHeader-DDqUEuWs.mjs";
import { t as StatCard } from "./StatCard-CVanclUU.mjs";
import { n as tooltipStyle, t as ChartCard } from "./ChartCard-BavA1i-C.mjs";
import { n as useDateRange, t as DateRangePicker } from "./useDateRange-ClgwuHQG.mjs";
import { t as useRealtimeInvalidate } from "./useRealtimeInvalidate-Bt8_dkae.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { n as formatCurrency, t as formatCompact } from "./format-D3NUXAym.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { L as Percent, M as Repeat, Nt as CalendarRange, Pt as CalendarDays, c as UserX, d as UserCheck, ht as Crown, i as Wifi, m as TrendingUp, mt as DollarSign, o as Users, s as User, u as UserMinus, vt as Coins } from "../_libs/lucide-react.mjs";
import { _ as Tooltip, a as BarChart, c as XAxis, d as Line, f as CartesianGrid, g as Cell, i as PieChart, l as Bar, m as Pie, o as LineChart, p as Brush, r as AreaChart, s as YAxis, u as Area, v as Legend, y as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
import { C as eachDayOfInterval, N as startOfDay, S as eachMonthOfInterval, a as subDays, c as isBefore, f as format, l as isAfter, x as startOfMonth, y as startOfYear } from "../_libs/date-fns.mjs";
// node_modules/.nitro/vite/services/ssr/assets/dashboard-CB2Wjt6V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHART_COLORS = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)"
];
function DashboardPage() {
	const { range, setPreset, setCustom } = useDateRange("30d");
	const q = useQuery({
		queryKey: ["dashboard-analytics"],
		queryFn: async () => {
			const [users, subs, tx, ads] = await Promise.all([
				supabase.from("profiles").select("id, created_at, status, country, platform, last_seen_at, is_pro"),
				supabase.from("subscriptions").select("id, user_id, plan, status, amount_cents, interval, started_at, canceled_at"),
				supabase.from("transactions").select("id, amount, amount_cents, status, type, provider, created_at").order("created_at", { ascending: false }).limit(1e4),
				supabase.from("ad_campaigns").select("id, budget_cents, status")
			]);
			if (ads.error) console.warn("Ad campaigns fetch warning:", ads.error);
			return {
				users: users.data ?? [],
				subs: subs.data ?? [],
				tx: tx.data ?? [],
				ads: ads.data ?? []
			};
		},
		refetchInterval: 3e4
	});
	useRealtimeInvalidate([
		"profiles",
		"subscriptions",
		"transactions",
		"ad_campaigns"
	], ["dashboard-analytics"]);
	const users = q.data?.users ?? [];
	const subs = q.data?.subs ?? [];
	const tx = q.data?.tx ?? [];
	const ads = q.data?.ads ?? [];
	const inRange = (iso) => {
		const d = new Date(iso);
		return !isBefore(d, range.from) && !isAfter(d, range.to);
	};
	const stats = (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		const todayStart = startOfDay(now);
		const monthStart = startOfMonth(now);
		const yearStart = startOfYear(now);
		const onlineCutoff = subDays(now, 0);
		onlineCutoff.setMinutes(onlineCutoff.getMinutes() - 5);
		const totalUsers = users.length;
		const activeUsers = users.filter((u) => u.status === "active").length;
		const usersOnline = users.filter((u) => u.last_seen_at && new Date(u.last_seen_at) >= onlineCutoff).length;
		const proUsers = (/* @__PURE__ */ new Set([...subs.filter((s) => s.plan !== "free" && s.status === "active").map((s) => s.user_id), ...users.filter((u) => u.is_pro).map((u) => u.id)])).size;
		const freeUsers = Math.max(0, totalUsers - proUsers);
		const getCents = (t) => Number(t.amount_cents || (t.amount ? t.amount * 100 : 0));
		const succeeded = tx.filter((t) => t.status === "succeeded" && t.type === "charge");
		const todayRev = succeeded.filter((t) => new Date(t.created_at) >= todayStart).reduce((s, t) => s + getCents(t), 0);
		const monthRev = succeeded.filter((t) => new Date(t.created_at) >= monthStart).reduce((s, t) => s + getCents(t), 0);
		const yearRev = succeeded.filter((t) => new Date(t.created_at) >= yearStart).reduce((s, t) => s + getCents(t), 0);
		const activeSubs = subs.filter((s) => s.status === "active" && s.plan !== "free");
		const fallbackPro = Math.max(0, proUsers - activeSubs.length);
		const mrr = activeSubs.reduce((sum, s) => sum + (s.interval === "yearly" ? s.amount_cents / 12 : s.amount_cents), 0) + fallbackPro * 299;
		const arr = mrr * 12;
		const arpu = totalUsers > 0 ? mrr / totalUsers : 0;
		const canceled = subs.filter((s) => s.status === "canceled").length;
		const totalPaidEver = subs.filter((s) => s.plan !== "free").length;
		const churnRate = totalPaidEver > 0 ? canceled / totalPaidEver : .05;
		return {
			totalUsers,
			activeUsers,
			usersOnline,
			freeUsers,
			proUsers,
			todayRev,
			monthRev,
			yearRev,
			mrr,
			arr,
			arpu,
			ltv: churnRate > 0 ? arpu / churnRate : arpu * 24,
			conversionRate: totalUsers > 0 ? proUsers / totalUsers * 100 : 0,
			churnRate: churnRate * 100
		};
	}, [
		users,
		subs,
		tx
	]);
	const dailyRevenue = (0, import_react.useMemo)(() => {
		return eachDayOfInterval({
			start: range.from,
			end: range.to
		}).map((d) => {
			const key = format(d, "yyyy-MM-dd");
			const label = format(d, "MMM d");
			const getCents = (t) => Number(t.amount_cents || (t.amount ? t.amount * 100 : 0));
			return {
				day: label,
				revenue: tx.filter((t) => t.status === "succeeded" && t.type === "charge" && format(new Date(t.created_at), "yyyy-MM-dd") === key).reduce((s, t) => s + getCents(t), 0) / 100
			};
		});
	}, [tx, range]);
	const monthlyRevenue = (0, import_react.useMemo)(() => {
		const start = new Date(range.from);
		start.setDate(1);
		return eachMonthOfInterval({
			start,
			end: range.to
		}).map((m) => {
			const key = format(m, "yyyy-MM");
			const getCents = (t) => Number(t.amount_cents || (t.amount ? t.amount * 100 : 0));
			const monthRev = tx.filter((t) => t.status === "succeeded" && t.type === "charge" && format(new Date(t.created_at), "yyyy-MM") === key).reduce((s, t) => s + getCents(t), 0);
			return {
				month: format(m, "MMM yy"),
				revenue: monthRev / 100
			};
		});
	}, [tx, range]);
	const subscriptionGrowth = (0, import_react.useMemo)(() => {
		return eachDayOfInterval({
			start: range.from,
			end: range.to
		}).map((d) => {
			return {
				day: format(d, "MMM d"),
				total: subs.filter((s) => s.plan !== "free" && new Date(s.started_at) <= d).length,
				new: subs.filter((s) => s.plan !== "free" && format(new Date(s.started_at), "yyyy-MM-dd") === format(d, "yyyy-MM-dd")).length
			};
		});
	}, [subs, range]);
	const conversionFunnel = (0, import_react.useMemo)(() => {
		return eachDayOfInterval({
			start: range.from,
			end: range.to
		}).map((d) => {
			const key = format(d, "yyyy-MM-dd");
			const newFree = users.filter((u) => format(new Date(u.created_at), "yyyy-MM-dd") === key).length;
			const newPro = subs.filter((s) => s.plan !== "free" && format(new Date(s.started_at), "yyyy-MM-dd") === key).length;
			return {
				day: format(d, "MMM d"),
				rate: newFree > 0 ? Math.min(100, newPro / newFree * 100) : 0
			};
		});
	}, [
		users,
		subs,
		range
	]);
	const revenueSources = (0, import_react.useMemo)(() => {
		const succeeded = tx.filter((t) => t.status === "succeeded" && t.type === "charge" && inRange(t.created_at));
		const getCents = (t) => Number(t.amount_cents || (t.amount ? t.amount * 100 : 0));
		const bucket = (p) => succeeded.filter((t) => (t.provider || "").toLowerCase() === p.toLowerCase()).reduce((s, t) => s + getCents(t), 0) / 100;
		const adsRev = ads.reduce((s, a) => s + Number(a.revenue_cents ?? a.budget_cents ?? 0), 0) / 100;
		return [
			{
				name: "Stripe",
				value: bucket("stripe")
			},
			{
				name: "Apple",
				value: bucket("apple")
			},
			{
				name: "Google Play",
				value: bucket("google_play")
			},
			{
				name: "Ads",
				value: adsRev
			}
		];
	}, [
		tx,
		ads,
		range
	]);
	const userRegistrations = (0, import_react.useMemo)(() => {
		return eachDayOfInterval({
			start: range.from,
			end: range.to
		}).map((d) => {
			const key = format(d, "yyyy-MM-dd");
			const count = users.filter((u) => format(new Date(u.created_at), "yyyy-MM-dd") === key).length;
			return {
				day: format(d, "MMM d"),
				users: count
			};
		});
	}, [users, range]);
	const platformDistribution = (0, import_react.useMemo)(() => {
		const rangeUsers = users.filter((u) => inRange(u.created_at));
		const src = rangeUsers.length > 0 ? rangeUsers : users;
		const counts = {
			ios: 0,
			android: 0,
			web: 0
		};
		src.forEach((u) => {
			const p = u.platform ?? "web";
			counts[p] = (counts[p] ?? 0) + 1;
		});
		return Object.entries(counts).map(([name, value]) => ({
			name: name.charAt(0).toUpperCase() + name.slice(1),
			value
		}));
	}, [users, range]);
	const countryDistribution = (0, import_react.useMemo)(() => {
		const rangeUsers = users.filter((u) => inRange(u.created_at));
		const src = rangeUsers.length > 0 ? rangeUsers : users;
		const counts = {};
		src.forEach((u) => {
			const c = u.country ?? "—";
			counts[c] = (counts[c] ?? 0) + 1;
		});
		return Object.entries(counts).map(([country, users]) => ({
			country,
			users
		})).sort((a, b) => b.users - a.users).slice(0, 10);
	}, [users, range]);
	const loading = q.isLoading;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Analytics",
			description: "World-class real-time analytics for Budget Buddy.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					className: "gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative flex h-2 w-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success" })]
					}), "Live"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateRangePicker, {
					range,
					onPreset: setPreset,
					onCustom: setCustom
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total Users",
					value: formatCompact(stats.totalUsers),
					icon: Users,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Active Users",
					value: formatCompact(stats.activeUsers),
					icon: UserCheck,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Users Online",
					value: formatCompact(stats.usersOnline),
					icon: Wifi,
					loading,
					hint: "Last 5 min"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Free Users",
					value: formatCompact(stats.freeUsers),
					icon: UserX,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pro Users",
					value: formatCompact(stats.proUsers),
					icon: Crown,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Today's Revenue",
					value: formatCurrency(stats.todayRev),
					icon: DollarSign,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Monthly Revenue",
					value: formatCurrency(stats.monthRev),
					icon: CalendarDays,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Annual Revenue",
					value: formatCurrency(stats.yearRev),
					icon: CalendarRange,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "MRR",
					value: formatCurrency(stats.mrr),
					icon: Repeat,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "ARR",
					value: formatCurrency(stats.arr),
					icon: TrendingUp,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "ARPU",
					value: formatCurrency(stats.arpu),
					icon: User,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Lifetime Value",
					value: formatCurrency(stats.ltv),
					icon: Coins,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Conversion Rate",
					value: `${stats.conversionRate.toFixed(1)}%`,
					icon: Percent,
					loading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Subscription Churn",
					value: `${stats.churnRate.toFixed(1)}%`,
					icon: UserMinus,
					loading
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Daily Revenue",
					description: "Zoom with the range slider below",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: dailyRevenue,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "dr",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--color-chart-1)",
											stopOpacity: .5
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--color-chart-1)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "revenue",
										stroke: "var(--color-chart-1)",
										strokeWidth: 2,
										fill: "url(#dr)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brush, {
										dataKey: "day",
										height: 22,
										stroke: "var(--color-chart-1)",
										travellerWidth: 8
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Monthly Revenue",
					description: "Grouped by month",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: monthlyRevenue,
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
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										cursor: {
											fill: "var(--color-muted)",
											opacity: .4
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "revenue",
										fill: "var(--color-chart-2)",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Subscription Growth",
					description: "Cumulative + new paid subs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: subscriptionGrowth,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "sg",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--color-chart-3)",
											stopOpacity: .5
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--color-chart-3)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "total",
										stroke: "var(--color-chart-3)",
										strokeWidth: 2,
										fill: "url(#sg)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "new",
										stroke: "var(--color-chart-4)",
										strokeWidth: 2,
										dot: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brush, {
										dataKey: "day",
										height: 22,
										stroke: "var(--color-chart-3)",
										travellerWidth: 8
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Free → Pro Conversion",
					description: "Daily conversion rate %",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: conversionFunnel,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										unit: "%"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										formatter: (v) => `${Number(v).toFixed(1)}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "rate",
										stroke: "var(--color-chart-5)",
										strokeWidth: 2,
										dot: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brush, {
										dataKey: "day",
										height: 22,
										stroke: "var(--color-chart-5)",
										travellerWidth: 8
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Revenue Sources",
					description: "Stripe · Apple · Google Play · Ads",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: revenueSources,
									dataKey: "value",
									nameKey: "name",
									cx: "50%",
									cy: "50%",
									innerRadius: 60,
									outerRadius: 100,
									paddingAngle: 2,
									children: revenueSources.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: CHART_COLORS[i % CHART_COLORS.length] }, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: tooltipStyle,
									formatter: (v) => formatCurrency(Number(v) * 100)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } })
							] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "User Registrations",
					description: "New signups per day",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: userRegistrations,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										cursor: {
											fill: "var(--color-muted)",
											opacity: .4
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "users",
										fill: "var(--color-chart-1)",
										radius: [
											6,
											6,
											0,
											0
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brush, {
										dataKey: "day",
										height: 22,
										stroke: "var(--color-chart-1)",
										travellerWidth: 8
									})
								]
							})
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Platform Distribution",
					description: "iOS · Android · Web",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: platformDistribution,
									dataKey: "value",
									nameKey: "name",
									cx: "50%",
									cy: "50%",
									outerRadius: 110,
									label: (entry) => `${entry.name}`,
									children: platformDistribution.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: CHART_COLORS[i % CHART_COLORS.length] }, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } })
							] })
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
					title: "Country Distribution",
					description: "Top 10 countries",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: countryDistribution,
								layout: "vertical",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--color-border)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "country",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										width: 40
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										cursor: {
											fill: "var(--color-muted)",
											opacity: .4
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "users",
										fill: "var(--color-chart-2)",
										radius: [
											0,
											6,
											6,
											0
										]
									})
								]
							})
						})
					})
				})
			]
		})
	] });
}
export { DashboardPage as component };
