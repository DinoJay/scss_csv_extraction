export const paragraphQuery = (cols: string | string[] | undefined, paragraphText) => {

	// console.log("paragraphText", paragraphText);
	// return `
	// 		Create a csv table with following column headers: "${cols}". The information to fill in the csv has to be extracted from the text given before ("${paragraphText.slice(0, 100).replace(/(\r\n|\n|\r)/gm, "")}..."). 
	// 		Make sure that each answer you provide for a cell adheres to the semantics of the coressponding the column name.
	// 		Use "," as delimiter. If the answer is not present in the text, respond with an "-". Respond with one csv row only. Don't include any commentary text or command strings such as "\`\`\`csv"! Your response must be a text string in valid csv format including the column header row correctly formatted.
	// 	`.trim();
	return `
	Find the values for "${cols}" in the text given before ("${paragraphText.slice(0, 20)}"). Respond with a JSON array. Use underscore to separate words of the json variable names. Don't include any commentary text or command strings such as "\`\`\`"!  
	`;
}

//todo add 67

//todo 195 check rdt studies number