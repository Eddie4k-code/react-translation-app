import { useEffect, useState } from "react";
import axios from 'axios'

export const LanguageSelection = ({ chosenUserLanguage, chosenTranslateLanguage }) => {

    const [userInput, setUserInput] = useState("");
    const [translation, setTranslation] = useState("");


    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    }


    //Make request to translate user input
    const sendRequest = () => {

        const encodedParams = new URLSearchParams();
        encodedParams.append("q", userInput);
        encodedParams.append("target", chosenTranslateLanguage);
        encodedParams.append("source", chosenUserLanguage);

        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams
        };

        axios.request(options).then(function (response) {
            setTranslation(response.data.data.translations.map((t) => t.translatedText.toString()));
        }).catch(function (error) {
            console.error(error);
        });
    }


    //Makes request to api to translate what was written by the user 
    const translateLanguage = (e) => {
        e.preventDefault();
        sendRequest();
    }


    //Makes the translation text area empty if the user imput is empty.
    useEffect(() => {
        if (userInput.length == 0) {
            setTranslation("");
        }
    }, [userInput])
    

    return (


        <div class="container">

            <div class="box-border h-80 w-80 p-4 border-4">
                <h1>{chosenUserLanguage}</h1>
                <textarea value={userInput} onChange={handleUserInput} className="Textarea blue" id="to-box" placeholder="Enter Text Here"/>

            </div>


            <div class="box-border h-80 w-80 p-4 border-4">
                <h1>{chosenTranslateLanguage}</h1>

                <textarea value={translation} disabled id="to-box"></textarea>

            </div>

            <div class="flex space-x-2 justify-center">
                <button onClick={translateLanguage} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">

                    Translate

                </button>
            </div>

        </div>






         

    );
}