import styled, { css } from 'styled-components'

const textStyle = css`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
`

const focusedStyle = css`
  left: ${(props) => `${props.left}px`};
  top: 5px;

  font-size: 8px;
  color: #374bff;
`

export const Container = styled.div`
  width: 95%;
  height: 49px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid #575757;

  position: relative;

  ${(props) =>
    props.focused &&
    css`
      border-bottom: 2px solid #374bff;
    `}

  > svg {
    margin-bottom: -17px;
  }

  > input {
    border: none;
    width: 100%;
    height: 100%;
    outline: none;

    margin-bottom: -18px;
    background: transparent;

    ${(props) => css`
      padding: 0px ${props.left / 2}px;
    `}

    ::placeholder {
      color: ${(props) => props.placeholderColor};
    }

    ${textStyle}
  }

  > p {
    position: absolute;
    left: ${(props) => `${props.left}px`};
    top: 26px;

    margin: 0;

    ${textStyle}

    ${(props) => props.focused && `${focusedStyle}`}

    transition: 0.2s ease;
  }
`

export const SubText = styled.p`
  ${textStyle}
  font-size: 10px;

  color: #393939;
`
