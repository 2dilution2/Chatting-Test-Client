import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

:root {
  --color-blue-0: #eff6ff;
  --color-blue-50: #dbeafe;
  --color-blue-100: #bfdbfe;
  --color-blue-200: #e5e7eb;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;
  --color-blue-800: #1e40af;
  --color-blue-900: #1e3a8a;
  --color-blue-950: #172554;

  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-green-50: #f0fdf4;
  --color-green-100: #dcfce7;
  --color-green-400: #4ade80;
  --color-green-500: #22c55e;
  --color-green-600: #16a34a;
  --color-green-700: #15803d;

  --color-red-100: #fee2e2;
  --color-red-300: #fca5a5;
  --color-red-500: #ef4444;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

}

*,
*::before,
*::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html {
    font-size: 70%;
}


body {
    font-family: 'Noto Sans KR', sans-serif;
    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    font-size: 1.6rem;
    color: var(--color-grey-800);
}

input,
button,
textarea,
select {
    font: inherit;
    color: inherit;
}

input:focus,
textarea:focus,
select:focus {
    outline: 2px solid var(--color-grey-600);
    outline-offset: -1px;
}

button {
    cursor: pointer;
}

*:disabled {
    cursor: not-allowed;
}

a {
    color: inherit;
    text-decoration: none;
}

ul {
    list-style: none;
}


`;

export default GlobalStyles;
