import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Home from "./components/Home";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './App.css';

const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="App">
          <Home />
        </div>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
