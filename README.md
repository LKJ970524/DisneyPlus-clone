#### 다시한번 기초부터 시작해보는 프로젝트(.with 패스트캠퍼스)

# Disney_plus 클론 코딩

- 본 프로젝트는 저의 실력향상 및 기초부터 천천히 다시 배워보고자 시작하는 개인 프로젝트입니다.
- (주의) 패스트캠퍼스 개인 강의를 통해 클론코딩을 할 예정이니 하나씩 천천히 배우고 올릴 예정이니 많이 늦을수 도있습니다. 퐈이팅!!
- 개인 프로젝트이기 때문에 commit message와 pr, branch의 규칙을 따로 정하지 않았습니다. 참고 부탁드리겠습니다.
- themovieDB를 사용하여 영화의 정보가 한정적이고 full 영상을 재생할 수 없어서 iframe 기능을 사용하여 영상을 불러왔습니다.

## 1일차

- 기본 환경 설정 및 axios 설치

  1. `create-react-app`으로 기본 세팅을 완료하였습니다.
  2. `npm i axios --save`으로 axios를 설치하였습니다.

  - Axios: Axios는 브라우저, node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리입니다.
    쉽게 말하자면 프론트엔드랑 백엔드의 통신을 쉽게하기 위해 Ajax와 더불어 사용합니다.

  3. Axios 인스턴스화를 하는 이유는?

  - 중복된 부분을 계속 입력하지 않아도 되기 때문입니다.

  4. 전체 구조를 setting 하였습니다.
  5. `npm i styled-components --save` css 사용을 위해 styled-components를 설치하였습니다.

  - styled component는 CSS-in-JS라고 하는 Javascript 파일 안에서 CSS를 처리 할 수 있게 해주는 대표적인 라이브러리입니다.

  6. 상단 nav작업을 시작하였고 이미지와 스크롤을 일정부분 내리면 색상이 변경하는 이벤트를 추가하였습니다.

  ```jsx
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  ```

  </br>
  </br>

  ## 2일차

  - Banner 완성

    1. themovieDB에서 데이터를 가져와 axios를 활용하여 영화의 정보 불러오기

    ```jsx
    const fetchData = async () => {
      // 현재 제공되는 영화 정보를 가져오기(여러가지 영화)
      const request = await axios.get(requests.fetchNowPlaying);
      // 여러 영화중 영화 하나의 ID를 가져오기
      const movieId =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ].id;
      const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
        params: {
          append_to_response: "videos",
        },
      });
      setMovie(movieDetail);
    };
    ```

    2. 영화의 상세정보가 100글자를 넘어가면 ...이 표시되도록 기능을 추가하였습니다

    ```jsx
    // 설명글이 100자 이상이라면 글자를 자른 후 ...을 붙인다.
    const truncate = (str, n) => {
      return str?.length > n ? str.substring(0, n) + "..." : str;
    };
    ```

    ```jsx
    <p className="bannerDescription">{truncate(movie?.overview, 100)}</p>
    ```

    3. 영상정보가 있는 영화는 iframe기능을 사용하여 예고편식의 영상을 확인할수 있게 만들었습니다.

    ```jsx
    if (isClicked) {
      return (
        <>
          <Container>
            <HomeContainer>
              <Iframe
                src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
              ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                width="640"
                height="360"
                frameborder="0"
                allow="autoplay; fullscreen"
              ></Iframe>
            </HomeContainer>
          </Container>
          <button onClick={() => setIsClicked(false)}>나가기</button>
        </>
      );
    } else {
      ("기존 배너");
    }
    ```

<br/>
<br/>

## 3일차

- Row 컴포넌트 완성

  1. api폴더에 만들어놓은 request.js를 활용하여 카테고리별로 나타나게끔 만들었습니다

  ```jsx
  <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
  <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
  <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies} />
  <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies} />
  ```

  2. arrow 버튼을 클릭시 slide 기능이 되도록 구현하였습니다.

  ```jsx
  <span
    className="arrow"
    onClick={() => {
      document.getElementById(id).scrollLeft += window.innerWidth - 80;
    }}
  >
    {">"}
  </span>
  ```

  - category 컴포넌트 완성
    1. 제공받은 동영상과 사진으로 카테고리를 만들었습니다.
    2. 카테고리를 hover시 브랜드별로 영상이 재생되게끔 만들었습니다.

