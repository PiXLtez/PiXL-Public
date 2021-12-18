import React, { useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import "./App.css";
import Navbar from "../src/components/Navbar/Navbar";
import Unity1 from "./components/Unity/Unity";
import UnityComponent from "./components/Unity/UnityComponent"

enum BeaconConnection {
  NONE = "",
  LISTENING = "Listening to P2P channel",
  CONNECTED = "Channel connected",
  PERMISSION_REQUEST_SENT = "Permission request sent, waiting for response",
  PERMISSION_REQUEST_SUCCESS = "Wallet is connected"
}

const App = () => {
  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https://mainnet.api.tez.ie")
  );
  const [contract, setContract] = useState<any>(undefined);
  const [publicToken, setPublicToken] = useState<string | null>("");
  const [wallet, setWallet] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("transfer");

  const contractAddress: string = "KT1SGdop74rGobKAETcBPnz9yQkH38hZnpBh";
  return (
    <><Navbar
      Tezos={Tezos}
      setContract={setContract}
      setPublicToken={setPublicToken}
      setWallet={setWallet}
      setUserAddress={setUserAddress}
      setUserBalance={setUserBalance}
      setStorage={setStorage}
      contractAddress={contractAddress}
      setBeaconConnection={setBeaconConnection}
      wallet={wallet}
      publicToken={publicToken}
      userAddress={userAddress}
      userBalance={userBalance}
      setTezos={setTezos} />
        <UnityComponent
          Tezos={Tezos}
          publicToken={publicToken}
          userAddress={userAddress}
          userBalance={userBalance}
          setUserBalance={setUserBalance}
        />
      </>
  )
};

export default App;
