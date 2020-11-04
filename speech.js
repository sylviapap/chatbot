// Text to Speech

const synth = window.speechSynthesis;

const textToSpeech = (string) => {
  let voice = new SpeechSynthesisUtterance(string);
  voice.text = string;
  voice.lang = "en-US";
  voice.volume = 1; //0-1 interval
  voice.rate = 1;
  voice.pitch = 1; //0-2 interval
  synth.speak(voice);
}