import { o as __toESM } from "../_runtime.mjs";
import { n as toCSV, t as downloadCSV } from "./csv-C5d8Sirq.mjs";
import { n as writeFileSync, t as utils } from "../_libs/xlsx.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
// node_modules/.nitro/vite/services/ssr/assets/export-B050p1Wk.js
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
function exportCSV(filename, rows) {
	downloadCSV(`${filename}.csv`, toCSV(rows));
}
function exportExcel(filename, rows, sheetName = "Sheet1") {
	const ws = utils.json_to_sheet(rows);
	const wb = utils.book_new();
	utils.book_append_sheet(wb, ws, sheetName.slice(0, 31));
	writeFileSync(wb, `${filename}.xlsx`);
}
function exportPDF(filename, title, rows) {
	const doc = new import_jspdf_node_min.default({ orientation: "landscape" });
	doc.setFontSize(14);
	doc.text(title, 14, 15);
	doc.setFontSize(9);
	doc.setTextColor(120);
	doc.text((/* @__PURE__ */ new Date()).toLocaleString(), 14, 21);
	if (rows.length) {
		const headers = Object.keys(rows[0]);
		autoTable(doc, {
			startY: 26,
			head: [headers],
			body: rows.map((r) => headers.map((h) => String(r[h] ?? ""))),
			styles: {
				fontSize: 8,
				cellPadding: 2
			},
			headStyles: { fillColor: [
				30,
				41,
				59
			] }
		});
	}
	doc.save(`${filename}.pdf`);
}
export { exportExcel as n, exportPDF as r, exportCSV as t };
