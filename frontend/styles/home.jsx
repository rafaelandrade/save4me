import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff;

  height: 550px;
  width: 335px;
`

export const FlexWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;

  padding-right: 20px;
  padding-left: 20px;

  > p {
    text-align: center;

    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 26px;

    flex: 1;
  }

  img {
    height: 50px;
    width: 50px;

    align-self: center;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #5a76bb;
    border-radius: 50%;
  }
`
