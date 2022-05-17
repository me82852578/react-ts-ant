import { createServer } from "miragejs";
import { genUsaProperty } from "./utils";

export default function fakeServer() {
  createServer({
    routes() {
      const staticData = [
        {
          id: "static01",
          state: "Georgia",
          city: "Atlanta",
          type: "Apartment",
          price: 585,
        },
        {
          id: "static02",
          state: "Georgia",
          city: "Atlanta",
          type: "Single-family",
          price: 666,
        },
        {
          id: "static03",
          state: "Georgia",
          city: "Columbus",
          type: "Apartment",
          price: 168,
        },
        {
          id: "static04",
          state: "Georgia",
          city: "Columbus",
          type: "Single-family",
          price: 209,
        },
        {
          id: "static05",
          state: "Georgia",
          city: "Atlanta",
          type: "Apartment",
          price: 705,
        },
        {
          id: "static06",
          state: "Georgia",
          city: "Columbus",
          type: "Single-family",
          price: 346,
        },
      ];
      this.get("/api/properties", () => genUsaProperty(1001, staticData));
    },
  });
}
