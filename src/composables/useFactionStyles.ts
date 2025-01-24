export const useFactionStyles = () => {
  const factionColors = {
    Light: "#FFFF00",
    Stability: "#808080",
    Growth: "#00FF00",
    Shadow: "#800080",
  } as const;

  const factionShapes = {
    Light: "circle",
    Stability: "square",
    Growth: "triangle",
    Shadow: "diamond",
  } as const;

  const factionOrder = ["Light", "Stability", "Growth", "Shadow"];

  const factionLabels = {
    Light: "Light",
    Stability: "Stability",
    Growth: "Growth",
    Shadow: "Shadow",
  } as const;

  return {
    factionColors,
    factionShapes,
    factionOrder,
    factionLabels,
  };
};
