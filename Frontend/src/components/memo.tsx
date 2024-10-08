import { ethers } from "ethers"
import React, { useEffect } from "react";

interface MemoProps {
    state: {
        provider: ethers.BrowserProvider | null;
        signer: ethers.Signer | null;
        contract: ethers.Contract | null;
    }
}

const Memo: React.FC<MemoProps> = ({ state }) => {
    useEffect(() => {
        
        if (state) {
            console.log('memo' , state)
        } else {
            console.log('no contract available')
        }
    },[])
  return (
    <div>
      hii memo
    </div>
  )
}

export default Memo
