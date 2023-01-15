import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
  body{
    scroll-behavior: smooth;
  }
  ::-webkit-scrollbar {
    background-color: initial;
    width: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(${({ theme }) => theme.colors.rgb.cyan}, .2);
    border-radius: 6px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px ${({ theme }) => theme.colors.border};
}
.App{
  background-color: ${({ theme }) => theme.colors.bg.secondary};
  color: ${({ theme }) => theme.colors.heading}
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
    font-weight: 700;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.heading};
  }
  
  a {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.black};
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

  @keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translate3d(-70%, 0, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
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
`;
