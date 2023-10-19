import "./Styles.scss";
import {useState} from "react";
import { FaClipboard } from "react-icons/fa";
import { 
  number,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters
}from "./Characters";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [ password, setPassword ] = useState("");
  const [ passwordLength, setPasswordLength ] = useState(20);
  const [ uppercase, setUppercase ] = useState(true);
  const [ lowercase, setLowercase ] = useState(true);
  const [ numbers, setNumbers ] = useState(true);
  const [ symbols, setSymbols ] = useState(true);

  const handleGeneratorPassword = () => {
    if (!uppercase && !lowercase && !numbers && !symbols){
      toast.error("You must select at least one option!");
    }

    if (passwordLength < 7 || passwordLength > 20) {
      toast.error(`Password length should be between 7 and 20!`);
      return;
    }

    let characterList = "";
    if (uppercase){
      characterList += upperCaseLetters;
    }
    if (lowercase){
      characterList += lowerCaseLetters;
    }
    if (numbers){
      characterList += number;
    }
    if (symbols){
      characterList += specialCharacters;
    }

    setPassword(passwordCreator(characterList));

  };

  const copyToClipboard = () => {
    if (password === "") {
      toast.error("No password to copy!");
      return;
    }
  
    navigator.clipboard.writeText(password)
      .then(() => {
        toast.success('Password copied to clipboard!');
      })
      .catch(err => {
        toast.error('Failed to copy password to clipboard:', err);
      });
  };
  

  const passwordCreator = (characterList) => {
    let password = "";

    for (let i = 0; i < passwordLength; i++){
      const characterIndex = Math.floor(Math.random()*characterList.length);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  }
  return (
    <div className="container">
      <div className="generator">
        <h2 className="generator_header">Password Generator</h2>
        <div className="generator_password">
          {password}
          <button className="generator_passwordGenerateBtn" onClick={copyToClipboard}>
            <FaClipboard />
          </button>

        </div>

        <div className="form-group">
          <label htmlFor="password-length">Password Length</label>
          <input name="password-length" id="password-length" type="number" 
          max='20' min="7" 
          defaultValue={passwordLength}
          onChange={(e)=> setPasswordLength(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
          <input name="uppercase-letters" id="uppercase-letters" type="checkbox" checked={uppercase} onChange={(e)=>setUppercase(e.target.checked)} />
        </div>

        <div className="form-group">
          <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
          <input name="lowercase-letters" id="lowercase-letters" type="checkbox" checked={lowercase} onChange={(e)=>setLowercase(e.target.checked)}/>
        </div>

        <div className="form-group">
          <label htmlFor="include-numbers">Include numbers</label>
          <input name="include-numbers" id="include-numbers" type="checkbox" checked={numbers} onChange={(e)=>setNumbers(e.target.checked)}/>
        </div>

        <div className="form-group">
          <label htmlFor="include-symbols">Include symbols</label>
          <input name="include-symbols" id="include-symbols" type="checkbox" checked={symbols} onChange={(e)=>setSymbols(e.target.checked)}/>
        </div>

        <button className="generator_btn" onClick={handleGeneratorPassword}>Generate New Password</button>


      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
