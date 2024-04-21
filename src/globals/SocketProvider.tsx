import React, { ReactNode, createContext, useState } from "react"
import { Socket } from "socket.io-client"

type SocketContextType =
  {
    socket: Socket | null,
    setSocket: (socket:Socket | null) => void
  }

type SocketProps =
  {
    children: ReactNode
  }
export const SocketContext = createContext<SocketContextType>({
  socket: null,
  setSocket: (socket: Socket | null) => { }
})

export const SocketProvider: React.FC<SocketProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  return (
    <SocketContext.Provider value={{ socket:socket, setSocket: setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};