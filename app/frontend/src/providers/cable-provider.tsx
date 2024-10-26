import React from "react";
import ActionCable from "actioncable";

interface CableApp {
  cable: any;
}

const CableContext = React.createContext<any>({});

function CableProvider({ children }: any) {
  const actionCableUrl =
    process.env.NODE_ENV === "production"
      ? "wss://<your-deployed-app-domain>.com/cable"
      : "ws://localhost:3100/cable";

  const CableApp: CableApp = {
    cable: ActionCable.createConsumer(actionCableUrl),
  };

  return (
    <CableContext.Provider value={CableApp}>{children}</CableContext.Provider>
  );
}

export { CableContext, CableProvider };
