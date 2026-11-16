// node_modules/.nitro/vite/services/ssr/assets/csv-C5d8Sirq.js
function toCSV(rows) {
	if (!rows.length) return "";
	const keys = Array.from(rows.reduce((set, r) => {
		Object.keys(r).forEach((k) => set.add(k));
		return set;
	}, /* @__PURE__ */ new Set()));
	const esc = (v) => {
		if (v == null) return "";
		const s = typeof v === "string" ? v : JSON.stringify(v);
		return /[",\n]/.test(s) ? `"${s.replace(/"/g, "\"\"")}"` : s;
	};
	return [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
}
function downloadCSV(filename, csv) {
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
export { toCSV as n, downloadCSV as t };
