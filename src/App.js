import "./App.css";
import { useEffect, useContext, createContext, useReducer } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import MainLogin from "./LoginUI/MainLogin";
import CustomerDashboard from "./Customer/CustomerDashboard";
import ClerkDashboard from "./Clerk/ClerkDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import PageNotfound404 from "./PageNotfound404";
import Approve from "./Clerk/Approve";
import { initialState, reducer } from "./Reducer/reducer";
import ViewDetailedRequestClerk from "./Clerk/ViewDetailedRequestClerk";
import ViewDetailedRequestManager from "./Manager/ViewDetailedRequestManager";
import ApproveAccount from "./Manager/ApproveAccount";
import FundTransfer from "./Customer/FundTransfer";
import ApproveTransactions from "./Clerk/ApproveTransactions";
import ViewDetailedTransactionRequest from "./Clerk/ViewDetailedTransactionRequest";
import LoanForm from "./Customer/LoanForm";
import ManagerLoanList from "./Manager/ManagerLoanList";
import LoanView from "./Manager/LoanView";
import BankForm from "./bform/BankForm";
import SendNotification from "./Manager/SendNotification";
import CustomerqueryDisplay from "./Customer/CustomequeryDisplay";
import Querryclerk from "./Clerk/Querryclerk";
import Clerkresponseq from "./Clerk/Clerkresponseq";
import DeleteAccounts from "./Manager/DeleteAccounts";
import DeleteViewDetailedRequestManager from "./Manager/deleteViewDetailedRequestManager";
import Transaction from "./Manager/Transaction";
import CustomerCorrection from "./Customer/CustomerCorrection";
import CustomerTransaction from "./Customer/customerTransaction";
import UProduct from "./Clerk/UProduct";
import Clerkinformation from "./Manager/Clerkinformation";
import LoginUi from "./LoginUI/LoginUi";
import Aboutus from "./Aboutus";
import Termsconditions from "./Termsconditions";

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
        <LoginUi />
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
        <BankForm />
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
      <Route exact path="/CustomerLoanRequest">
        <LoanForm />
      </Route>
      <Route exact path="/sendNotification">
        <SendNotification />
      </Route>
      <Route exact path="/ManagerLoanList">
        <ManagerLoanList />
      </Route>
      <Route exact path="/queryHistory">
        <CustomerqueryDisplay />
      </Route>
      <Route exact path="/queryList">
        <Querryclerk />
      </Route>
      <Route exact path="/managerDelete">
        <DeleteAccounts />
      </Route>
      <Route exact path="/watchTransactions">
        <Transaction />
      </Route>
      <Route exact path="/customerCorrection">
        <CustomerCorrection />
      </Route>
      <Route exact path="/customerTransaction">
        <CustomerTransaction />
      </Route>
      <Route exact path="/editProduct">
        <UProduct />
      </Route>
      <Route exact path="/addClerk">
        <Clerkinformation />
      </Route>
      <Route exact path="/aboutUs">
        <Aboutus />
      </Route>
      <Route exact path="/terms">
        <Termsconditions />
      </Route>
      <Route path="/AnswerQuerryclerk/:id" component={Clerkresponseq}></Route>
      <Route
        path="/approveAccount/:id"
        component={ViewDetailedRequestClerk}
      ></Route>
      <Route
        path="/deleteAccountManager/:id"
        component={DeleteViewDetailedRequestManager}
      ></Route>
      <Route
        path="/approveAccountManager/:id"
        component={ViewDetailedRequestManager}
      ></Route>
      <Route
        path="/approveTransactions/:id"
        component={ViewDetailedTransactionRequest}
      ></Route>
      <Route path="/loanDetails/:LoanId" component={LoanView}></Route>
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