<br/>
<br/>

## 4일차
- React Router Dom
  - React Router Dom을 사용하면 웹 앱에서 동적 라우팅을 구현할수 있다. 라우팅이 실행 중인 앱 외부의 구성에서 처리되는 기존 라우팅 아키텍처와 달리 React Router Dom은 앱 및 플랫폼의 요구 사항에 따라 컴포넌트 기반 라우팅을 용이하게 한다.
  - 설치 방법 : `npm i react-router-dom --save`

- Single Page Application(SPA)
  - 리액트는 SPA이기 때문에 하나의 index.html 템플릿 파일을 가지고 있습니다. 하나의 템플릿에 js를 이용해서 다른 컴포넌트를 이 index.html 템플릿에 넣으므로 페이지를 변경해주게 된다. 이때 이 React Router Dom 라이브러리가 새 컴포넌트로 라우팅 및 탐색을 하고 렌더링 하는데 도움을 주게 된다.

- Modal 컴포넌트 완성 
  1. props를 활용하여 영화에 대한 상세페이지를 modal창으로 나타나게 만들었습니다.
    - 모달창을 제외한 어느곳을 눌러도 모달창이 닫히게 설정하였습니다.
  ```jsx
  const MovieModal = ({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen
  }) => {}
  ```
  2. React Router Dom을 사용하여 라우팅을 위한 파일을 변경하였습니다
  <img src="https://github.com/LKJ970524/DisneyPlus-clone/assets/115642699/559b2e22-2528-48af-acd2-c60248c2cd40" width=170 />

<br />
<br />

## 5일차
- URLSearchParams
  - `URLSearchParams`인터페이스는 URL의 쿼리 문자열을 대상으로 작업할 수 있는 유틸리티 메서드를 정의한다.
- Debounce
  - `Debounce function`은 사용자가 미리 결정된 시간 동안 타이핑을 멈출 때까지 keyup이벤트의 처리를 지연시킵니다.

- searchPage 
  1. URLSearchParams를 활용하여 검색페이지 데이터를 불러오는데 성공하였습니다.
  <img src='https://github.com/LKJ970524/DisneyPlus-clone/assets/115642699/e33d3a9d-bef9-4b47-8348-02a745292bba' width=600 />

  2. 검색결과에 맞게 영화가 표시되도록 css를 적용 시켰고 결과가 없을시 결과가 없다는 내용이 나타나게 적용시켰습니다.
  <img src='https://github.com/LKJ970524/DisneyPlus-clone/assets/115642699/79736dcb-0d89-4f3d-a3d6-cad436cd86d8' width=450 />
  <img src='https://github.com/LKJ970524/DisneyPlus-clone/assets/115642699/f4f0fc49-a8a9-4021-bad8-c898ecf8e334' width=450 />

  3. useDebounce hook을 만들어서 search페이지에 적용시켰습니다
  ```js
  import { useState, useEffect } from 'react'

  export const useDebounce = (value, delay) => {
    const [debounceValue, setDebouncedValue] = useState(value)

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay);
      return () => {
        clearTimeout(handler)
      }
    }, [value, delay])

    return debounceValue
  }
  ```
  
<br />
<br />

## 6일차
- useParams
  - `useParams`는 URL에 포함되어있는 Key, Value 형식의 객체를 반환해주는 역할을 한다. Route 부분에서 Key를 지정해주고, 해당하는 Key에 적합한 Value를 넣어 URL을 변경시키면, useParams를 통해 Key, Value 객체를 반환받아 확인할 수 있다.

- DetailPage
  1. useParams를 사용해 이미지를 불러왔고 상세페이지에 나타나도록 했습니다 (이미지만 불러오고 다른작업은 추후 천천히 완성할 예정입니다.)

- Modal창 외부 클릭시 닫기 기능
  1. custom Hooks를 만들어 기능을 완성하였습니다.
  ```js
  export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if(!ref.current || ref.current.contains(event.target)) {
          return
        }
        handler()
      }
      document.addEventListener("mousedown", listener)
      document.addEventListener("touchstart", listener)
      return () => {
        document.removeEventListener("mousedown", listener)
        document.removeEventListener("touchstart", listener)
      }
    }, [ref, handler])
  }
  ```
- swiper 모듈을 이용한 터치 슬라이드 구현
  - 설치 방법 : `npm i swiper`
