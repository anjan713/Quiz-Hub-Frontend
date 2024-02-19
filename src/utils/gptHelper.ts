// 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
// 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
// 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
// const apiKey = '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'
export const getQuestionsFromGPT = async (prompt: string) => {
  console.log('In GPTHelper')
  const apiKey = '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'
  const apiURL = 'https://api.openai.com/v1/chat/completions'
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    if (response.ok) {
      return response.json()
    } else {
      alert('Failed to communicate with the ChatGPT API.')
    }
  } catch (error){
    console.log(error)
  }
}

// const gptQuestions = (data) => {
//   const prompt =
//     `give me 10 questions in JSON format, JSON object should contain  {question: string
//           choices: string[],
//           isMulti: boolean, // isMulti is a boolean, if true user can choose multiple option, else only one option
//           correctAnswers: string[],
//           score: number,
//           code?: string,
//           image?: string,
//           user: 'chatGPT',
//          }. The topic is the ` + data.title
//   getQuestionsFromGPT(prompt).then((result) => {
//     console.log(result.choices[0].message.content)
//     const gptQuestions = JSON.parse(result.choices[0].message.content)
//     rooms[data.room] = { ...rooms[data.room], questions: gptQuestions }
//     socket.broadcast.to(data.room).emit('gpt_questions', gptQuestions)
//     callback(gptQuestions)
//   })
// }
