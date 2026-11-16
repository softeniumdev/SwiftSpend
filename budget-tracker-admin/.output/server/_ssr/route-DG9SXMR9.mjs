import { a as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-DWGjSd5x.mjs";
import { t as Button } from "./button-BRHp6KPB.mjs";
import { t as Input } from "./input-CqV36rr2.mjs";
import { t as Separator } from "./separator-DA5o5Z3r.mjs";
import { n as useAdminSession, t as PAGE_ROLES } from "./useAdminSession-DTEEJszo.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuLabel, n as DropdownMenuContent, o as DropdownMenuTrigger, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-DoXW0ikn.mjs";
import { n as AvatarFallback, t as Avatar } from "./avatar-Bp0QKi9c.mjs";
import { t as Badge } from "./badge-CRSM8iyI.mjs";
import { t as useThemeStore } from "./theme-yMIJDpZA.mjs";
import { t as supabase } from "./client-DDYNpkNy.mjs";
import { o as initials } from "./format-D3NUXAym.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-pLK6MnOG.mjs";
import { t as Forbidden } from "./Forbidden-JIo-79Il.mjs";
import { n as logAudit } from "./audit-CrMRURCU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link, g as Outlet, p as useRouterState, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Slot, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, l as Dialog$1, m as DialogPortal, p as DialogOverlay, u as DialogClose, z as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as LifeBuoy, At as ChartLine, D as Search, K as Megaphone, Lt as Bell, O as ScrollText, Q as LoaderCircle, S as ShieldOff, T as Settings, Tt as ChevronRight, U as Moon, V as PanelLeft, W as MonitorSmartphone, Y as LogOut, _ as Sun, a as Wallet, b as SlidersVertical, ct as FileText, ft as Ellipsis, gt as CreditCard, jt as ChartColumn, kt as CheckCheck, mt as DollarSign, n as X, o as Users, s as User, tt as LayoutDashboard, w as ShieldAlert, yt as Clock } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as TooltipTrigger$1, i as TooltipProvider$1, n as TooltipContent$1, r as TooltipPortal, t as Tooltip$1 } from "../_libs/radix-ui__react-tooltip.mjs";
// node_modules/.nitro/vite/services/ssr/assets/route-DG9SXMR9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
var Sheet = Dialog$1;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent$1.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle$1.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription$1.displayName;
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
var TooltipProvider = TooltipProvider$1;
var Tooltip = Tooltip$1;
var TooltipTrigger = TooltipTrigger$1;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent$1, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}) }));
TooltipContent.displayName = TooltipContent$1.displayName;
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 604800;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = import_react.createContext(null);
function useSidebar() {
	const context = import_react.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
var SidebarProvider = import_react.forwardRef(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = import_react.useState(false);
	const [_open, _setOpen] = import_react.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = import_react.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = import_react.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = import_react.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
			delayDuration: 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					"--sidebar-width": SIDEBAR_WIDTH,
					"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
					...style
				},
				className: cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className),
				ref,
				...props,
				children
			})
		})
	});
});
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = import_react.forwardRef(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		ref,
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			"data-sidebar": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-sidebar": "sidebar",
				className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
				children
			})
		})]
	});
});
Sidebar.displayName = "Sidebar";
var SidebarTrigger = import_react.forwardRef(({ className, onClick, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		ref,
		"data-sidebar": "trigger",
		variant: "ghost",
		size: "icon",
		className: cn("h-7 w-7", className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
});
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = import_react.forwardRef(({ className, ...props }, ref) => {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		"data-sidebar": "rail",
		"aria-label": "Toggle Sidebar",
		tabIndex: -1,
		onClick: toggleSidebar,
		title: "Toggle Sidebar",
		className: cn("absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex", "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize", "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize", "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar", "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2", "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2", className),
		...props
	});
});
SidebarRail.displayName = "SidebarRail";
var SidebarInset = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		ref,
		className: cn("relative flex w-full flex-1 flex-col bg-background", "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className),
		...props
	});
});
SidebarInset.displayName = "SidebarInset";
var SidebarInput = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
		ref,
		"data-sidebar": "input",
		className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className),
		...props
	});
});
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
});
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		ref,
		"data-sidebar": "separator",
		className: cn("mx-2 w-auto bg-sidebar-border", className),
		...props
	});
});
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"data-sidebar": "content",
		className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
});
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
});
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = import_react.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "div", {
		ref,
		"data-sidebar": "group-label",
		className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className),
		...props
	});
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = import_react.forwardRef(({ className, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "group-action",
		className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	"data-sidebar": "group-content",
	className: cn("w-full text-sm", className),
	...props
}));
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	ref,
	"data-sidebar": "menu",
	className: cn("flex w-full min-w-0 flex-col gap-1", className),
	...props
}));
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	ref,
	"data-sidebar": "menu-item",
	className: cn("group/menu-item relative", className),
	...props
}));
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = cva("peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var SidebarMenuButton = import_react.forwardRef(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "button";
	const { isMobile, state } = useSidebar();
	const button = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
		ref,
		"data-sidebar": "menu-button",
		"data-size": size,
		"data-active": isActive,
		className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className),
		...props
	});
	if (!tooltip) return button;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: button
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
});
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = import_react.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		"data-sidebar": "menu-action",
		className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className),
		...props
	});
});
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	"data-sidebar": "menu-badge",
	className: cn("pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = import_react.forwardRef(({ className, showIcon = false, ...props }, ref) => {
	const width = import_react.useMemo(() => {
		return `${Math.floor(Math.random() * 40) + 50}%`;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		"data-sidebar": "menu-skeleton",
		className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
		...props,
		children: [showIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			className: "size-4 rounded-md",
			"data-sidebar": "menu-skeleton-icon"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			className: "h-4 max-w-(--skeleton-width) flex-1",
			"data-sidebar": "menu-skeleton-text",
			style: { "--skeleton-width": width }
		})]
	});
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	ref,
	"data-sidebar": "menu-sub",
	className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className),
	...props
}));
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	ref,
	...props
}));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = import_react.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "a", {
		ref,
		"data-sidebar": "menu-sub-button",
		"data-size": size,
		"data-active": isActive,
		className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className),
		...props
	});
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
var item = (title, url, icon, description) => ({
	title,
	url,
	icon,
	description,
	roles: PAGE_ROLES[url] ?? []
});
var NAV_ITEMS = [
	item("Dashboard", "/dashboard", LayoutDashboard, "Overview & KPIs"),
	item("Users", "/users", Users, "Manage user accounts"),
	item("Subscriptions", "/subscriptions", CreditCard, "Plans & billing"),
	item("Revenue", "/revenue", DollarSign, "Transactions & MRR"),
	item("Finance", "/finance", ChartLine, "Financial analytics center"),
	item("Advertising", "/advertising", Megaphone, "Ad campaigns"),
	item("Advertisement Manager", "/ad-manager", MonitorSmartphone, "In-app ad placements"),
	item("Content", "/content", FileText, "Articles & tips"),
	item("Moderation", "/moderation", ShieldAlert, "Reports queue"),
	item("Support", "/support", LifeBuoy, "Tickets"),
	item("Reports", "/reports", ChartColumn, "Exports & analytics"),
	item("Remote Config", "/remote-config", SlidersVertical, "Feature flags"),
	item("Notifications", "/notifications", Bell, "Push & in-app messages"),
	item("Settings", "/settings", Settings, "Workspace settings"),
	item("Audit Logs", "/audit-logs", ScrollText, "Admin activity")
];
function AdminSidebar() {
	const pathname = useRouterState({ select: (r) => r.location.pathname });
	const { hasAnyRole } = useAdminSession();
	const isActive = (url) => pathname === url || url !== "/dashboard" && pathname.startsWith(url);
	const items = NAV_ITEMS.filter((i) => hasAnyRole(i.roles));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
		collapsible: "icon",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, {
			className: "border-b border-sidebar-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-2 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col group-data-[collapsible=icon]:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold text-sidebar-foreground",
						children: "Budget Buddy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-wider text-sidebar-foreground/60",
						children: "Admin Console"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupLabel, { children: "Workspace" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
			asChild: true,
			isActive: isActive(item.url),
			tooltip: item.title,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.url,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.title })]
			})
		}) }, item.url)) }) })] }) })]
	});
}
var Breadcrumb = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
	ref,
	"aria-label": "breadcrumb",
	...props
}));
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
	ref,
	className: cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5", className),
	...props
}));
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	ref,
	className: cn("inline-flex items-center gap-1.5", className),
	...props
}));
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = import_react.forwardRef(({ asChild, className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "a", {
		ref,
		className: cn("transition-colors hover:text-foreground", className),
		...props
	});
});
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	ref,
	role: "link",
	"aria-disabled": "true",
	"aria-current": "page",
	className: cn("font-normal text-foreground", className),
	...props
}));
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = ({ children, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	role: "presentation",
	"aria-hidden": "true",
	className: cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className),
	...props,
	children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	role: "presentation",
	"aria-hidden": "true",
	className: cn("flex h-9 w-9 items-center justify-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "sr-only",
		children: "More"
	})]
});
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";
function timeAgo(dateStr) {
	const diff = Date.now() - new Date(dateStr).getTime();
	const mins = Math.floor(diff / 6e4);
	if (mins < 1) return "Just now";
	if (mins < 60) return `${mins}m ago`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `${hours}h ago`;
	return `${Math.floor(hours / 24)}d ago`;
}
function AdminTopbar({ email, fullName }) {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (r) => r.location.pathname });
	const { theme, toggle } = useThemeStore();
	const [query, setQuery] = (0, import_react.useState)("");
	const [events, setEvents] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const fetchEvents = async () => {
			const { data } = await supabase.from("admin_events").select("*").order("created_at", { ascending: false }).limit(20);
			if (data) setEvents(data);
		};
		fetchEvents();
		const channel = supabase.channel("admin_events_realtime").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "admin_events"
		}, () => {
			fetchEvents();
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, []);
	const unreadCount = events.filter((e) => !e.read).length;
	const markAsRead = async (event) => {
		if (!event.read) {
			await supabase.from("admin_events").update({ read: true }).eq("id", event.id);
			setEvents((prev) => prev.map((e) => e.id === event.id ? {
				...e,
				read: true
			} : e));
		}
		if (event.link) navigate({ to: event.link });
	};
	const markAllAsRead = async () => {
		const unreadIds = events.filter((e) => !e.read).map((e) => e.id);
		if (unreadIds.length === 0) return;
		await supabase.from("admin_events").update({ read: true }).in("id", unreadIds);
		setEvents((prev) => prev.map((e) => ({
			...e,
			read: true
		})));
	};
	const current = NAV_ITEMS.find((n) => pathname === n.url || n.url !== "/dashboard" && pathname.startsWith(n.url));
	const results = query ? NAV_ITEMS.filter((n) => n.title.toLowerCase().includes(query.toLowerCase())) : [];
	const signOut = async () => {
		const { logAudit } = await import("./audit-CrMRURCU.mjs").then((n) => n.t).then((n) => n.t);
		const { clearRememberMarker } = await import("./remember-DXJr3Vgh.mjs");
		await logAudit({
			action: "auth.signout",
			resource_type: "auth"
		});
		clearRememberMarker();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
				orientation: "vertical",
				className: "h-6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumb, {
				className: "hidden md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BreadcrumbList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbLink, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Admin"
						})
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreadcrumbPage, { children: current?.title ?? "Home" }) })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex flex-1 items-center justify-end gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative hidden max-w-sm flex-1 md:block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search pages, users, invoices...",
								className: "pl-9"
							}),
							results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute left-0 right-0 top-full z-40 mt-1 rounded-md border bg-popover shadow-md",
								children: results.slice(0, 6).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: r.url,
									onClick: () => setQuery(""),
									className: "flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: "h-4 w-4 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1",
											children: r.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: r.description
										})
									]
								}, r.url))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: toggle,
						"aria-label": "Toggle theme",
						children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "icon",
							className: "relative",
							"aria-label": "Notifications",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "absolute right-1.5 top-1.5 flex h-2 w-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-destructive" })]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						className: "w-80 sm:w-96",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, {
								className: "flex items-center justify-between py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Notifications"
									}), unreadCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "destructive",
										className: "h-5 px-1.5 text-[10px]",
										children: [unreadCount, " new"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "h-5 px-1.5 text-[10px]",
										children: "All caught up"
									})]
								}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									className: "h-7 text-xs text-muted-foreground hover:text-foreground",
									onClick: markAllAsRead,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "mr-1 h-3.5 w-3.5" }), " Mark all read"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-80 overflow-y-auto py-1 divide-y divide-border/40",
								children: events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "py-6 text-center text-xs text-muted-foreground",
									children: "No notifications yet"
								}) : events.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => void markAsRead(n),
									className: `cursor-pointer px-3.5 py-2.5 transition-colors hover:bg-accent/70 ${!n.read ? "bg-accent/30 font-medium" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-foreground truncate",
											children: n.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-[10px] text-muted-foreground/80 tabular-nums",
											children: timeAgo(n.created_at)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-muted-foreground line-clamp-2",
										children: n.description
									})]
								}, n.id))
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							className: "h-9 gap-2 pl-2 pr-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								className: "h-7 w-7",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									className: "bg-primary text-xs text-primary-foreground",
									children: initials(fullName, email)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-sm font-medium sm:inline",
								children: fullName ?? email ?? "Admin"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						className: "w-56",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: fullName ?? "Admin"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: email
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/settings",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mr-2 h-4 w-4" }), " Profile & Settings"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
								onClick: signOut,
								className: "text-destructive focus:text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 h-4 w-4" }), " Sign out"]
							})
						]
					})] })
				]
			})
		]
	});
}
var ACTIVITY_EVENTS = [
	"mousemove",
	"mousedown",
	"keydown",
	"touchstart",
	"scroll"
];
/**
* Tracks user activity and fires warning + forced logout on inactivity.
* Defaults: warn at 25min, logout at 30min.
*/
function useSessionTimeout({ timeoutMs = 18e5, warningMs = 3e5, onWarning, onTimeout, enabled = true }) {
	const [warning, setWarning] = (0, import_react.useState)(false);
	const lastActivity = (0, import_react.useRef)(Date.now());
	const warnTimer = (0, import_react.useRef)(null);
	const logoutTimer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		const clearTimers = () => {
			if (warnTimer.current) window.clearTimeout(warnTimer.current);
			if (logoutTimer.current) window.clearTimeout(logoutTimer.current);
		};
		const arm = () => {
			clearTimers();
			warnTimer.current = window.setTimeout(() => {
				setWarning(true);
				onWarning?.();
			}, timeoutMs - warningMs);
			logoutTimer.current = window.setTimeout(() => {
				setWarning(false);
				onTimeout();
			}, timeoutMs);
		};
		const reset = () => {
			lastActivity.current = Date.now();
			if (!warning) arm();
		};
		ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, reset, { passive: true }));
		arm();
		return () => {
			clearTimers();
			ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, reset));
		};
	}, [
		enabled,
		timeoutMs,
		warningMs,
		onWarning,
		onTimeout,
		warning
	]);
	const dismiss = () => {
		setWarning(false);
		lastActivity.current = Date.now();
	};
	return {
		warning,
		dismiss
	};
}
function SessionTimeoutDialog({ open, countdownSec, onStay, onSignOut }) {
	const [remaining, setRemaining] = (0, import_react.useState)(countdownSec);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setRemaining(countdownSec);
		const id = window.setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1e3);
		return () => window.clearInterval(id);
	}, [open, countdownSec]);
	const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
	const ss = String(remaining % 60).padStart(2, "0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => !v && onStay(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-amber-500" }), " Are you still there?"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				"You've been inactive for a while. For your security, we'll sign you out automatically in ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono font-semibold",
					children: [
						mm,
						":",
						ss
					]
				}),
				"."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
				className: "gap-2 sm:justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onSignOut,
					children: "Sign out now"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onStay,
					children: "Stay signed in"
				})]
			})]
		})
	});
}
/**
* Applies a subtle enter animation to the current route's content.
* Keyed by pathname so each navigation replays the animation.
* Honors prefers-reduced-motion via CSS.
*/
function PageTransition({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "page-in",
		children
	}, pathname);
}
function AuthenticatedLayout() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const pathname = useRouterState({ select: (r) => r.location.pathname });
	const { loading, session, isStaff, isAdmin, roles, canAccess } = useAdminSession();
	const theme = useThemeStore((s) => s.theme);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);
	(0, import_react.useEffect)(() => {
		if (!loading && !session) navigate({
			to: "/auth",
			replace: true
		});
	}, [
		loading,
		session,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		const { data } = supabase.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_OUT") {
				qc.cancelQueries();
				qc.clear();
				navigate({
					to: "/auth",
					replace: true
				});
			}
		});
		return () => data.subscription.unsubscribe();
	}, [navigate, qc]);
	const forceSignOut = async (reason) => {
		await logAudit({
			action: reason === "timeout" ? "session.timeout" : "session.signout",
			resource_type: "session",
			resource_id: session?.user.id ?? null
		});
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
		if (reason === "timeout") toast.info("You've been signed out due to inactivity.");
	};
	const { warning, dismiss } = useSessionTimeout({
		enabled: !!session,
		timeoutMs: 18e5,
		warningMs: 3e5,
		onTimeout: () => void forceSignOut("timeout")
	});
	const profile = useQuery({
		queryKey: ["me-profile", session?.user.id],
		enabled: !!session?.user.id,
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("full_name, email").eq("id", session.user.id).maybeSingle();
			return data;
		}
	});
	if (loading || !session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	if (!isStaff) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, { className: "h-6 w-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-xl font-semibold",
					children: "Admin access required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Your account (",
						session.user.email,
						") is signed in but has no staff role assigned. Ask a Super Admin to grant you access."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						"Detected roles: ",
						roles.length ? roles.join(", ") : "none",
						" · Admin: ",
						String(isAdmin)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-6",
					onClick: () => void forceSignOut("manual"),
					children: "Sign out"
				})
			]
		})
	});
	const allowed = canAccess(pathname);
	const required = Object.entries(PAGE_ROLES).find(([p]) => pathname === p || pathname.startsWith(p + "/"))?.[1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#main-content",
			className: "skip-link",
			children: "Skip to content"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarInset, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTopbar, {
			email: session.user.email,
			fullName: profile.data?.full_name ?? void 0
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			id: "main-content",
			tabIndex: -1,
			className: "flex flex-1 flex-col p-4 sm:p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: allowed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Forbidden, {
				requiredRoles: required,
				userRoles: roles
			}) })
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionTimeoutDialog, {
			open: warning,
			countdownSec: 300,
			onStay: dismiss,
			onSignOut: () => void forceSignOut("manual")
		})
	] });
}
export { AuthenticatedLayout as component };
