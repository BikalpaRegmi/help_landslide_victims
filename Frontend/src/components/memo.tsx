import { ethers } from "ethers"
import React, { useEffect, useState } from "react";

interface MemoProps {
    state: {
        provider: ethers.BrowserProvider | null;
        signer: ethers.Signer | null;
        contract: ethers.Contract | null;
    }
}

interface memoState {
    name: string,
    remarks: string,
    timestamp: string,
    address:string,
}

const Memo: React.FC<MemoProps> = ({ state }) => {
    const [memos, setMemos] = useState<memoState[]>([]);

    const { contract } = state; 
    
    const memoMessages = async() => {
        try {
            const memosRaw = await contract?.retrieve();
            const parsedMemo = memosRaw.map((memo: any) => ({
              name: memo[0],
              remarks: memo[1],
              timestamp: new Date(Number(memo[2]) * 1000).toLocaleString(),
              address: memo[3],
            })).reverse();
            setMemos(parsedMemo);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        memoMessages();
    }, [memos])
    
    

  return (
      <div className="mb-4">
        <h1 className="text-center text-xl font-semibold   mt-5">Thank you for donating</h1>
          {memos && memos.map((history , key) => {
              return (
                  <>
                  <ul key={key} className="bg-slate-200 pl-5 text-lg capitalize shadow-lg mt-5">
                    {" "}
                    <li>name : {history.name}</li>
                    <li>remarks : {history.remarks}</li>
                    <li> timestamp : {history.timestamp}</li>
                    <li>address : {history.address}</li>
                  </ul>
                </>
              );
     })}
    </div>
  )
}

export default Memo
