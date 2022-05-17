interface Grouped {
  [key: string | number]: Grouped | Record<string | number, any>[];
}

const groupByMulti = (
  dataSource: Record<string | number, any>[],
  groups: string[] = ["state", "city", "type"],
  index: number = 0
): Grouped => {
  const grouped = dataSource.reduce<Grouped>((acc, curr) => {
    if (index + 1 === groups.length) {
      if (!acc[curr[groups[index]]]) {
        return { ...acc, [curr[groups[index]]]: [curr] };
      } else {
        return {
          ...acc,
          [curr[groups[index]]]: [
            ...(acc[curr[groups[index]]] as Record<string | number, any>[]),
            curr,
          ],
        };
      }
    } else {
      return {
        ...acc,
        [curr[groups[index]]]: groupByMulti(
          dataSource.filter((d) => d[groups[index]] === curr[groups[index]]),
          groups,
          index + 1
        ),
      };
    }
  }, {});

  return grouped;
};

export default groupByMulti;
