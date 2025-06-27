import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [funnelStage, setFunnelStage] = useState('');

  return (
    <DataContext.Provider
      value={{
        columns,
        setColumns,
        selectedColumns,
        setSelectedColumns,
        excelData,
        setExcelData,
        funnelStage,
        setFunnelStage
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
