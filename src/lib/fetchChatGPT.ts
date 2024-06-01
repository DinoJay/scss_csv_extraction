
const fetchChatGPT = async (inputArray: any[]) => {
    const resp = await fetch('/.netlify/functions/chatGPT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputArray })
    });
    console.log('resp', resp);
    const data = await resp.json();
    console.log('data', data);
    return data;
};
export default fetchChatGPT;