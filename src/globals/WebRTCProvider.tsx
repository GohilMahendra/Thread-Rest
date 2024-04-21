import React, { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { RTCPeerConnection } from "react-native-webrtc";

type WebRTCContextType = {
  peerConnection: RTCPeerConnection | null;
  setPeerConnection: (connection: RTCPeerConnection | null) => void;
};

type WebRTCProviderProps = {
  children: ReactNode;
};

export const WebRTCContext = createContext<WebRTCContextType>({
  peerConnection: null,
  setPeerConnection: () => { }
});

export const WebRTCProvider: React.FC<WebRTCProviderProps> = ({ children }) => {
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const setPeerConnection = (connection: RTCPeerConnection | null) => {
    peerConnectionRef.current = connection
  };
  return (
    <WebRTCContext.Provider value={{ peerConnection: peerConnectionRef.current, setPeerConnection }}>
      {children}
    </WebRTCContext.Provider>
  );
};
