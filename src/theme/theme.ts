/// <reference path="./theme.d.ts" />

import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      primary: {
        light: '#121212',
        main: '#121212',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#039be5',
        main: '#039be5',
        dark: '#0277bd',
        contrastText: '#fff',
      },

      primaryBtn: {
        main: '#121212',
        dark: 'transparent',
        contrastText: '#fff',
      },

      addBtn: {
        main: '#43a047',
        dark: '#1b5e20',
        contrastText: '#fff',
      },

      deleteBtn: {
        main: '#e53935',
        dark: '#c62828',
        contrastText: '#fff' 
      },


    },

    components: {
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-indicator': {
              height: '1px',
              width: '80%',
            }
          }

        }
      },
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none'
          }
        }
      },

      MuiButton: {
        defaultProps: {
          disableFocusRipple: true,
          disableElevation: true,
          disableRipple: true,
        },

        styleOverrides: {
          root: {
            borderRadius: '30px',
            padding: '0.75rem 2rem',
            textTransform: 'none',
            border: '1px solid transparent',
            "&:hover": {
              border: '1px solid black',
            },
            '&.is-square': {
              borderRadius: '8px',
            },
            '&.is-action-with-icon': {
              paddingLeft: '1.5rem',
              paddingRight: '2rem',
            },
          }
        }
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            borderRadius: '15px',
          }
        }
      }
    }
  });

  