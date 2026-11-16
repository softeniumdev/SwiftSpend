import { a as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { n as buttonVariants, t as Button } from "./button-BRHp6KPB.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { Dt as ChevronDown, Et as ChevronLeft, Mt as Calendar$1, Tt as ChevronRight } from "../_libs/lucide-react.mjs";
import { N as startOfDay, a as subDays, f as format, t as subYears } from "../_libs/date-fns.mjs";
import { n as getDefaultClassNames, t as DayPicker } from "../_libs/react-day-picker.mjs";
import { i as PopoverTrigger$1, n as PopoverContent$1, r as PopoverPortal, t as Popover$1 } from "../_libs/radix-ui__react-popover.mjs";
// node_modules/.nitro/vite/services/ssr/assets/useDateRange-ClgwuHQG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", defaultClassNames.dropdown_root),
			dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
			caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-muted-foreground select-none text-[0.8rem]", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", defaultClassNames.day),
			range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
			today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
var Popover = Popover$1;
var PopoverTrigger = PopoverTrigger$1;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent$1, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = PopoverContent$1.displayName;
var PRESETS = [
	{
		id: "today",
		label: "Today"
	},
	{
		id: "7d",
		label: "7d"
	},
	{
		id: "30d",
		label: "30d"
	},
	{
		id: "90d",
		label: "90d"
	},
	{
		id: "1y",
		label: "1y"
	}
];
function DateRangePicker({ range, onPreset, onCustom }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-1 rounded-lg border bg-card p-1",
		children: [PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: range.preset === p.id ? "default" : "ghost",
			className: "h-7 px-3 text-xs",
			onClick: () => onPreset(p.id),
			children: p.label
		}, p.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: range.preset === "custom" ? "default" : "ghost",
				className: cn("h-7 gap-1.5 px-3 text-xs"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar$1, { className: "h-3.5 w-3.5" }), range.preset === "custom" ? `${format(range.from, "MMM d")} – ${format(range.to, "MMM d")}` : "Custom"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
			className: "w-auto p-0",
			align: "end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
				mode: "range",
				selected: {
					from: range.from,
					to: range.to
				},
				onSelect: (v) => {
					if (v?.from && v?.to) onCustom(v.from, v.to);
				},
				numberOfMonths: 2,
				className: cn("p-3 pointer-events-auto")
			})
		})] })]
	});
}
function presetToRange(preset) {
	const to = /* @__PURE__ */ new Date();
	return {
		from: (() => {
			switch (preset) {
				case "today": return startOfDay(to);
				case "7d": return subDays(to, 7);
				case "30d": return subDays(to, 30);
				case "90d": return subDays(to, 90);
				case "1y": return subYears(to, 1);
			}
		})(),
		to,
		preset
	};
}
function useDateRange(initial = "30d") {
	const [range, setRange] = (0, import_react.useState)(() => presetToRange(initial));
	const setPreset = (p) => setRange(presetToRange(p));
	const setCustom = (from, to) => setRange({
		from,
		to,
		preset: "custom"
	});
	return {
		range,
		setRange,
		setPreset,
		setCustom,
		days: (0, import_react.useMemo)(() => Math.max(1, Math.ceil((range.to.getTime() - range.from.getTime()) / 864e5)), [range])
	};
}
export { useDateRange as n, DateRangePicker as t };
