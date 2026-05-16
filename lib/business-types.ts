export const businessTypes = [
  "Oficina mecânica",
  "Lava-jato",
  "Estética automotiva",
  "Autopeças",
  "Centro automotivo",
] as const;

export type BusinessType = (typeof businessTypes)[number];
