import OpenAI from 'openai';
import chatGPTApiOptions from './chatGPTApiOptions';

const fetchChatGPT = async (inputArray: any[]) => {
    // const resp = await fetch('/.netlify/functions/chatGPT', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ inputArray })
    // });
    // const data = await resp.json();
    // return data;
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPEN_AI,

        dangerouslyAllowBrowser: true
    });
    const messages = inputArray.map((p) => ({
        role: 'user',
        content: p
    }));

    return openai.chat.completions
        .create({
            messages: [...messages],
            ...chatGPTApiOptions

            // presence_penalty: 0
        })

};
export default fetchChatGPT;