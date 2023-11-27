const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateTravelRecommendations(countryName) {
//   const prompt = `give me travel recommendations for ${countryName} in 4/5 small paragraphs separated with <br/><br/>`;
  // const prompt = `Generate brief travel tips for ${countryName}, focusing on unique experiences. Include 3-5 key attractions or activities. For each, provide a title followed by '::' and then a brief description with a practical tip. Ensure each attraction or activity is separated by a double newline.`
  const prompt = `For ${countryName}, provide 2-3 very brief key travel highlights. For each, give a title followed by '::' and then a brief description. Ensure each highlight is separated by a double newline.`;
  const params = {
    model: "gpt-4",
    // model: "gpt-3.5-turbo",
    messages: [{ "role": "user", "content": prompt }]
  };

  const chatCompletion = await openai.chat.completions.create(params);
  return chatCompletion.choices[0].message;
}

module.exports = { generateTravelRecommendations };
