import styled from 'styled-components'

export const Container = styled.div`
  height: 32px;
  display: flex;
  align-items: center;

  padding: 0px 20px;

  cursor: default;

  text-decoration-line: none;

  position: relative;

  :hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #ffffff;
  }

  img {
    width: 20px;
    height: 20px;

    border-radius: 4.62857px;
  }

  .trash-wrapper {
    display: flex;

    align-items: center;
    justify-content: center;

    position: absolute;
    right: 2px;

    width: 28px;
    height: 28px;

    cursor: pointer;

    :hover {
      border-radius: 100%;

      background: rgba(230, 20, 20, 0.1);
    }
  }

  .edit-wrapper {
    display: flex;

    align-items: center;
    justify-content: center;

    position: absolute;
    right: 25px;

    width: 28px;
    height: 28px;

    cursor: pointer;

    :hover {
      border-radius: 100%;

      background: rgba(0, 19, 186, 0.1);
    }
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;

    color: #393939;

    margin-left: 10px;

    text-overflow: ellipsis;

    overflow: hidden;
    white-space: nowrap;
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
