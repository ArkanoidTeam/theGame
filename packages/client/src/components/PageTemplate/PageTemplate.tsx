import { FC, Children, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography } from '../../components/Typography'

import {
  Header,
  BackButton,
  StyledArrowBackIcon,
  StyledContainer,
  StyledWrapper,
  PageContainer,
  MainContent,
} from './styled'

type PageTemplateProps = {
  children: ReactNode
  pageTitle: string
}

const PageTemplate: FC<PageTemplateProps> = ({ children, pageTitle }) => {
  const navigate = useNavigate()
  return (
    <PageContainer>
      <Header>
        <BackButton
          variant="text"
          startIcon={<StyledArrowBackIcon />}
          onClick={() => navigate('/')}>
          Вернуться на главную
        </BackButton>
      </Header>
      <MainContent>
        <StyledContainer component="main" maxWidth="md">
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

export default PageTemplate
