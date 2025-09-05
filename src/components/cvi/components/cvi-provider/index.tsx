'use client';

import React, { useMemo } from "react";
import { DailyProvider } from "@daily-co/daily-react";
import DailyIframe from "@daily-co/daily-js";

// Keep a single Daily call object for the whole app lifecycle
let sharedCallObject: ReturnType<typeof DailyIframe.createCallObject> | null = null;
const getSharedCallObject = () => {
  if (sharedCallObject) return sharedCallObject;
  sharedCallObject = DailyIframe.createCallObject();
  return sharedCallObject;
};

export const CVIProvider = ({ children }: { children: React.ReactNode }) => {
  const callObject = useMemo(() => getSharedCallObject(), []);
  return <DailyProvider callObject={callObject}>{children}</DailyProvider>;
};
