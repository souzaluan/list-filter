import { createServer, Factory, Model } from "miragejs";
import faker from "faker";

type Product = {
  name: string;
  color: string;
  category: string;
};

type FilterType = "category" | "color";
type FilterParams = {
  [key in FilterType]: string[];
};

export const makeServer = () => {
  const server = createServer({
    models: {
      product: Model.extend<Partial<Product>>({}),
    },

    factories: {
      product: Factory.extend({
        name() {
          return faker.vehicle.model();
        },
        color() {
          return faker.vehicle.color();
        },
        category() {
          return faker.vehicle.type();
        },
      }),
    },

    seeds(server) {
      server.createList("product", 20);
    },

    routes() {
      this.namespace = "api";

      this.get("/product", (schema, req) => {
        const [, params] = req.url.split("?");

        if (!params) return schema.all("product");

        const filterParams: FilterParams = {} as FilterParams;
        params.split("&").map((parameter) => {
          const [key, value] = parameter.split("=");

          if (!!key) {
            return (filterParams[key as FilterType] = [
              ...(filterParams[key as FilterType] || ""),
              value.replaceAll("%20", " "),
            ]);
          }
        });

        return schema.where("product", (product) => {
          if (filterParams.category && filterParams.color) {
            return (
              filterParams.category?.includes(product.category) &&
              filterParams.color?.includes(product.color)
            );
          } else {
            return (
              filterParams.category?.includes(product.category) ||
              filterParams.color?.includes(product.color)
            );
          }
        });
      });

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
};
