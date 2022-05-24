import styled from 'styled-components'

export const ContainerLogin = styled.div`
  background: #ffffff;

  height: 550px;
  width: 335px;

  padding: 10px;

  .google-login-wrapper {
    display: flex;
    align-items: center;

    width: 100%;
    justify-content: center;

    > div {
      width: 100%;
    }
  }

  .title {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    color: #1c1c1c;
  }

  .description {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    color: #575757;

    width: 262px;
  }

  .buttonContainer {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 38px;
    left: 0;
  }

  > div {
    margin-top: 20px;
  }
`

export const Container = styled.div`
  background: #ffffff;

  height: 550px;
  width: 335px;

  .tooltip {
    position: relative;
    display: inline-block;

    margin-bottom: -20px;
  }

  .tooltip .tooltiptext {
    right: 105%;
    top: -64px;

    display: none;
    width: 120px;
    background: #ffffff;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.4);
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;

    color: #393939;

    text-align: center;

    border-radius: 10px 10px 0px 10px;

    padding: 10px;

    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    display: flex;
  }

  .buttons-wrapper {
    display: flex;

    justify-content: end;

    margin-top: 5px;
  }

  .padding-wrapper {
    padding: 0px 20px;
  }

  .forms-wrapper {
    padding: 0px 20px;
  }

  .tags-wrapper {
    display: flex;

    column-gap: 3px;
    overflow-x: scroll;
  }

  .tags-wrapper::-webkit-scrollbar {
    width: 0px;
  }

  .buttons-wrapper-add-link {
    display: flex;

    position: absolute;

    bottom: 20px;
    right: 22px;
  }
`

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;

  padding-right: 20px;
  padding-left: 20px;

  justify-content: center;
  align-items: center;

  position: relative;

  .back {
    position: absolute;
    left: 10px;
    top: 14px;

    cursor: pointer;
  }

  > p {
    text-align: center;

    cursor: pointer;

    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 26px;

    text-align: center;

    color: #393939;

    flex: 1;
  }
`
