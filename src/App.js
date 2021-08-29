import "./App.css";
import { useEffect, useContext, createContext, useReducer } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import MainLogin from "./LoginUI/MainLogin";
import CustomerDashboard from "./Customer/CustomerDashboard";
import ClerkDashboard from "./Clerk/ClerkDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import PageNotfound404 from "./PageNotfound404";
import Bform from "./bform/Bform";
import Approve from "./Clerk/Approve";
import { initialState, reducer } from "./Reducer/reducer";
import ViewDetailedRequestClerk from "./Clerk/ViewDetailedRequestClerk";
import ViewDetailedRequestManager from "./Manager/ViewDetailedRequestManager";
import ApproveAccount from "./Manager/ApproveAccount";
import FundTransfer from "./Customer/FundTransfer";
import ApproveTransactions from "./Clerk/ApproveTransactions";
import ViewDetailedTransactionRequest from "./Clerk/ViewDetailedTransactionRequest";

export const userContext = createContext();

const Routing = () => {
  const history = useHistory();
  const value = document.cookie.split("=");
  const { dispatch } = useContext(userContext);

  useEffect(() => {
    if (value[1] === "true") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch({ type: "USER", payload: user });
      } else {
        history.push("/login");
      }
    } else {
      const pathname = window.location.href.split("/");
      console.log(pathname[3]);
      if (pathname[3] !== "Application") {
        history.push("/login");
      }
    }
  }, []);

  return (
    <Switch>
      <Route path="/login">
        <MainLogin />
      </Route>
      <Route exact path="/customerDashboard">
        <CustomerDashboard />
      </Route>
      <Route exact path="/clerkDashboard">
        <ClerkDashboard />
      </Route>
      <Route exact path="/managerDashboard">
        <ManagerDashboard />
      </Route>
      <Route exact path="/wrongPage">
        <PageNotfound404 />
      </Route>
      <Route exact path="/Application">
        <Bform />
      </Route>
      <Route exact path="/approveAccount">
        <Approve />
      </Route>
      <Route exact path="/approveTransactions">
        <ApproveTransactions />
      </Route>
      <Route exact path="/approveAccountManager">
        <ApproveAccount />
      </Route>
      <Route exact path="/transferFund">
        <FundTransfer />
      </Route>
      <Route
        path="/approveAccount/:id"
        component={ViewDetailedRequestClerk}
      ></Route>
      <Route
        path="/approveAccountManager/:id"
        component={ViewDetailedRequestManager}
      ></Route>
      <Route
        path="/approveTransactions/:id"
        component={ViewDetailedTransactionRequest}
      ></Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
