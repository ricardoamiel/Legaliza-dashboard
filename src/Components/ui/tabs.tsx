import React, { useState, ReactNode } from "react";

// Props para el contenedor de Tabs
interface TabsProps {
  children: ReactNode;
}

// Props para la lista de Tabs
interface TabListProps {
  children: ReactNode;
}

// Props para los paneles de Tabs
interface TabPanelsProps {
  children: ReactNode;
}

// Props para cada botón de Tab
interface TabButtonProps {
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
}

// Contexto para administrar el estado de las pestañas
const TabsContext = React.createContext<{
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}>({
  activeIndex: 0,
  setActiveIndex: () => {},
});

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Índice de la pestaña activa

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<TabListProps> = ({ children }) => {
  return <div className="tab-list flex gap-4 border-b">{children}</div>;
};

export const TabPanels: React.FC<TabPanelsProps> = ({ children }) => {
  const { activeIndex } = React.useContext(TabsContext);

  return <div className="tab-panels">{React.Children.toArray(children)[activeIndex]}</div>;
};

export const TabButton: React.FC<TabButtonProps> = ({ children, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`tab-button px-4 py-2 ${
        isActive ? "border-b-2 border-primary text-primary" : "text-gray-500"
      }`}
    >
      {children}
    </button>
  );
};
