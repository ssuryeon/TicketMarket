import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root { height: 100%; }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.font.sans};
    background: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.ink};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button { font-family: inherit; cursor: pointer; }
  a { color: inherit; text-decoration: none; }

  input, select { font-family: inherit; }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; }
  }
`;
