import { twc } from 'react-twc';
import 'react-tooltip/dist/react-tooltip.css'

import './App.css'
import Header from './components/Header'
import Calculator from './pages/Calculator';

const App = () => {
  return (
    <Container>
      <Header />

      <main>
        <Calculator />
      </main>

      <ImageReference>
        ©️ Photo by{' '}
        <Link href="https://unsplash.com/@beckerworks?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          David Becker
        </Link>
        {' '}on{' '}
        <Link href="https://unsplash.com/photos/clear-glass-light-bulb-turned-on-in-tilt-shift-lens-55Sp4WZmJbQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Unsplash
        </Link>
      </ImageReference>

      <AccentBorder />
    </Container>
  )
};

export default App;

const Container = twc.div`
  flex
  flex-col
  h-dvh

  place-content-start
  mt-5

  lg:px-56
  lg:mt-0
  lg:place-content-center
`;

const ImageReference = twc.span`
  bottom-8
  py-8

  text-xs
  text-gray-200
`;

const Link = twc.a`
  text-blue-100
`;

const AccentBorder = twc.div`
  fixed
  w-2
  h-screen
  right-0
  top-0

  bg-green-700

  lg:w-5
`;
