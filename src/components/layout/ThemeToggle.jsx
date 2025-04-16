import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../../contexts/ThemeContext'; // Updated import

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
      <IconButton onClick={toggleTheme} color="inherit">
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;