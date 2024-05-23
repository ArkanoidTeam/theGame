import './Header.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../../utils/constants/navigation'

const Header: React.FC = () => {
  const pages = Object.entries(Page)
  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__nav-list">
          {pages.map(([path, name]) => {
            return (
              <li className="header__nav-item">
                <Link className="header__nav-link" to={name}>
                  {path.toLowerCase()}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Header
