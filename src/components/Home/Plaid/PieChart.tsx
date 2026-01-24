import { PieChart } from "@mui/x-charts/PieChart";

export default function TransactionPieChart() {
  return (
    <PieChart
      height={500}
      width={500}
      // colors={[
      //   "#006ee6",
      //   "#0055b3",
      //   "#003d80",
      //   "#00254d",
      //   "#001833",
      //   "#000c19",
      //   "#000",
      // ]}
      // series={[
      //   {
      //     startAngle: -90,
      //     endAngle: 90,
      //     data: transactionsByCategory ?? [],
      //   },
      // ]}
      slotProps={{
        legend: {
          // https://mui.com/x/react-charts/legend/
          direction: "horizontal",
          position: { vertical: "top", horizontal: "center" },
        },
      }}
    />
  );
}
