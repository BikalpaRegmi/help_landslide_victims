import { ethers } from "ethers"
import React, { useState } from "react";

interface donateProps {
  state : {
      provider: ethers.BrowserProvider |null;
      signer: ethers.Signer |null;
      contract: ethers.Contract |null;
  }
}

interface datasState {
    name: string,
    message:string,
}

const Donate: React.FC<donateProps> = ({ state }) => {
    const [datas, setDatas] = useState<datasState>({
        name: '',
        message:'',
   })

    const donateVictims = async() => {
         
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDatas((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
        console.log(datas)
     }
  return (
    <div>
          <form action="" onSubmit={donateVictims}>
              
              <input className="border-2" type="text" value={datas.name}  name="name" onChange={handleChange}/>

              <input className="border-2" type="text" value={datas.message}  name="message" onChange={handleChange}/>

              <button type="submit" > Donate </button>
      </form>
    </div>
  )
}

export default Donate
