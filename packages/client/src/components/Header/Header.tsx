import React from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../../utils/constants/navigation'
import { Button, ButtonGroup, styled } from '@mui/material'

const StyledHeader = styled('header')(() => ({
  width: '100%'
}));

const StyledNav = styled('nav')(() => ({
  width: '100%'
}));

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none'
}));

const Header: React.FC = () => {
  const pages = Object.entries(Page)
  return (
    <StyledHeader>
      <StyledNav>
        <ButtonGroup variant='text'>
          {pages.map(([path, name]) => {
            return (
              <Button>
                <StyledLink to={name}>
                  {path.toLowerCase()}
                </StyledLink>
              </Button>
            )
          })}
        </ButtonGroup>
      </StyledNav>
    </StyledHeader>
  )
}

export default Header
