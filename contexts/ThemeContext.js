import React, { createContext, useContext, useState, useMemo } from 'react';
import { Appearance } from 'react-native';

const lightThemeColors = {
  primary: '#2B4162',
  secondary: '#C69F65',
  background: '#F1F3F4',
  surface: '#FFFFFF',
  text: '#1D2D44',
  subtext: '#5E6778',
  placeholder: '#8B9DAE'
};

const darkThemeColors = {
  primary: '#6096BA',
  secondary: '#D4AF7A',
  background: '#12181F',
  surface: '#1F2937',
  text: '#E7ECEF',
  subtext: '#8B9DAE',
  placeholder: '#8B9DAE'
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

  const toggleTheme = () => {
    setTheme((anterior) => (anterior === 'light' ? 'dark' : 'light'));
  };

  const colors = useMemo(() => (theme === 'light' ? lightThemeColors : darkThemeColors), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}