import styled from 'styled-components'

import { AppLogo } from '../../../config/icons'
import { useQuiz } from '../../../context/QuizContext'
import {
  CenterCardContainer,
  HighlightedText,
  LogoContainer,
  PageCenter,
} from '../../../styles/Global'

import Button from '../../atoms/Button'
import { device } from '../../../styles/BreakPoints'
import InputField from '../../atoms/InputField'
import { useState } from 'react'
import { getAuth } from 'firebase/auth'

const AppTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
`

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  text-align: center;
  display: flex;
  @media ${device.md} {
    flex-direction: column;
  }
`
const DetailTextBox = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Seperator = styled.hr`
  @media ${device.md} {
    width: 80%;
  }
`

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`
const DetailBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const CenterAlign = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  @media ${device.md} {
    margin-bottom: 50px;
  }
`

export const StyledCheckBox = styled.input`
  accent-color: ${({ theme }) => theme.colors.themeColor};
  margin: 0px 10px;
`

const LeftAlign = styled.div`
  text-align: left;
`


const QuizDetailsScreen = () => {
  const [createRoomData, setCreateRoomData] = useState({ title: '', QFromGPT: false })
  const [joinRoomData, setJoinRoomData] = useState('')
  const auth = getAuth()
  const user = auth.currentUser

  const { createRoom, joinRoom } = useQuiz()

  const changeCreateData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    switch (name) {
      case 'roomTitle':
        setCreateRoomData({ ...createRoomData, title: value })
        break
      case 'needGPT':
        setCreateRoomData({ ...createRoomData, QFromGPT: event.target.checked })
        break
    }
  }

  const changeJoinData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoinRoomData(event.target.value)
  }

  const creatingRoom = () => {
    const roomNumber = Math.floor(1000 + Math.random() * 9000)
    const room = `${createRoomData.title
      .replace(' ', '')
      .toLowerCase()
      .slice(0, 4)}-${roomNumber}`
    const { QFromGPT, title } = createRoomData
    createRoom(room, QFromGPT, title)
  }

  const joinigRoom = () => {
    joinRoom(joinRoomData)
  }

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer style={{ marginTop: '-2rem' }}>
          <AppLogo />
        </LogoContainer>
        <AppTitle>QUIZ HUB</AppTitle>
        <DetailTextContainer>
          <DetailTextBox>
            <DetailText>
              <HighlightedText>Create</HighlightedText> Room
            </DetailText>
            <DetailBox>
              <label htmlFor="roomTitle" style={{ width: '120px' }}>
                Room Title:
              </label>
              <InputField
                type={'text'}
                placeholder="Enter Title For Room."
                id="roomTitle"
                onChange={changeCreateData}
              />
            </DetailBox>
            <DetailBox>
              <StyledCheckBox
                type="checkbox"
                name="needGPT"
                id="needGPT"
                onChange={changeCreateData}
              />
              <label htmlFor="needGPT">Need Q's from ChatGPT</label>
            </DetailBox>
            <CenterAlign>
              <Button text="Create the Room" iconPosition="left" onClick={creatingRoom} />
            </CenterAlign>
          </DetailTextBox>
          <Seperator />
          <DetailTextBox>
            <DetailText>
              <HighlightedText>Join</HighlightedText> Room
            </DetailText>
            <DetailBox>
              <LeftAlign>
                <label htmlFor="joinCode" style={{ width: '120px' }}>
                  Join Code:
                </label>
              </LeftAlign>
              <InputField
                type={'text'}
                placeholder="Enter Code to Join."
                id="joinCode"
                onChange={changeJoinData}
              />
            </DetailBox>
            <CenterAlign>
              <Button text="Join the Room" iconPosition="left" onClick={joinigRoom} />
            </CenterAlign>
          </DetailTextBox>
        </DetailTextContainer>
      </CenterCardContainer>
    </PageCenter>
  )
}

export default QuizDetailsScreen