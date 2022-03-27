import styled from 'styled-components'

export const Container = styled.div`
  height: 32px;
  display: flex;
  align-items: center;

  cursor: default;

  text-decoration-line: none;

  img {
    width: 20px;
    height: 20px;

    border-radius: 4.62857px;
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;

    color: #393939;

    margin-left: 10px;
  }
`

export const NotFoundContainer = styled.div`
  p {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    color: #575757;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 50vh;
`
