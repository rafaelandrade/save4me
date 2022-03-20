import styled, { css } from 'styled-components'
import { rotate } from '../button/styles'

export const Container = styled.div`
  width: 262px;
  height: 44px;

  background: #374bff;
  border-radius: 10px;

  padding: 0 10px;

  display: flex;
  align-items: center;

  cursor: pointer;

  transition: 0.2s ease;

  :hover {
    background: #0013ba;
  }

  ${(props) =>
    props.isLoading &&
    css`
      > svg {
        animation: ${rotate} 0.5s linear infinite;
      }

      cursor: not-allowed;

      justify-content: center;

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

  margin-left: 15px;

  text-align: center;

  color: #ffffff;
`
