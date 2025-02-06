import { Legend } from "../legend";
// import sortingMethods from "../../dataMocks/sortingMethods.json";
// import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FilterControls } from "../Filters";
import { LegendData, LegendType } from "../legend/types/legendTypes";

interface LegendWithFiltersProps {
  onSortingByChange: (value: string) => void;
  sortingByMethod: LegendData;
  legendType: LegendType;
  sortingByMethods: Array<{
    field: string;
    Legends: Array<{
      label: string;
      color: string;
      NumericRanges: number[];
    }>;
  }>;
}

const LegendContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const LegendWithFilters = ({
  onSortingByChange,
  sortingByMethod,
  // setLegendType,
  legendType,
  sortingByMethods,
}: LegendWithFiltersProps) => {
  console.log(sortingByMethod);

  return (
    <LegendContainer>
      <FilterControls
        onSortingChange={onSortingByChange}
        sortingMethods={sortingByMethods}
      />
      <Legend sortingData={sortingByMethod} legendType={legendType} />
    </LegendContainer>
  );
};

export default LegendWithFilters;
