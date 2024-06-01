
const fetchChatGPT = async (inputArray: any[]) => {
    const resp = await fetch('/.netlify/functions/chatGPT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputArray })
    });
    const data = await resp.json();
    return data;
};
export default fetchChatGPT;