import styled, { css, keyframes } from 'styled-components'

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `}

  left: 20px;
  top: 20px;

  background: #374bff;
  border-radius: 10px;

  cursor: pointer;

  :hover {
    background: #0013ba;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.2s ease;

  ${(props) =>
    !props.showBackground &&
    css`
      background: transparent;

      :hover {
        background: transparent;
      }

      > p {
        color: #374bff;

        :hover {
          color: #0013ba;
        }
      }
    `}

  ${(props) =>
    props.isLoading &&
    css`
      > svg {
        animation: ${rotate} 0.5s linear infinite;
      }

      cursor: not-allowed;

      background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #ffffff;

      :hover {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #ffffff;
      }
    `}
`

export const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;

  text-align: center;

  color: #ffffff;
`
