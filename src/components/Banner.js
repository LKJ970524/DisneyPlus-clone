import {useEffect, useState} from 'react'
import axios from '../api/axios'
import requests from '../api/request'
import './Banner.css'
import styled from 'styled-components'

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    // 현재 상영중인 영화 정보를 가져오기(여러가지 영화)
    const request = await axios.get(requests.fetchNowPlaying);
    // 여러 영화중 영화 하나의 ID를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;
    const {
      data: movieDetail
    } = await axios.get(`movie/${movieId}`, {
      params: {
        append_to_response: "videos"
      },
    });
    setMovie(movieDetail)
  }
  // 설명글이 100자 이상이라면 글자를 자른 후 ...을 붙인다.
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + '...' : str;
  }

  if(isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
              ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width='640'
              height='360'
              frameborder='0'
              allow='autoplay; fullscreen' 
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setIsClicked(false)}>
          나가기
        </button>
      </>
    )
  } else {
    return ( 
      <header className = 'banner'
      style = {{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover'
        }}
        >
          <div className='bannerContents'>
            <h1 className='bannerTitle'>
              {movie.title || movie.name || movie.original_name}
            </h1>
  
            <div className='bannerButtons'>
              {movie?.videos?.results[0]?.key &&
                <button className='bannerButton play' onClick={() => setIsClicked(true)}>
                  Play
                </button>
              }
            </div>
            <p className='bannerDescription'>
              {truncate(movie?.overview, 100)}
            </p>
          </div>
          <div className='banner--fadeBottom' />
        </header>
    )
  }


}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`

const Iframe = styled.iframe`
width: 100%;
height: 100%;
z-index: -1;
opacity: 0.65;
border: none;

&::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`