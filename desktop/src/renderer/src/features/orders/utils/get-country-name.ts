import { getName, overwrite } from "country-list";

export const getCountryName = (code: string) => {
  overwrite([
    {
      code: "GB",
      name: "United Kingdom",
    },
    { code: "US", name: "United States" },
    { code: "VN", name: "Vietnam" },
  ]);

  return getName(code);
};
