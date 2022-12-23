import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --line-color-top-orange: #f48123; /* #EC8A3C */
    --line-color: #d7d9dd;
    --font-color-base: #545860;
    --font-color-title: #24262a;
    --font-color-footer: #babec4;
    --max-width: 1264px; /* 164(left) / 24+730+24(main) / 298(aside) */
    --max-width-main: 1100px;
    --nav-width: 164px;
    --aside-width: 298px;
    --main-outline-margin: 24px;
    --footer-bg-color: #24262a;    
    --font-family-body: Geneva, Verdana, sans-serif, -apple-system;
    --font-family-tag: Haettenschweiler, sans-serif, -apple-system;
    --font-fmaily-nav: BlinkMacSystemFont, sans-serif, -apple-system;
    --font-size-0-8rem: 0.8rem; 
    --font-size-0-9rem: 0.9rem;
    --font-size-1-2rem: 1.2rem;
    --border-input-focus: 1px solid #76B5F2;
    --outline-input-focus: 4px solid #D8E4F1;
    --outline-btn-press: 4px solid #E0EAF6;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;    
  }

  body {
    width: 100%;
    color: var(--font-color-base);  
    font-family: var(--font-family-body);
   }

  .app {
    width: 100%;
    margin-top: 50px;    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
  a:hover {
    color: var(--font-color-title);
  }
  a:visited {
    color: var(--font-color-base);
  }

  button {
    cursor: pointer;
    outline: none;
    border: none;
  }

  aside {
    margin-left: var(--main-outline-margin);    
    @media (max-width: 980px) {
      display: none;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--font-color-title);
  }
`;

export default GlobalStyle;
