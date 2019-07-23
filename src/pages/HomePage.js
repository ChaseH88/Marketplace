import React, { Fragment, useState } from "react";
import NewMarket from "../components/NewMarket";
import MarketList from "../components/MarketList";


const HomePage = () => {
  
  //const [] = useState(null);

  return(
    <Fragment>
      <NewMarket />
      <MarketList />
    </Fragment>
  )
}

export default HomePage;
