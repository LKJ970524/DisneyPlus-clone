import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Nav = () => {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        navigate('/main')
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])



  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value) //! search에 글자를 칠때 글자의 value
    navigate(`/search?q=${e.target.value}`)
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => {

    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <NavWrapper show={show ? "true" : undefined}>
      <Logo>
        <img loading='lazy'
         alt='Disney Plus Logo'
         src='/images/logo.svg'
         onClick={() => (window.location.href = '/')}
        />
      </Logo>

      {pathname === '/' ? (
      <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Search 
            value={searchValue}
            onChange={handleChange}
            className='nav__search'
            type='text'
            placeholder='영화를 검색해주세요.'
          />
        </>
      )}
    </NavWrapper>
  )
}

export default Nav

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`

const Search = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? '#090b13' : 'transparent'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px; //! 글자사이 간격을 조정합니다.(16px)
  z-index: 3;
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }
`