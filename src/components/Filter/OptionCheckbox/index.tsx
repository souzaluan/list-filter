import { Container } from "./style";

type Props = {
  label: string;
  value: string;
  checked?: boolean;
  onChange?: () => void;
};

export const OptionCheckbox = ({ label, value, checked, onChange }: Props) => {
  return (
    <Container>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={() => onChange && onChange()}
      />
      <span> {label}</span>
    </Container>
  );
};
