import { LanguageSelection } from "./LanguageSelection"
import axios from 'axios';
import { useEffect, useState } from "react";



export const LanguageBox = () => {


    //Get the languages search
    const [allLanguages, setAllLanguages] = useState([]);
    const [userLanguage, setUserLanguage] = useState("");

    const [translateLanguage, setTranslateLanguage] = useState("");
    const [userLanguageResult, setUserLanguageResult] = useState([]);




    const filterLanguages = () => {
        setUserLanguageResult(allLanguages.filter((lan) => lan.language.startsWith(userLanguage)));
        console.log(userLanguageResult)
    }



    const handleUserLanguage = (e) => {
        setUserLanguage(e.target.value);
    }

    const handleTranslateLanguage = (e) => {
        setTranslateLanguage(e.target.value);
    }



    useEffect(() => {

        console.log(process.env.REACT_API_KEY);

                const options = {
                    method: 'GET',
                    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
                    headers: {
                        'Accept-Encoding': 'application/gzip',
                        'X-RapidAPI-Key': process.env.REACT_API_KEY,
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


    useEffect(() => {
        filterLanguages();

    }, [userLanguage])



            return (


        <div class="box-border h-83 w-85 p-5 border-5">
                    <input type="text" className="space-x-10 box-border h-10 w-35 p-4 border-4" value={userLanguage} onChange={handleUserLanguage} placeholder="Enter Here" />
                    <ul id="box-res" className={userLanguage ? 'visible border' : 'invisible'}>

                        {userLanguageResult.map((res, index) => {

                            return (

                                <li id="search-res" onClick={() => setUserLanguage(res.language)} key={res.language} className="search-res">{res.language}</li>

                            )

                        })}

                    </ul>
                    <input type="text" className="space-x-10 box-border h-10 w-35 p-4 border-4" onChange={handleTranslateLanguage} placeholder="Translate To..." />
            <LanguageSelection className="container flex justify-center" />

        </div>
        

    




    )
}