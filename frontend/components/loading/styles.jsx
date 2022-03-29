import styled, { keyframes } from 'styled-components'

export const loading = keyframes`
  from {
    transform: translateY(6px);
  }
  
  to {
    transform: translateY(-6px);
  }
`

export const Container = styled.div`
  position: absolute;

  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgb(0 0 0 / 23%);

  svg {
    margin-right: 10px;
  }

  div:nth-child(1) {
    animation: ${loading} 0.8s infinite alternate;
    animation-delay: 0.1s;
  }

  div:nth-child(2) {
    animation: ${loading} 0.8s infinite alternate;
    animation-delay: 0.2s;
  }

  div:nth-child(3) {
    animation: ${loading} 0.8s infinite alternate;
    animation-delay: 0.3s;
  }
`
