import { createContext, useContext, useState } from "react";

const ScrollContext = createContext({
  disableAutoScroll: false,
  setDisableAutoScroll: (value: boolean) => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [disableAutoScroll, setDisableAutoScroll] = useState(false);

  return (
    <ScrollContext.Provider value={{ disableAutoScroll, setDisableAutoScroll }}>
      {children}
    </ScrollContext.Provider>
  );
}
