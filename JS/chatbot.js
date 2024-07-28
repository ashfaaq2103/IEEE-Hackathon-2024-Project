// Function to speak out loud
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

let recognition;

// Function to start speech recognition
function startRecognition() {
    const userInput = document.getElementById('input');

    // Check if speech recognition is supported by the browser
    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech recognition is not supported by this browser.");
        return;
    }

    // If recognition is not running, create a new instance
    if (!recognition || !recognition.running) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        // Set language for speech recognition
        recognition.lang = 'en-US'; // Change this to your desired language

        // Start speech recognition
        recognition.start();
        let interimTranscript = '';
        recognition.onresult = function(event) {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    userInput.placeholder = event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            // Update placeholder with interim transcript
            userInput.value = interimTranscript;
        }

        // Set flag to indicate recognition is running
        recognition.running = true;
    }
}

// Function to stop speech recognition
function stopRecognition() {
    if (recognition && recognition.running) {
        recognition.stop();
        recognition.running = false;
    }
}

// Function to send message
function sendMessage() {
    const userInput = document.getElementById('input');
    const messageSection = document.getElementById('message-section');
    const texts = document.getElementById('message-section'); // Assuming responses are appended to message-section

    if (userInput.value.trim() !== "") {
        const userMessage = document.createElement('div');
        userMessage.classList.add('message');
        userMessage.setAttribute('id', 'user');
        userMessage.innerHTML = `<span id="user-response">${userInput.value}</span>`;
        messageSection.appendChild(userMessage);

        const text = userInput.value.trim().toLowerCase(); // Convert to lower case for case-insensitive comparison

        // Check for specific keywords and respond
        if (text.includes('hello')) {
            const responseText = 'Hello I am here to help you out on learning on SDGs in Mauritius';
            const p = document.createElement('div');
            p.classList.add('message');
            p.setAttribute('id', 'bot');
            p.innerHTML = `<span id="bot-response">${responseText}</span>`;
            texts.appendChild(p);
            speak(responseText);
        } 
        else if (text.includes('tell me about sdgs in mauritius')) {
            const responseText = 'In Mauritius, the government has committed to achieving the United Nations Sustainable Development Goals (SDGs) by 2030. The country has made significant progress towards achieving some of the SDGs, such as reducing poverty, improving access to education and healthcare, and promoting gender equality.However, there are still challenges to be addressed in areas such as climate change, sustainable consumption and production, and biodiversity conservation. The government has implemented various policies and initiatives to address these challenges, such as the National Biodiversity Strategy and Action Plan, the National Energy Policy, and the National Waste Management Strategy.In addition, there are many non-governmental organizations and businesses in Mauritius that are working towards achieving the SDGs. For example, there are organizations that promote sustainable tourism, eco-friendly agriculture, and renewable energy.Overall, while there is still work to be done, Mauritius is making progress towards achieving the SDGs and creating a more sustainable future for its citizens.';
            const p = document.createElement('div');
            p.classList.add('message');
            p.setAttribute('id', 'bot');
            p.innerHTML = `<span id="bot-response">${responseText}</span>`;
            texts.appendChild(p);
            speak(responseText);
        } 
        else if (text.includes('tell what are the companies that provide sustainable products in mauritius')) {
            const responseText = 'There are several companies in Mauritius that provide sustainable products. Here are a few examples: 1.Green Eco Paradise: This company provides a range of eco-friendly products, including reusable bags, bamboo straws, and natural cleaning products. 2.Green Attitude: This company offers a range of sustainable products, including organic food, natural cosmetics, and eco-friendly cleaning products. 3.Eco-World: This company provides a range of eco-friendly products, including solar panels, LED lighting, and energy-efficient appliances. 4.Green Energy Ltd: This company specializes in renewable energy solutions, including solar panels, wind turbines, and energy storage systems. 5.Green Island: This company offers a range of sustainable products, including organic food, natural cosmetics, and eco-friendly cleaning products.';
            const p = document.createElement('div');
            p.classList.add('message');
            p.setAttribute('id', 'bot');
            p.innerHTML = `<span id="bot-response">${responseText}</span>`;
            texts.appendChild(p);
            speak(responseText);
        } 
        else if (text.includes('website can help me')) {
            const responseText = 'This website was developed to raise awarness on SDGs in mauritius, with a mini game to help you learn recycling in an interactive way. There is an events page that will help you know when and where events are taking place all around the island. Moreover we have a Go Green page that is a market place that redirects you to amazon. ';
            const p = document.createElement('div');
            p.classList.add('message');
            p.setAttribute('id', 'bot');
            p.innerHTML = `<span id="bot-response">${responseText}</span>`;
            texts.appendChild(p);
            speak(responseText);
        } 
   
        else if (text.includes('events page')) {
            const responseText = 'On this page find past events and futur event around the island with a map with the pin location on it to help you navigate to those events';
            const p = document.createElement('div');
            p.classList.add('message');
            p.setAttribute('id', 'bot');
            p.innerHTML = `<span id="bot-response">${responseText}</span>`;
            texts.appendChild(p);
            speak(responseText);
        } 
        else if (text.includes('what are the goals of sdgs')) {
            const responseText = 'The Sustainable Development Goals (SDGs) are a set of 17 goals adopted by the United Nations in 2015 as part of the 2030 Agenda for Sustainable Development. The goals are designed to address the most pressing economic, social, and environmental challenges facing the world today. Here are the 17 SDGs: 1.No Poverty 2.Zero Hunger 3.Good Health and Well-being 4.Quality Education 5.Gender Equality 6.Clean Water and Sanitation 7.Affordable and Clean Energy 8.Decent Work and Economic Growth 9.Industry, Innovation and Infrastructure 10.Reduced Inequalities 11.Sustainable Cities and Communities 12.Responsible Consumption and Production 13.Climate Action 14.Life Below Water 15.Life On Land 16.Peace, Justice and Strong Institutions 17.Partnerships for the Goals';
            const p = document.createElement('div');
            p.classList.add('message');
            p.setAttribute('id', 'bot');
            p.innerHTML = `<span id="bot-response">${responseText}</span>`;
            texts.appendChild(p);
            speak(responseText);
        }
        else if (text.includes('rank of mauritius')) {
            const responseText = 'Mauritius ranking in terms of the Sustainable Development Goals (SDGs). According to the SDG Index and Dashboards Report 2021, Mauritius ranks 67th out of 193 countries in terms of overall SDG performance. Mauritius performs particularly well in SDG 1 (No Poverty), SDG 3 (Good Health and Well-being), and SDG 4 (Quality Education), but faces challenges in SDG 12 (Responsible Consumption and Production) and SDG 13 (Climate Action).';
            const p = document.createElement('div');
            p.classList.add('message');
            p.setAttribute('id', 'bot');
            p.innerHTML = `<span id="bot-response">${responseText}</span>`;
            texts.appendChild(p);
            speak(responseText);
        }  
        else {
            // Query Azure OpenAI API with user input
            // queryAzureOpenAI(userInput.value);
            const responseText = ' Unfortunately I do not have the answer to this question,I will grow my knowledge during development of my phase 2  ';
            const p = document.createElement('div');
            p.classList.add('message');
            p.setAttribute('id', 'bot');
            p.innerHTML = `<span id="bot-response">${responseText}</span>`;
            texts.appendChild(p);
            speak(responseText);
        }

        userInput.value = "";
        userInput.placeholder = "Type another message"; // Change the placeholder text
    }
}

