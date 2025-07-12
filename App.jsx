// import { useState, useCallback, useEffect, useRef } from 'react'


// function App() {
//   const [length, setLength] = useState(8);
//   const [numberAllowed, setNumberAllowed] = useState(false);
//   const [characterAllowed, setCharacterAllowed] = useState(false);
//   const [Password, setPassword] = useState("");

//     const passwordRef = useRef(null);

//   const passWordGenerator = useCallback(() => {
//     let pass = "";
//     let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     if (numberAllowed) {
//       str += "0123456789";
//     }
//     if (characterAllowed) {
//       str += "!@#$%^&*()_+[]{}|;:,.<>?";
//     }

//     for (let i = 1; i <= length; i++) {
//       let char = Math.floor(Math.random() * str.length);
//       pass += str.charAt(char);
//     }

//     setPassword(pass);

//   }, [length, numberAllowed, characterAllowed, setPassword]);

//   const copyPasswordToClipboard = useCallback(() => {
//     passwordRef.current?.select();
//     window.navigator.clipboard.writeText(Password)

//   },[Password])

// //useEffect to generate password when dependencies change
//   //length, numberAllowed, characterAllowed
//   //setPassword is not a dependency because it is a state setter function from useState
//   //useCallback is used to memoize the function so it doesn't change on every render
//   useEffect(() => {
//     passWordGenerator()
//   }, [length, numberAllowed, characterAllowed, passWordGenerator]);

//   //useref


//   return (
//     <>


//       <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
//         <h1 className="text-white text-center m-3s" >
//           Password Generator
//         </h1>
//         <div className='flex shadow rounded-lg overflow-hidden mb-4'>
//           <input type="text"
//             value={Password}
//             className='outline-none w-full py-1 px-3'
//             placeholder='Password'
//             readOnly
//             ref={passwordRef} />

//           <button 
//           onClick={copyPasswordToClipboard}
//           className='outLine-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
//         </div>
//         <div className='flex text-sm gap-x-2'>
//           <div className='flex iteams-center gap-x-1'>
//             <input type="range"
//               min={8}
//               max={100}
//               value={length}
//               className='cursor-pointer'
//               onChange={(e) => { setLength(e.target.value) }} />
//             <label> Length: {length}</label>
//           </div>
//           <div className='flex items-center gap-x-1'>
//             <input type="checkbox"
//               defaultChecked={numberAllowed}S
//               id="numberInput"
//               onChange={() => {
//                 setNumberAllowed((prev) => !prev);
//               }} />

//             <label htmlFor="numberInput">Numbers</label>
//           </div>
//           <div className='flex items-center gap-x-1'>
//             <input type="checkbox"
//               defaultChecked={characterAllowed}
//               id="characterInput"
//               onChange={() => {
//                 setCharacterAllowed((prev) => !prev);
//               }} />

//             <label htmlFor="characterInput">Characters</label>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

//export default App
import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passWordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()_+[]{}|;:,.<>?";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, [Password]);

  useEffect(() => {
    passWordGenerator();
  }, [length, numberAllowed, characterAllowed, passWordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center mb-3">Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={Password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
          {copied && <span className="text-green-400 ml-2">Copied!</span>}
        </div>

        <div className='flex text-sm gap-x-2 flex-wrap'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => setCharacterAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
