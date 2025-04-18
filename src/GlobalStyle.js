import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=VT323&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: #000;
    color: white;
    font-family: 'Poppins', sans-serif; /* Default font */
  }

  h1, h2, h3 {
    font-family: 'Exo 2', sans-serif;
  }

  p {
    font-family: 'Josefin Sans', sans-serif;
  }

  .monospace {
    font-family: 'VT323', monospace;
  }
`;

export default GlobalStyle;
