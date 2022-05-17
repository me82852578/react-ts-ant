import { GroupedDataSource } from "./types";

const groupByMultiAndSum = (
  dataSource: Record<string | number, any>[],
  groups: string[] = ["state", "city", "type"]
): Record<string | number, string | number>[] | GroupedDataSource => {
  const grouped = dataSource.reduce<any>((acc, curr) => {
    let groupedResult: string[] = [];
    groups.forEach((g) => {
      groupedResult.push(curr[g]);
    });
    const groupedKey = groupedResult.join();

    if (!acc[groupedKey]) {
      return {
        ...acc,
        [groupedKey]: { ...curr, avgPrice: curr.price, houses: 1 },
      };
    } else {
      return {
        ...acc,
        [groupedKey]: {
          ...acc[groupedKey],
          price: acc[groupedKey].price + curr.price,
          avgPrice: (
            (acc[groupedKey].price + curr.price) /
            (acc[groupedKey].houses + 1)
          ).toFixed(2),
          houses: acc[groupedKey].houses + 1,
        },
      };
    }
  }, {});

  return grouped;
};

export default groupByMultiAndSum;
