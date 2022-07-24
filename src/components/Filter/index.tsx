import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ActionsProducts } from "../../store/modules/Products";
import { base64 } from "../../utils/base64";
import { updateQueryParams } from "../../utils/updateQueryParams";
import { OptionCheckbox } from "./OptionCheckbox";
import { Container, Options, Title } from "./style";

export type Types = "category" | "color";

export type FilterDataOption = {
  value: string;
  label: string;
  type: Types;
};
export type FilterData = {
  title: string;
  options: FilterDataOption[];
};

type Props = {
  filterData?: FilterData[];
};

const mock: FilterData[] = [
  {
    title: "Categoria",
    options: [
      {
        label: "Bermudas",
        value: "bermudas",
        type: "category",
      },
      {
        label: "Camisetas",
        value: "camisetas",
        type: "category",
      },
    ],
  },
  {
    title: "Cor",
    options: [
      {
        label: "Azul",
        value: "azul",
        type: "color",
      },
      {
        label: "Vermelha",
        value: "vermelha",
        type: "color",
      },
      {
        label: "Preto",
        value: "preto",
        type: "color",
      },
    ],
  },
];

export const Filter = ({ filterData = mock }: Props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { currentFilters } = useSelector(
    (state: RootState) => state.ProductsReducer
  );

  useEffect(() => {
    if (currentFilters.length) {
      updateQueryParams("filters", String(base64("encode", currentFilters)));
    } else {
      updateQueryParams("filters");
    }
  }, [currentFilters]);

  const isChecked = (option: FilterDataOption) => {
    if (currentFilters?.length) {
      return currentFilters.some(
        (filter) => filter.type === option.type && filter.value === option.value
      );
    }

    return false;
  };

  const handleChange = (option: FilterDataOption) => {
    if (isChecked(option)) {
      return dispatch(
        ActionsProducts.setCurrentFilters(
          currentFilters.filter(
            (item) => item.type !== option.type || item.value !== option.value
          )
        )
      );
    }

    return dispatch(
      ActionsProducts.setCurrentFilters([...currentFilters, option])
    );
  };

  return (
    <Container>
      {filterData?.map((item) => {
        return (
          <Fragment key={item.title}>
            <Title>{t(item.title)}</Title>
            <Options>
              {item.options.map((option) => {
                return (
                  <OptionCheckbox
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    checked={isChecked(option)}
                    onChange={() => handleChange(option)}
                  />
                );
              })}
            </Options>
          </Fragment>
        );
      })}
    </Container>
  );
};
