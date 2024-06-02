import { FC } from 'react'
import { Typography } from '../../../../components/Typography'
import { Link, Avatar } from '@mui/material'

import {
  ThemeText,
  StyledThemeCard,
  ThemeMetaWrapper,
  ThemeMeta,
  ThemeMetaUser,
  StyledChatBubbleOutlinedIcon,
} from './styled'

const ThemeCard: FC = () => {
  return (
    <StyledThemeCard>
      <Typography
        component="h6"
        variant="h6"
        context={
          <Link href="#" underline="none">
            Как настроить игру чтобы играть с максимальным комфортом?
          </Link>
        }
      />
      <ThemeText>
        Пытался смотреть настройки, но постоянно натыкаюсь на какие-то трудности
        Пытался смотреть настройки, но постоянно натыкаюсь на какие-то трудности
      </ThemeText>
      <ThemeMetaWrapper>
        <ThemeMeta>
          <StyledChatBubbleOutlinedIcon /> 3
        </ThemeMeta>
        <ThemeMeta>
          <ThemeMetaUser>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 16, height: 16, fontSize: '0.7rem' }}
            />
            <span>Remy Sharp</span>
          </ThemeMetaUser>
          <span>18.05.24 18:05</span>
        </ThemeMeta>
      </ThemeMetaWrapper>
    </StyledThemeCard>
  )
}
export default ThemeCard
