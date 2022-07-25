import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Card } from "../components/Card";
import { Filter } from "../components/Filter";
import { useFilterData } from "../hooks/useFilterData";
import { api } from "../services/api";
import { RootState } from "../store";
import { ActionsProducts } from "../store/modules/Products";
import { ProductsContainer, Container } from "../styles/pages/home";
import { base64 } from "../utils/base64";

type Product = {
  id: string;
  name: string;
  color: string;
  category: string;
};

type Props = {
  initialProducts: Product[];
};

const Home: NextPage<Props> = () => {
  const { filterData } = useFilterData();

  const router = useRouter();
  const { filters } = router.query;

  const dispatch = useDispatch();

  const { products, currentFilters } = useSelector(
    (state: RootState) => state.ProductsReducer
  );

  useEffect(() => {
    api
      .get("product")
      .then((response) =>
        dispatch(ActionsProducts.setProducts(response.data.products))
      );
  }, []);

  useEffect(() => {
    if (!currentFilters.length && filters) {
      const decodedFilters = base64("decode", filters);

      dispatch(ActionsProducts.setCurrentFilters(decodedFilters));
    }
  }, [filters]);

  useEffect(() => {
    const query = currentFilters
      ?.map((item) => `${item.type}=${item.value.replaceAll(" ", "%20")}`)
      .join("&");

    api
      .get("product" + "?" + query)
      .then((response) =>
        dispatch(ActionsProducts.setProducts(response.data.products))
      );
  }, [currentFilters]);

  return (
    <Container>
      <Filter filterData={filterData} />
      <ProductsContainer>
        {products?.map((item: Product) => {
          return (
            <Card
              title={item.name}
              color={item.color}
              category={item.category}
              key={item.id}
            />
          );
        })}
      </ProductsContainer>
    </Container>
  );
};

export default Home;
