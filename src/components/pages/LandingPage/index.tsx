import styled from 'styled-components'

import { AppLogo } from '../../../config/icons'
import { useQuiz } from '../../../context/QuizContext'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../../styles/Global'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Google } from '../../../config/icons'

export const Heading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`

const DetailText = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
`

const StyledHr = styled.hr`
  width: 85%;
  margin: 23px 0px;
`

const BorderImage = styled.img`
  border: 2px solid ${({ theme }) => theme.colors.primaryText};
  border-radius: 8px;
  cursor: pointer;
`

const QuizTopicsScreen: React.FC = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [authing, setAuthing] = useState(false)
  const { setUserName } = useQuiz()

  const signWithGoogle = async () => {
    setAuthing(true)
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user.uid)
        setUserName(
          response.user.displayName ||
            `RandomUser@${Math.floor(1000 + Math.random() * 9000)}`
        )
        window.location.href = '/create-join'
        navigate('/create-join')
      })
      .catch((error) => {
        console.log(error)
        setAuthing(false)
      })
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <Heading>
          WELCOME TO <HighlightedText> QUIZ HUB</HighlightedText>
        </Heading>
        <DetailText>Login to the QuizHub.</DetailText>
        <StyledHr />
        <BorderImage src={Google} onClick={signWithGoogle} />
      </CenterCardContainer>
    </PageCenter>
  )
}

export default QuizTopicsScreen
