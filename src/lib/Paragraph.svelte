<script lang="ts">
	import OpenAI from 'openai';

	export let selected;
	export let onClick;
	export let title;
	export let text;

	let loadingResponse = false;

	let question = '';
	let response = null;

	const openai = new OpenAI({
		apiKey: import.meta.env.VITE_OPEN_AI,
		dangerouslyAllowBrowser: true
	});

	$: setChatGPTContext = (p) => {
		loadingResponse = true;
		openai.chat.completions
			.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'user',
						content: `set the following text as context ${p}`
					},
					{
						role: 'user',
						content:
							'dossier,guideline,type of study,pdf link,"Endpoints: Observations: Clinical observation: changes in skin, fur, eyes, mucous membranes",Endpoints: Observations: Clinical observation: secretions and excretions,"Endpoints: Observations: Clinical observation: autonomic activity ( lacrimination, piloerection, pupil size, unusual respiratory pattern)","Endpoints: Observations: Functional observation: changes in gait, posture and response to handling",Endpoints: Observations: Functional observation: clonic or tonic movement,Endpoints: Observations: Functional observation: stereotypies ,Endpoints: Observations: Functional observation: bizzare behaviours,"Endpoints: Observations: Functional observation: sensor activity, grip strength; assessment of motor activity",Endpoints: Haematology: body weight and food/water consumption,Endpoints: Haematology: satellite (recovery) group ,Endpoints: Haematology: haematocrit,Endpoints: Haematology: haemaglobin concentration,Endpoints: Haematology: erythrocyte count ,Endpoints: Haematology: total and differential leucocyte ,Endpoints: Haematology: platelet count ,Endpoints: Haematology: measure of blood clotting time/potential,Endpoints: Haematology: blood samples origin ,Endpoints: Clinical biochemistry: Plasma markers: sodium ,Endpoints: Clinical biochemistry: Plasma markers: potassium ,Endpoints: Clinical biochemistry: Plasma markers: glucose ,Endpoints: Clinical biochemistry: Plasma markers: total cholesterol ,Endpoints: Clinical biochemistry: Plasma markers: urea,Endpoints: Clinical biochemistry: Plasma markers: creatinine ,Endpoints: Clinical biochemistry: Plasma markers: total protein ,Endpoints: Clinical biochemistry: Plasma markers: albumin ,Endpoints: Clinical biochemistry: Hepatocellular effect: alanine aminotransferase,Endpoints: Clinical biochemistry: Hepatocellular effect: aspartate aminotransferase,Endpoints: Clinical biochemistry: Hepatocellular effect: alkaline phosphatase ,Endpoints: Clinical biochemistry: Hepatocellular effect: gamma glutamyl transpeptidase ,Endpoints: Clinical biochemistry: Hepatocellular effect: sorbitol dehydrogenase,Endpoints: Clinical biochemistry: other enzymes and bile acids ,Endpoints: Clinical biochemistry: Urinalysis: appearance,Endpoints: Clinical biochemistry: Urinalysis: volume,Endpoints: Clinical biochemistry: Urinalysis: osmolarity or specific gravity,Endpoints: Clinical biochemistry: Urinalysis: pH,Endpoints: Clinical biochemistry: Urinalysis: protein ,Endpoints: Clinical biochemistry: Urinalysis: glucose ,Endpoints: Clinical biochemistry: Urinalysis: blood/blood cells ,Endpoints: Clinical biochemistry: Serum markers: calcium ,Endpoints: Clinical biochemistry: Serum markers: phosphate ,Endpoints: Clinical biochemistry: Serum markers: fasting triglycerides,Endpoints: Clinical biochemistry: Serum markers: hormones,Endpoints: Clinical biochemistry: Serum markers: methaemoglobin,Endpoints: Clinical biochemistry: Serum markers: cholinesterase ,Endpoints: Clinical biochemistry: Serum markers: other,Endpoints: Pathology: Gross necropsy: all gross lesions,Endpoints: Pathology: Gross necropsy: brain ,Endpoints: Pathology: Gross necropsy: spinal cord ,Endpoints: Pathology: Gross necropsy: stomach ,Endpoints: Pathology: Gross necropsy: small and large intestines ,Endpoints: Pathology: Gross necropsy: liver ,Endpoints: Pathology: Gross necropsy: kidneys,Endpoints: Pathology: Gross necropsy: adrenals ,Endpoints: Pathology: Gross necropsy: spleen ,Endpoints: Pathology: Gross necropsy: heart ,Endpoints: Pathology: Gross necropsy: thymus ,Endpoints: Pathology: Gross necropsy: thyroid ,Endpoints: Pathology: Gross necropsy: trachea ,Endpoints: Pathology: Gross necropsy: lungs ,Endpoints: Pathology: Gross necropsy: gonads ,Endpoints: Pathology: Gross necropsy: accessory sex organs ,Endpoints: Pathology: Gross necropsy: urinary bladder,Endpoints: Pathology: Gross necropsy: lymph nodes ,Endpoints: Pathology: Gross necropsy: peripheral nerve ,Endpoints: Pathology: Gross necropsy: bone marrow ,Endpoints: Pathology: Gross necropsy: other organs ,Endpoints: Pathology: histopathology,Endpoints: critical effect,Endpoints: point of departure (pod),Endpoints: description of pod ,Endpoints: target organ,Endpoints: moribund or dead animals prior to study termination,Endpoints: mortality rate,Endpoints: discussion and results,Endpoints: conclusion,Test method: Test condition: Test substance: homogeneity and stability ,Test method: Test condition: Test substance: treatment prior to application,Test method: Test condition: Test substance: pH,"Test method: Test condition: Test substance: physical form (solid, liquid)",Test method: Test condition: Test substance: achieved concentration (%),Test method: Test condition: Test substance: composition,Test method: Test condition: Test substance: purity (%),Test method: Test condition: Test substance: Vehicle: name,Test method: Test condition: Test substance: Vehicle: concentration (%),Test method: Test condition: Test substance: chemical batch nr,Test method: Test condition: Test substance: additional info,Test method: Test condition: Test animal: rodent species/strain,Test method: Test condition: Test animal: source,"Test method: Test condition: Test animal: age at start of experiment (days, weeks, months, years)","Test method: Test condition: Test animal: age unit (day, week, month, year)","Test method: Test condition: Test animal: sex (female, male)",Test method: Test condition: Test animal: housing and feeding,Test method: Test condition: Test animal: weight,"Test method: Test condition: Test animal: weight unit (gram, kilogram)",Test method: Test condition: Test animal: n animals / group,Test method: Test condition: Test animal: number of satellite group,Test method: Test condition: nominal dose levels,Test method: Test condition: actual dose levels,Test method: Test condition: dose level unit,Test method: Test condition: dose volume ml/kg bw,"Test method: Test condition: repeated administration scheme (5days/week, 7days/week)",Test method: Test condition: Oral administration: gavage ,Test method: Test condition: Oral administration: diet ,Test method: Test condition: Oral administration: drinking water ,"Test method: Test condition: duration of exposure (14 days, 28 days)",Test method: Test condition: recovery period (day),Reliability: year,Reliability: GLP,Reliability: SCCS comment to test,Reliability: Ref. in dossier,Reliability: limit test ,Reliability: control group ,Reliability: klimisch score,study period,additional information,own comments'
					},
					{
						role: 'user',
						content: question
					}
				],
				temperature: 1,
				max_tokens: 256,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0
			})
			.then((d) => {
				loadingResponse = false;
				console.log('d', d);
				response = d;
			});
	};
</script>

<div
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			onClick();
		}
	}}
	on:click={() => {
		onClick();
		response = null;
	}}
	tabindex="0"
	role="button"
	class=" mb-3"
>
	<div>
		<h2 class="text-lg mb-2">{title}</h2>

		<p
			class="p-2 whitespace-pre-wrap border-2"
			class:border-fuchsia-300={selected}
			class:border-fuchsia-200={!selected}
		>
			{text}
		</p>
	</div>
	{#if selected}
		<div class="mt-3">
			<div class=" flex">
				<input
					on:change={(e) => {
						question = e.target.value;
					}}
					placeholder="ChatGPT question"
					type="text"
					class="border-2 border-gray p-1 flex-grow"
				/>
				<button class="ml-1 p-1 border" on:click={() => setChatGPTContext(text)} type="button">
					Submit
				</button>
			</div>
			{#if loadingResponse}
				<div class="w-full flex min-h-44">
					<div class="m-auto">Loading...</div>
				</div>
			{:else if response}
				<div class="w-full flex min-h-44 overflow-auto">
					<p class="bg mt-2 p-1" style:background="#cae6ea">
						{response.choices[0].message.content}
					</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
