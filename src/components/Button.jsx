import styled, { css } from 'styled-components';

const colors = {
  primary: css`
    color: var(--color-blue-50);
    background-color: var(--color-blue-600);

    &:hover {
      background-color: var(--color-blue-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-300);

    &:hover {
      background-color: var(--color-grey-100);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-500);

    &:hover {
      background-color: var(--color-red-700);
    }
  `,
  info: css`
    color: var(--color-green-50);
    background: var(--color-green-600);

    &:hover {
      background-color: var(--color-green-700);
    }
  `,
};

const Button = styled.button`
  border: none;
  font-size: 1.4rem;
  font-weight: 600;
  padding: 1.2rem 1.6rem;
  border: 1px solid var(--color-sky-600);
  border-radius: 5px;
  ${(props) => colors[props.color]}
`;

Button.defaultProps = {
  color: 'primary',
};

export default Button;
