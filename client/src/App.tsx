import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import GlobalStyle from "./GlobalStyle";
import AccountPage from "./pages/Account";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import HomePage from "./pages/Home";
import HotelDetailPage from "./pages/HotelDetail";
import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/Singin";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={SignInPage} />
          <Route path="/register" component={SignUpPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/add-hotel" component={AddHotel} />
          <Route path="/edit-hotel/:id" component={EditHotel} />
          <Route path="/hotel/:id" component={HotelDetailPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
