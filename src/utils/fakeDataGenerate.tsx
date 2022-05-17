import usaStatesAndCities from "./usaStatesAndCities";

interface Data {
  id: string;
  state: string;
  city: string;
  type: string;
  price: number;
}

const genRandomIndex = (len: number): number => {
  return Math.floor(Math.random() * len);
};

export const genUsaProperty = (len: number, staticData: Data[] = []) => {
  const types = ["Apartment", "Single-family", "Townhomes", "Condo"];
  let dataSource = [];

  for (let i = staticData.length; i < len - 1; i++) {
    // gen random state
    const states = Object.keys(usaStatesAndCities);
    const randomState = states[genRandomIndex(states.length)];

    // gen random city by random state
    const citiesOfRandomState = usaStatesAndCities[randomState];

    const randomCity =
      citiesOfRandomState[genRandomIndex(citiesOfRandomState.length)];

    // gen random type
    const randomType = types[genRandomIndex(types.length)];

    dataSource.push({
      id: (i + 1).toString(),
      state: randomState,
      city: randomCity,
      type: randomType,
      price: 270 + genRandomIndex(2001),
    });
  }

  const addStaticData = dataSource.concat(staticData);

  return addStaticData;
};
