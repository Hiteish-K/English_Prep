import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateExercise(type: string, difficulty: string, nativeLanguage: string) {
  const prompt = `Generate an English ${type} exercise for a ${nativeLanguage} speaker at ${difficulty} level. 
  Include the exercise content, correct answer, and explanation.`
  
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4-turbo-preview",
  })
  
  return completion.choices[0].message.content
}

export async function evaluateAnswer(type: string, question: string, answer: string, nativeLanguage: string) {
  const prompt = `Evaluate this ${type} answer for a ${nativeLanguage} speaker:
  Question: ${question}
  Answer: ${answer}
  Provide a score (0-100) and detailed feedback.`
  
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4-turbo-preview",
  })
  
  return completion.choices[0].message.content
}

export async function generateDailyChallenge(type: string, userLevel: string, nativeLanguage: string) {
  const prompt = `Generate a daily ${type} challenge for a ${nativeLanguage} speaker at ${userLevel} level.
  Make it engaging and achievable within 10 minutes.`
  
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4-turbo-preview",
  })
  
  return completion.choices[0].message.content
} 