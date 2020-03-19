const trigger = [
	["hi", "hey", "hello", "good morning", "good afternoon"],
	["how are you", "how is life", "how are things"],
	["what are you doing", "what is going on"],
	["how old are you"],
	["who are you", "are you human", "are you bot", "are you human or bot"],
	["who created you", "who made you"],
	["your name please", "your name", "may i know your name", "what is your name", "what call yourself"],
	["i love you"],
	["happy", "good", "fun", "wonderful", "fantastic", "cool"],
	["bad", "bored", "tired"],
	["help me", "tell me story", "tell me joke"],
	["ah", "yes", "ok", "okay", "nice"],
	["thanks", "thank you"],
	["bye", "good bye", "goodbye", "see you later"],
	["what should i eat today"],
	["bro"],
	["what", "why", "how", "where", "when"]
];

const reply = [
	["Hello!", "Hi!", "Hey!", "Hi there!"],
	["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
	["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
	["I am infinite"],
	["I am just a bot", "I am a bot. What are you?"],
	["The one true God, JavaScript"],
	["I am nameless", "I don't have a name"],
	["I love you too", "Me too"],
	["Have you ever felt bad?", "Glad to hear it"],
	["Why?", "Why? You shouldn't!", "Try watching TV"],
	["What about?", "Once upon a time..."],
	["Tell me a story", "Tell me a joke", "Tell me about yourself"],
	["You're welcome"],
	["Bye", "Goodbye", "See you later"],
	["Sushi", "Pizza"],
	["Bro!"],
	["Yes?"]
];

const alternative = ["Same", "Go on...", "Bro...", "Try again", "I'm listening..."];
const banana = ["Haha...banana", "I like bananas too"];

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#input").addEventListener("keypress", function (e) {
		const key = e.which || e.keyCode;
		//Enter button
		if (key === 13) {
			let input = document.getElementById("input").value;
			document.getElementById("user").innerHTML = input;
			output(input);
		}
	});
}
)

function output(input) {
	// create local variable. can't do inside 'if' statement i guess?
	let product;

	//lowercase input and remove all chars except word characters, space, and digits
	let text = (input.toLowerCase()).replace(/[^\w\s\d]/gi, "");

	// 'tell me a story' -> 'tell me story'
	// 'i feel happy' -> 'happy'
	text = text.replace(/ a /g, " ").replace(/i feel /g, "").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, "");

	//compare function, then search keyword, then random alternative
	if (compare(trigger, reply, text)) {
		product = compare(trigger, reply, text);
	}
	else if (text.match(/banana/gi)) {
		product = banana[Math.floor(Math.random() * banana.length)];
	}
	else {
		product = alternative[Math.floor(Math.random() * alternative.length)];
	}

	//update DOM
	addChat(product, input);
}

function compare(triggerArray, replyArray, string) {
	let item;
	for (let x = 0; x < triggerArray.length; x++) {
		for (let y = 0; y < replyArray.length; y++) {
			if (triggerArray[x][y] == string) {
				items = replyArray[x];
				item = items[Math.floor(Math.random() * items.length)];
			}
		}
	}
	return item;
}

function addChat(product, input) {
	
	document.getElementById("chatbot").innerHTML = product;
	speak(product);
	document.getElementById("input").value = "";
}

function speak(string) {
	const u = new SpeechSynthesisUtterance();
	allVoices = speechSynthesis.getVoices();
	u.voice = allVoices.filter(voice => voice.name === "Alex")[0];
	u.text = string;
	u.lang = "en-US";
	u.volume = 1; //0-1 interval
	u.rate = 1;
	u.pitch = 1; //0-2 interval
	speechSynthesis.speak(u);
}