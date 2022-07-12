const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

let voices=[];

const getVoices = ()=> {
     voices= synth.getVoices();
     voices.forEach(voice => {
         const option = document.createElement('option');
         option.textContent=voice.name + '(' + voice.lang + ')';
         option.setAttribute('data-lang',voice.lang);
         option.setAttribute('data-lang',voice.name);
         voiceSelect.appendChild(option);
     });
};

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged=getVoices;
}

const speak = () => {

 

    if(synth.speaking){
        console.log("already speaking");
        return;
    }
    if(textInput.value!==""){
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        speakText.onend = e => {
            body.style.background="#141414";
            console.log("done speaking");
            textInput.value='';
        }

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    voices.forEach(voice => {
        if(voice.name=== selectedVoice){
            speakText.voice=voice;
        }
    });

    speakText.rate= rate.value;
    speakText.pitch= pitch.value;
    synth.speak(speakText);

    }
};

textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());