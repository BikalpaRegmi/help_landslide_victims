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

    const donateVictims = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { contract } = state;
        const amount = {value:ethers.parseEther("0.001")}
        const transaction = await contract?.donate(datas.name, datas.message, amount)
        await transaction.wait();
        console.log("transaction is sucessfull");
        setDatas({ name: '', message: ' ' });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDatas((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
     }
  return (
    <div className="w-full ">
      <form
        action=""
        className="flex gap-3 mt-5 bg-slate-50 w-1/2 mx-auto shadow-sm flex-col"
        onSubmit={donateVictims}
      >
        <span className="pl-3 pt-3">
          Name : { " " }
          <input
            className="border-2"
            type="text"
            value={datas.name}
            name="name"
            onChange={handleChange}
          />
        </span>

        <span className="pl-3 pt-3">
          Remarks : { " " }
          <input
            className=" w-64 border-2"
            type="text"
            value={datas.message}
            name="message"
            onChange={handleChange}
          />
        </span>

        <span className="mx-auto ">
          <button
            className="border-2 w-64 font-mono p-1 bg-slate-100 hover:bg-slate-300 "
            title="Donate"
            type="submit"
          >
            {" "}
            Donate{" "} 0.001 eth
          </button>
        </span>
          </form>
    </div>
  );
}

export default Donate
