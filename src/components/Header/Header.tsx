import styled from 'styled-components';
import { twc } from 'react-twc';

const Header = () => {
  return (
    <StyledHeader
      className="flex rounded h-24 py-3 mb-8 items-center justify-center"
    >
      <Text>Koraidon Calculator</Text>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: relative;

  &::before {
    content: "";
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('src/assets/lightbulb-bg.jpg');
    background-position: center;
    background-size: cover;
    filter: brightness(50%);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
`;

const Text = twc.span`
  text-white
  uppercase
  text-2xl
  font-bold
  brightness-100
`;
