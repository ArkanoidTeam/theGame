import { FC, Children, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '../Typography'

import {
  StyledContainer,
  StyledWrapper,
  PageContainer,
  MainContent,
} from './styled'

type PageTemplateProps = {
  children: ReactNode
  pageTitle: string
}

const ForumContent: FC<PageTemplateProps> = ({ children, pageTitle }) => {
  return (
    <PageContainer>
      <MainContent>
        <StyledContainer component="main" maxWidth="lg">
          <StyledWrapper>
            <Typography component="h2" variant="h2" context="Arkanoid" />
            <Typography component="h4" variant="h4" context={pageTitle} />
            {Children.toArray(children)}
          </StyledWrapper>
        </StyledContainer>
      </MainContent>
    </PageContainer>
  )
}

export default ForumContent
