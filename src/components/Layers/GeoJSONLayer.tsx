import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import { useTheme } from "@mui/material/styles";
import { GeoJSONLayerProps } from "../../types/layer";

const GeoJSONLayer: React.FC<GeoJSONLayerProps> = ({ data, onCityClick }) => {
  const theme = useTheme();
  const thresholds = [5000, 8000, 10000];

  const getColor = (density: number) => {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (density > thresholds[i]) {
        return i === thresholds.length - 1
          ? theme.palette.primary.dark
          : i === thresholds.length - 2
          ? theme.palette.primary.main
          : theme.palette.primary.light;
      }
    }
    return theme.palette.primary.light;
  };

  const style = (feature: any) => ({
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: theme.palette.primary.contrastText,
    fillOpacity: 1,
  });

  const onEachFeature = (feature: any, layer: L.Layer) => {
    layer.on({
      click: () => {
        if (onCityClick) {
          onCityClick(feature);
        }
      },
    });

    layer.bindTooltip(`<strong>${feature.properties.name}</strong>`, {
      permanent: true,
      direction: "center",
      className: "custom-tooltip",
    });
  };

  return <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />;
};

export default GeoJSONLayer;
