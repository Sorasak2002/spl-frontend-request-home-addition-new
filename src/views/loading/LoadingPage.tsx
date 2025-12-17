"use client";

import { FC } from "react";
import LoadingBackdrop from "./LoadingBackdrop";

type Props = {
  message?: string;
};

const LoadingPage: FC<Props> = ({ message = "กำลังโหลด..." }) => {
  return <LoadingBackdrop open={true} message={message} fullScreen={true} />;
};

export default LoadingPage;
