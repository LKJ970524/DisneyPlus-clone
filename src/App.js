import styled from 'styled-components';
import './App.css';
import Nav from './components/Nav';
import Banner from './components/Banner';
import Category from './components/Category';

function App() {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
    </Container>
  );
}

export default App;


const Container = styled.main`
  position: relative; //! 요소를 자기 자신의 기준으로 배치합니다. (원래 있던 위치를 기준으로 좌표를 지정)
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: "";
    position: absolute; //! 요소를 부모 요소의 기준으로 배치한다.
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;