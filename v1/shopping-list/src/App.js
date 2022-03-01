import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Form from './pages/Form';
import Pantry from './pages/Pantry';
import Shoppinglist from './pages/Shoppinglist';

import { createTheme, ThemeProvider } from '@material-ui/core'
import Layout from './layout/Layout';

const theme = createTheme({
  typography: {
    fontFamily: 'Rubik',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 500,
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Shoppinglist />
            </Route>
            <Route path="/pantry">
              <Pantry />
            </Route>

            <Route path="/form/:id">
              <Form />
            </Route>
            <Route path="/form">
              <Form />
            </Route>

          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}


