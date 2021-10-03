import React from "react";
import "./Aboutus.css";
import Nav from "./NavBarHome/Nav";

function Aboutus() {
  return (
    <div class="bgimg">
      <Nav />
      <div>
        <div class="card">
          <div class="card-body"></div>
        </div>
      </div>

      <div>
        {" "}
        <br />{" "}
      </div>
      <div class="container">
        <div class="row">
          <img
            src="https://media.istockphoto.com/vectors/about-us-flat-design-orange-round-vector-icon-in-eps-10-vector-id950039636?k=20&m=950039636&s=612x612&w=0&h=PmBQ4m26HKtncsq-WzDbDhk_9J_hrWd1A1zt-BI0Kb4="
            width="100"
            height="500"
          />
        </div>
      </div>
      <div class="container">
        <div>
          <div class="row">
            <b> Aim </b>
            The aim of our bank is to make the banking system online where
            customers can transfer their money, Apply for new account, Apply for
            Loan and Cards, Get Notifications, Watch their Transactions and ask
            Queries from bank online without going to bank physically.
          </div>{" "}
          <br />
          <div class="row">
            <b> History</b>
            The Bank was originally promoted in 2020, an Indian financial
            institution, and was its wholly-owned subsidiary.
          </div>{" "}
          <br />
          <div class="row">
            <b> Board of Directors</b>
            Bank's Board members include eminent individuals with a wealth of
            experience in international business, management consulting, banking
            and financial services
          </div>{" "}
          <br />
          <div class="row">
            <b>Career Opportunities</b>
            Explore diverse openings with Bank.
          </div>{" "}
          <br />
          <div class="row">
            <b>Corporate Social Responsibility</b>
            Bank is deeply engaged in human and economic development at the
            national level. The Bank works closely with Foundation across
            diverse sectors and programs.
          </div>
          <br />
          <div class="row">
            <b>Investor Relations</b>
            All the latest, in-depth information about ICICI Bank's financial
            performance and business initiatives.
          </div>
        </div>
        <br />
        <div class="row">
          <b>Notice Board</b>
          Catch up with Bank's latest communication related to Acknowledgements,
          information on regulatory notices, banking ombudsman schemes and
          others.
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
