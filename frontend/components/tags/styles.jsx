import styled from 'styled-components'

export const Container = styled.div`
  height: 21px;

  padding: 0 8px;

  background: #374bff;
  border-radius: 10px;

  display: flex;
  align-items: center;

  :hover {
    background: #0013ba;
  }

  > svg {
    margin-left: 5px;

    cursor: pointer;
  }
`

export const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;

  margin-left: 10px;

  color: #ffffff;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
`
