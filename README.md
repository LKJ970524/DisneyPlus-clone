#### 다시한번 기초부터 시작해보는 프로젝트(.with 패스트캠퍼스)

# Disney_plus 클론 코딩 
- 본 프로젝트는 저의 실력향상 및 기초부터 천천히 다시 배워보고자 시작하는 개인 프로젝트입니다.
- (주의) 패스트캠퍼스 개인 강의를 통해 클론코딩을 할 예정이니 하나씩 천천히 배우고 올릴 예정이니 많이 늦을수 도있습니다. 퐈이팅!!
- 개인 프로젝트이기 때문에 commit message와 pr, branch의 규칙을 따로 정하지 않았습니다. 참고 부탁드리겠습니다.




## 1일차
- 기본 환경 설정 및 axios 설치
  1) ```create-react-app```으로 기본 세팅을 완료하였습니다.
  2) ```npm i axios --save```으로 axios를 설치하였습니다.
  - Axios: Axios는 브라우저, node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리입니다.
  쉽게 말하자면 프론트엔드랑 백엔드의 통신을 쉽게하기 위해 Ajax와 더불어 사용합니다.
  3) Axios 인스턴스화를 하는 이유는?
  - 중복된 부분을 계속 입력하지 않아도 되기 때문입니다.
  4) 전체 구조를 setting 하였습니다.
  5) ```npm i styled-components --save``` css 사용을 위해 styled-components를 설치하였습니다.
  - styled component는 CSS-in-JS라고 하는 Javascript 파일 안에서 CSS를 처리 할 수 있게 해주는 대표적인 라이브러리입니다.
  6) 상단 nav작업을 시작하였고 이미지와 스크롤을 일정부분 내리면 색상이 변경하는 이벤트를 추가하였습니다.
  ```jsx  
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
    return () => {
      window.removeEventListener('scroll', () => {})
    }
  }, [])
  ```