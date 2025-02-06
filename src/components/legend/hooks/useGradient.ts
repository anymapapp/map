import { useCallback } from "react";

export const useGradient = (
  title: string,
  legends: Array<{ label: string; NumericRanges: number[] }>
) => {
  const getLevelLabel = useCallback(
    (value: number) => {
      const level = legends.find(
        (legend) =>
          value >= legend.NumericRanges[0] && value <= legend.NumericRanges[1]
      );
      return level?.label || legends[legends.length - 1].label;
    },
    [legends]
  );

  const getBreakpoints = useCallback(() => {
    // Only show the main transition points (start of each range)
    // and the final maximum value
    const mainPoints = legends.map((legend) => legend.NumericRanges[0]);
    const maxValue = legends[legends.length - 1].NumericRanges[1];

    // Add the max value if it's significantly different from the last start point
    const lastStartPoint = mainPoints[mainPoints.length - 1];
    if (maxValue / lastStartPoint >= 1.5) {
      mainPoints.push(maxValue);
    }

    return mainPoints;
  }, [legends]);

  return { getLevelLabel, getBreakpoints };
};
