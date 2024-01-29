import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { setUser, removeUser } from '../store/userSlice'

const Nav = () => {
  const [show, setShow] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        if(pathname === '/') {
          navigate('/main')
        }
      } else {
        navigate('/')
      }
    })
  }, [auth, navigate, pathname])

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
      dispatch(setUser({
        id: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      }))
    })
    .catch(error => {
      alert(error.message)
    })
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser)
      navigate(`/`)
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <NavWrapper show={show ? "true" : undefined}>
      <Logo>
        <img loading='lazy'
         alt='Disney Plus Logo'
         src='/images/logo.svg'
         onClick={() => (window.location.href = '/main')}
        />
      </Logo>

      {pathname === '/' ? 
      (<Login onClick={handleAuth}>Login</Login>) : 
      <>
        <Search 
          value={searchValue}
          onChange={handleChange}
          className='nav__search'
          type='text'
          placeholder='영화를 검색해주세요.'
        />

        <SignOut>
          <UserImg src={user.photoURL} alt={user.displayName} />
          <DropDown>
            <span onClick={handleLogOut}>Sign Out</span>
          </DropDown>
        </SignOut>
      </>
    }
    </NavWrapper>
  )
}

export default Nav

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;

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