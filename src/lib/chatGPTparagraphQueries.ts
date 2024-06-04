export const paragraphQuery = (variable: string | string[] | undefined, paragraphText, category = undefined) => {

	// console.log("paragraphText", paragraphText);
	// return `
	// 		Create a csv table with following column headers: "${cols}". The information to fill in the csv has to be extracted from the text given before ("${paragraphText.slice(0, 100).replace(/(\r\n|\n|\r)/gm, "")}..."). 
	// 		Make sure that each answer you provide for a cell adheres to the semantics of the coressponding the column name.
	// 		Use "," as delimiter. If the answer is not present in the text, respond with an "-". Respond with one csv row only. Don't include any commentary text or command strings such as "\`\`\`csv"! Your response must be a text string in valid csv format including the column header row correctly formatted.
	// 	`.trim();
	return `
	Find the value for the following variable "${variable}" ${category ? `based on the category "${category}"` : ''} in the following text namely "${paragraphText}". If you can't find the answer in the text, respond with "-". Don't include any commentary text or command strings such as "\`\`\`"! 
	`.trim();
}

//todo add 67

//todo 195 check rdt studies number