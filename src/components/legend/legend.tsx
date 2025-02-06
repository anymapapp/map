import { CategoryLegend } from "./components/CategoryLegend";
import { GradientLegend } from "./components/GradientLegend";
import { LegendData, LegendType } from "./types/legendTypes";
import { useTheme } from "@mui/material/styles";
import {
  generateCategoryColors,
  getThemeColorRanges,
} from "../../utils/colorGenerator";

interface LegendProps {
  sortingData: LegendData;
  legendType: LegendType;
}

const Legend = ({ sortingData, legendType }: LegendProps) => {
  const theme = useTheme();
  const colorRanges = getThemeColorRanges(theme);

  const renderLegend = () => {
    switch (legendType) {
      case "category": {
        const colors = generateCategoryColors(
          sortingData.Legends.length,
          colorRanges.orange
        );
        const categories = sortingData.Legends.map((legend, index) => ({
          label:
            legend.label ||
            `${legend.NumericRanges[0]} - ${legend.NumericRanges[1]}`,
          color: colors[index],
        }));
        return (
          <CategoryLegend title={sortingData.field} categories={categories} />
        );
      }

      case "gradient":
      default: {
        const legendsWithLabels = sortingData.Legends.map((legend) => ({
          label:
            legend.label ||
            `${legend.NumericRanges[0]} - ${legend.NumericRanges[1]}`,
          NumericRanges: legend.NumericRanges,
        }));
        return (
          <GradientLegend
            title={sortingData.field}
            colorRange={colorRanges.blue}
            minValue={sortingData.Legends[0].NumericRanges[0]}
            maxValue={
              sortingData.Legends[sortingData.Legends.length - 1]
                .NumericRanges[1]
            }
            legends={legendsWithLabels}
          />
        );
      }
    }
  };

  return <div className="legend-container">{renderLegend()}</div>;
};

export default Legend;
