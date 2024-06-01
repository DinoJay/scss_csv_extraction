
// netlify/functions/src/chatgpt.mts
import OpenAI from 'openai';

import type { Context } from "@netlify/functions"



// export const handler = async (event: any, context: any) => {
//     try {
//         const { input } = JSON.parse(event.body);
//         const completion = await openai.createChatCompletion({
//             model: "gpt-4",
//             messages: [{ role: "user", content: input }],
//         });

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ response: completion.data.choices[0].message.content })
//         };
//     } catch (error: any) {
//         return {
//             statusCode: error.response ? error.response.status : 500,
//             body: JSON.stringify({ error: error.message })
//         };
//     }
// };


// export default async (request, context) => {

//     const openai = new OpenAI({
//         apiKey: process.env.VITE_OPEN_AI,

//     });

//     const chatGPTApiOptions = {

//         model: 'gpt-4o',
//         // temperature: 0.01,
//         // response_format: { "type": "json_object" },
//         presence_penalty: -2,
//         // max_tokens: 256,
//         // top_p: 1,
//         // frequency_penalty: -0.3,
//         temperature: 0.2
//         // max_tokens: 256,
//         // top_p: 1,
//         // frequency_penalty: -0.5
//         // presence_penalty: 0
//     }


//     // let body
//     // try {
//     //     body = await request.json()
//     // }
//     // catch (e) {
//     //     return new Response(`[ERROR] Invalid JSON - ${e.message}`, { status: 400 })
//     // }
//     // const messages = body.inputArray.map((p) => ({
//     //     role: 'user',
//     //     content: p
//     // }));
//     // loadingResponse = true;
//     try {
//         // const resp = await openai.chat.completions
//         //     .create({
//         //         messages: [...messages],
//         //         ...chatGPTApiOptions

//         //         // presence_penalty: 0
//         //     })
//         // return Response.json({ test: 'test' });
//     } catch (error) {
//         console.log(error);
//         // return Response.json({ error }, { status: 500 });
//     }
// };

export default async (request: Request, context: Context) => {

    const openai = new OpenAI({
        apiKey: process.env.VITE_OPEN_AI,

    });

    let body
    try {
        body = await request.json()
    }
    catch (e) {
        return new Response(`[ERROR] Invalid JSON - ${e.message}`, { status: 400 })
    }
    const messages = body.inputArray.map((p) => ({
        role: 'user',
        content: p
    }));

    const chatGPTApiOptions = {

        model: 'gpt-4o',
        // temperature: 0.01,
        // response_format: { "type": "json_object" },
        presence_penalty: -2,
        // max_tokens: 256,
        // top_p: 1,
        // frequency_penalty: -0.3,
        temperature: 0.2
        // max_tokens: 256,
        // top_p: 1,
        // frequency_penalty: -0.5
        // presence_penalty: 0
    }

    let res
    try {
        res = await openai.chat.completions
            .create({
                messages: [...messages],
                ...chatGPTApiOptions

                // presence_penalty: 0
            })
    }
    catch (e) {
        return new Response(`[ERROR] OPENAI - ${e}`, { status: 400 })
    }

    return new Response(JSON.stringify(res))
}