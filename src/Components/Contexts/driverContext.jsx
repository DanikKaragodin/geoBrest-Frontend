import React, { useState } from 'react';

export const DriverContext = React.createContext();

export const DriverContextProvider = ({ children }) => {
  const [Driver, setValue] = useState({
    fullname: "Denis Suhachev",
    hours: 0,
    minutes: 0,
    seconds: 0,
    koef: 0,
    indexStopOver: 0,
    is_recursive: false,
    is_breaking: false,
    breaking_in_min: 0,
    is_sleeping: false,
    max_passengers: 0,
    sizeOfPaths: 0,
    path: [],
    path_rec: [],
    currentPath: [],
    passengersSize: 0,
    stopOversSizes: [],
    token: "",
    id: "",
    busId: "",
  });

  // Функция обновления состояния контекста
  const updateValues = (updatedValues) => {
    setValue(prevState => ({
      ...prevState,
      ...updatedValues
    }));
  };

  return (
    <DriverContext.Provider value={{ Driver, updateValues }}>
      {children}
    </DriverContext.Provider>
  );
};