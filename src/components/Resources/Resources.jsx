import React from "react";
import Card from "../Card/Card";

import "./Resources.css";

const Resources = () => {
  return (
    <div className="cards">
      <Card
        title={"Covid Fight Club"}
        description={
          "Crowdsourced resources to fight COVID. If you need help or can provide help that you're posting on Twitter/IG/FB please also post here so everyone can see it."
        }
        link={"https://covidfightclub.org/"}
      />
      <Card
        title={"Twitter Search for COVID"}
        description={
          "Latest updates on resources provided present on Twitter around India."
        }
        link={"https://covid19-twitter.in/"}
      />
      <Card
        title={"Covid Army"}
        description={"Verified Real Time List of COVID-19 Resources and Aid"}
        link={"https://covid.army/"}
      />
      <Card
        title={"India Covid Resource"}
        description={
          "Powered by 200+ volunteers to provide verified covid resources pan India. DM us at @TheProductFolks, @CreatorsOfProd, or @kavirkaycee"
        }
        link={"https://indiacovidresources.in/"}
      />
    </div>
  );
};

export default Resources;
