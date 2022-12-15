import { LanguageSelection } from "./LanguageSelection"
import axios from 'axios';
import { useEffect, useState } from "react";



export const LanguageBox = () => {


    //All languages that can be searched are stored in this state
    const [allLanguages, setAllLanguages] = useState([]);

    //This is the input value for the users search when looking for their language
    const [userLanguage, setUserLanguage] = useState("");


    //This state is the users search query when looking for the language they will be translating from.
    const [chosenUserLanguage, setChosenUserLanguage] = useState("");


    //This state is the users search query when looking for the language they want to translate a phrase too.
    const [chosenTranslateLanguage, setChosenTranslateLanguage] = useState("");

    //This is the input value for the users search when looking for the language they want to translate too.
    const [translateLanguage, setTranslateLanguage] = useState("");

    //This state contains all the matches of languages that match the keys that the user types shown in the dropdown when looking for their language.
    const [userLanguageResult, setUserLanguageResult] = useState([]);


    //This state contains all the matches of languages that match the keys that the user types shown in the drop down when looking for the language they want to translate too.
    const [translateLanguageResult, setTranslateLanguageResult] = useState([]);


    //Filters through the languages in the state allLanguages to find one that matches with what user is typing.
    const filterLanguages = (type) => {

        if (type == 'userLanguage') {

            setUserLanguageResult(allLanguages.filter((lan) => lan.language.startsWith(userLanguage)));
            console.log(userLanguageResult)
        } else if (type == 'translateLanguage') {
            setTranslateLanguageResult(allLanguages.filter((lan) => lan.language.startsWith(translateLanguage)));
        }
    }

    //Sets the language to whatever language the user clicked in the dropdown on the ui.
    const userLanguageSelection = (language, type) => {

        if (type == 'userLanguage') {
            setChosenUserLanguage(language);
            setUserLanguage("");
        } else if (type == 'translateLanguage') {
            setChosenTranslateLanguage(language);
            setTranslateLanguage("");
        }

        
    }


    //Handles the input for the users language
    const handleUserLanguage = (e) => {
        setUserLanguage(e.target.value);
    }

    //Handles the input for language the user wants to translate too.
    const handleTranslateLanguage = (e) => {
        setTranslateLanguage(e.target.value);
    }


    //Makes request when page first renders to get all possible languages from API.
    useEffect(() => {

        console.log(process.env.REACT_API_KEY);

                const options = {
                    method: 'GET',
                    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
                    headers: {
                        'Accept-Encoding': 'application/gzip',
                        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
                    }
                };

                axios.request(options).then(function (response) {
                    console.log(response.data.data.languages);
                    setAllLanguages(response.data.data.languages);
                }).catch(function (error) {
                    console.error(error);
                });


            }, []);





    //Updates the search results when looking for the users language
    useEffect(() => {
        if (userLanguage.length > 0) {

            filterLanguages('userLanguage');

        } else {
            setUserLanguage("");
        }

    }, [userLanguage])


    //Updates the search results when looking for the langage the user wants to translate too.
    useEffect(() => {
        if (translateLanguage.length > 0) {
            filterLanguages('translateLanguage');

        } else {
            setTranslateLanguage("");
        }
    }, [translateLanguage]);






            return (


                <div class="box-border h-83 w-85 p-5 border-5">
                    
                        
                    <input type="text" className="space-x-10 box-border h-10 w-35 p-4 border-4" value={userLanguage} onChange={handleUserLanguage} placeholder="Current Language..." />
                    <ul id="box-res" className={userLanguage ? 'visible border' : 'invisible'}>

                        {userLanguageResult.map((res, index) => {

                            return (

                                <li id="search-res" onClick={() => userLanguageSelection(res.language, 'userLanguage')} key={res.language} className="search-res">{res.language}</li>

                            )

                        })}

                    </ul>
                    <input type="text" className="space-x-10 box-border h-10 w-35 p-4 border-4" onChange={handleTranslateLanguage} value={translateLanguage} placeholder="Translate To..." />
                    <ul id="box-res" className={translateLanguage ? 'visible border' : 'invisible'}>

                        {translateLanguageResult.map((res, index) => {

                            return (

                                <li id="search-res" onClick={() => userLanguageSelection(res.language, 'translateLanguage')} key={res.language} className="search-res">{res.language}</li>

                            )

                        })}

                    </ul>

                    <div className="justify-center">
                        <LanguageSelection chosenUserLanguage={chosenUserLanguage} chosenTranslateLanguage={chosenTranslateLanguage} className="container flex justify-center" />
                        
                    </div>

        </div>
        

    




    )
}