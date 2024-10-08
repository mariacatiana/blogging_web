"use client";

import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Roboto', sans-serif; /* Define Roboto como a fonte padrão */
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <html lang="en">
        <head>
          {/* Adicione o link para a fonte Roboto no head */}
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body>
          {children}
        </body>
      </html>
    </>
  );
}


