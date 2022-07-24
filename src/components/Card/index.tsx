import { Container } from "./style";

type Props = {
  title: string;
  color: string;
  category: string;
};

export const Card = ({ title, color, category }: Props) => {
  return (
    <Container>
      <p>
        <strong>{title}</strong> - {color} <br /> <i>{category}</i>
      </p>
    </Container>
  );
};
