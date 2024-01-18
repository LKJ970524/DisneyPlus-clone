import styled from 'styled-components';
import Banner from '../../components/Banner';
import Nav from '../../components/Nav';
import Category from '../../components/Category'
import Row from '../../components/Row'
import requests from '../../api/request';


function MainPage() {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies} />
    </Container>
  );
}

export default MainPage;


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