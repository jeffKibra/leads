import React from "react";

import IntroductionText from "../components/introductionText";
import IntroductionVideo from "../components/introductionVideo";
import IntroductionDocument from "../components/introductionDocument";

export default function ManageIntroductionsPage(props) {
  return (
    <>
      <IntroductionText />
      <IntroductionVideo />
      <IntroductionDocument />
    </>
  );
}
