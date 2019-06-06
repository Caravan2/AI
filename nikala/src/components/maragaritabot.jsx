import React, { Component } from 'react';
import axios from 'axios';



class Bot extends Component {
    state = {
        audioContent:"",
        record: false,
        handleChange: event => {
            let botText = this.state.botText;
            botText = event.target.value;
            this.setState({ botText });
        },
        chatingBridge: (botText) => {
            axios.get(`http://127.0.0.1:5000/margaritabot/${botText}`).then(
                res => this.state.goToCloud(res.data)
            ) 

        },

        goToCloud: stext =>
        {
            axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyATHxkQvycIq5UijUvBpx7tyo0OW_zOM44`, {
                input: {text: stext},
                voice: {
                    languageCode: "pl-PL",
                    name: "pl-PL-Wavenet-C", 
                    ssmlGender: 'FEMALE'
                },
                audioConfig: {audioEncoding: 'MP3'}
            }).then(res => {
                let audioContent = res.data.audioContent;

                this.setState({ audioContent })
                setTimeout(()=>{
                    this.state.speech()
                }, 2500)
            })
        },
        speech: ()=>{
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = 'ka-GE';
            recognition.onresult = (event) => {
                console.log(event.results[0][0].transcript);
                this.state.chatingBridge(event.results[0][0].transcript);
                
            }
            recognition.start();
        }
    
    }
      
    
    componentDidMount(){
        // const audio = navigator.mediaDevices.getUserMedia({
        //     audio: true,
        //     video: false
        // }); 
        // let audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // let analyser = audioContext.createAnalyser();
        // // let dataArray = new Uint8Array(analyser.frequencyBinCount);
        // // let source = audioContext.createMediaStreamSource(audio);
        setTimeout(()=>{
          this.state.speech()
        }, 3000)
        
        // setInterval(() => {
            
        //     // console.log(speechToText)
        // }, 10)
    }

    render() {
        return (
            <div className="bot-section">
               <div className="bot-gallery">
                    <img src={require('../assets/img/paintings/nikala_28.JPG')}  className="mb-5 bot-border" />
                    {/*  */}
                </div>
                <audio autoPlay src={"data:audio/mp3;base64," + this.state.audioContent}></audio>
            </div>
                    
        );
    }
}

export default Bot;
