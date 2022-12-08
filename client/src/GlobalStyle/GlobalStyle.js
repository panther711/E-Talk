import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  ::-webkit-scrollbar {
    background-color: initial;
    width: 6px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.3);
    border-radius: 6px;
}
::-webkit-scrollbar-track {
    background-color: #fff;
    background-color: var(--white);
    box-shadow: none;
}
  
  button,
  input,
  label,
  select,
  textarea {
    font-size: 100%;
    margin: 0;
    padding: 0;
  }

  
  .input {
    -webkit-appearance: none;
    appearance: none;
    border-color: rgba(209, 213, 219, 1);
    border-radius: 0.375rem;
    border-width: 1px;
    padding: 0.5rem 0.75rem;
    width: 100%;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }
  
  a {
    font-size: 0.8rem;
  }
  
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  
  p,span {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 2.5rem;
  }
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
  }
  
  h3 {
    font-size: 2rem;
    font-weight: 500;
    line-height: 2rem;
  }
  h4{
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2rem;
  }
  
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .btn-light {
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.btnlight};
    border-color: ${({ theme }) => theme.colors.btnlight};
  }
  
  
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    html {
      font-size: 70%;
    }
  
    .grid {
      gap: 3.2rem;
    }
  
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }
  }
`