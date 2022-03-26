import styled from 'styled-components'

export const Container = styled.div`
  display: flex;

  align-items: center;

  cursor: pointer;
`

export const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #374bff;

  ${(props) =>
    props.hover &&
    `    
    color: #0013ba;
  `}
`
