import {
  PieChart as MuiPieChart,
  pieArcLabelClasses,
} from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import type { MonthlySummary } from "../../Types/Transaction";
import { formatMoney } from "../../utils/helpers";

const PERCENT_VISIBLE = 4;

export default function PieChart({
  monthlySummary,
}: {
  monthlySummary: MonthlySummary;
}) {
  const colorMap: Record<string, string> = {
    Bills: "#4F8A8B",
    Transport: "#FF5959",
    Pleasure: "#FFCA3A",
    Food: "#1982C4",
    Shopping: "#6A4C93",
    Investment: "#F3722C",
    Pets: "#B5838D",
    Healthcare: "#22223B",
    Uncategorized: "#000",
  };

  const categoryData = Object.keys(monthlySummary.categories)
    .filter((c) => c !== "Salary")
    .map((c) => {
      const transactions = monthlySummary.categories[c];
      const totalAmount = transactions.reduce(
        (acc, curr) => acc + curr.amount,
        0,
      );

      return {
        id: c,
        label: c,
        value: transactions.reduce((acc, curr) => acc + curr.amount, 0),
        percentage: (totalAmount / monthlySummary.expenseTotal) * 100,
        color: colorMap[c],
      };
    });

  const subCategoryData = Object.keys(monthlySummary.categories)
    .filter((c) => c !== "Salary")
    .flatMap((cat) => {
      const subCat: Record<string, number[]> = { General: [] };
      for (const tran of monthlySummary.categories[cat]) {
        if (tran.subCategory?.name) {
          if (subCat[tran.subCategory.name])
            subCat[tran.subCategory.name] = [
              ...subCat[tran.subCategory.name],
              tran.amount,
            ];
          else subCat[tran.subCategory.name] = [tran.amount];
        } else {
          subCat["General"] = [...subCat["General"], tran.amount];
        }
      }
      const catTotal = monthlySummary.categories[cat].reduce(
        (acc, curr) => acc + curr.amount,
        0,
      );
      let baseColor = colorMap[cat];
      return Object.keys(subCat).map((s, i) => {
        if (i > 0) baseColor = baseColor + (100 - 10 * i);
        const subCatTotal = subCat[s].reduce((acc, curr) => acc + curr, 0);

        return {
          id: cat + "+" + s,
          label: s,
          value: subCatTotal,
          percentage: (subCatTotal / catTotal) * 100,
          color: s === "General" ? "black" : baseColor,
        };
      });
    });

  const innerRadius = 50;
  const middleRadius = 120;

  return (
    <Box
      sx={{
        width: "90%",
        textAlign: "center",
        transform: "translateY(-50px)",
        svg: { overflow: "visible" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", height: 400 }}>
        <MuiPieChart
          series={[
            {
              innerRadius,
              outerRadius: middleRadius,
              data: categoryData,
              arcLabel: (item) => {
                const percentage =
                  (item.value / monthlySummary.expenseTotal) * 100;
                return item.value &&
                  monthlySummary.expenseTotal &&
                  percentage > PERCENT_VISIBLE
                  ? `${item.id} (${percentage.toFixed(0)}%)`
                  : "";
              },
              valueFormatter: ({ value }: { value: number }) =>
                `${formatMoney(value)} out of ${formatMoney(monthlySummary.expenseTotal)} (${((value / monthlySummary.expenseTotal) * 100).toFixed(0)}%)`,
              highlightScope: { fade: "global", highlight: "item" },
              highlighted: { additionalRadius: 2 },
              cornerRadius: 3,
            },
            {
              innerRadius: middleRadius,
              outerRadius: middleRadius + 20,
              data: subCategoryData,
              arcLabel: (item) => {
                if (!item.id || !item.label) return "";
                if (
                  typeof item.id === "string" &&
                  item.id.includes("Uncategorized")
                )
                  return "";
                if (item.label === "General") return "";
                return String(item.label);
              },
              valueFormatter: ({ value }: { value: number }) =>
                `${formatMoney(value)} out of ${formatMoney(monthlySummary.expenseTotal)} (${((value / monthlySummary.expenseTotal) * 100).toFixed(0)}%)`,
              arcLabelRadius: 160,
              highlightScope: { fade: "global", highlight: "item" },
              highlighted: { additionalRadius: 2 },
              cornerRadius: 3,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontSize: "12px",
            },
          }}
          hideLegend
        />
      </Box>
    </Box>
  );
}
