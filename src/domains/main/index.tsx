import React, { FC } from "react";
import { useFeatureToggles } from "../../plugins";
import { MainPage } from "./page";

export const Main: FC = () => {
  const featureToggles = useFeatureToggles<{
    teams?: boolean;
  }>();

  return <MainPage/>
}