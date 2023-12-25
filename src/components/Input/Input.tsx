import { KeyboardEvent, InputHTMLAttributes, useMemo } from 'react';
import { twc } from 'react-twc';

type Props = {
  label?: string;
  number?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

let currentIndex = 0;

const Input = (props: Props) => {
  const { label, number, ...inputProps } = props;

  const id = useMemo(() => {
    currentIndex += 1;

    return currentIndex.toString();
  }, []);

  const numberProps = number && {
    type: 'number',
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (['e', 'E', '+', '-'].includes(e.key)) {
        e.preventDefault();
      }
    },
  };

  return (
    <Container>
      <StyledInput {...inputProps} {...numberProps} id={id} />

      <Label htmlFor={id}>{label}</Label>
    </Container>
  );
};

export default Input;

const Container = twc.div`
  relative
  my-10
`;

const StyledInput = twc.input`
  peer
  w-full
  border-b
  border-gray-300
  py-1
  bg-inherit

  focus:border-b-2
  focus:border-green-700
  focus:outline-none

  transition-colors
`;

const Label = twc.label`
  absolute
  left-0

  cursor-text

  text-xs
  -top-4
  peer-focus:text-green-700

  transition-all
`;