// Function to query Azure OpenAI API
// async function queryAzureOpenAI(text) {

//     const requestData = {
//         "prompt": text,
//         "max_tokens": 50, // Adjust as needed
//         "temperature": 0.5 // Adjust as needed
//     };

//     try {
//         const response = await fetch(endpoint, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//             },
//             body: JSON.stringify(requestData)
//         });

//         if (!response.ok) {
//             const errorDetails = await response.json();
//             throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorDetails.error.message}`);
//         }

//         const responseData = await response.json();
//         const reply = responseData.choices[0].text.trim();

//         // Display and speak the Azure OpenAI response
//         const messageSection = document.getElementById('message-section');
//         const openAIResponseP = document.createElement('div');
//         openAIResponseP.classList.add('message');
//         openAIResponseP.setAttribute('id', 'bot');
//         openAIResponseP.innerHTML = `<span id="bot-response">${reply}</span>`;
//         messageSection.appendChild(openAIResponseP);
//         speak(reply);

//     } catch (error) {
//         console.error('Error querying Azure OpenAI:', error.message);
//         // Optionally handle the error case in UI
//         const messageSection = document.getElementById('message-section');
//         const errorP = document.createElement('div');
//         errorP.classList.add('message');
//         errorP.setAttribute('id', 'bot');
//         errorP.innerHTML = `<span id="bot-response">Error occurred while querying Azure OpenAI: ${error.message}</span>`;
//         messageSection.appendChild(errorP);
//     }
// }
