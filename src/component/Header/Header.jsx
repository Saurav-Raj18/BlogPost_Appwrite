import React from 'react'
import { LogoutBtn, Logo, Container } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'//is used to check whether user is login or logout from store.
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const authStatus = useSelector((state) => state.name.status
  )
  const navigate = useNavigate();
  //jab navigate banaya jata hai tab genrally array liya jata hai forcefully navigate krne ke liye just like react router dom (LINK)
  
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
  ]
  return (
    <header className='py-3 shadow bg-gray-500 selection:'>
      <Container>

        <nav className='flex'>

          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => {
                    navigate(item.slug)
                  }}>
                    {item.name}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  </button>
                </li>
              ) : null
            )}
        
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}

          </ul>

        

        </nav>
      </Container>
    </header>
  )
}

export default Header