/**
 * Centralized environment variable loader with runtime validation.
 * Throws on boot if required variables are missing.
 */

export interface Env {
  TAVUS_API_KEY: string;
  TAVUS_PERSONA_ID: string;
  TAVUS_REPLICA_ID: string;
  NEXT_PUBLIC_APP_NAME: string;
}

function readRequired(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env: Env = {
  TAVUS_API_KEY: readRequired("TAVUS_API_KEY"),
  TAVUS_PERSONA_ID: readRequired("TAVUS_PERSONA_ID"),
  TAVUS_REPLICA_ID: readRequired("TAVUS_REPLICA_ID"),
  NEXT_PUBLIC_APP_NAME:
    process.env.NEXT_PUBLIC_APP_NAME ?? "Tavus CVI Demo",
};

// Note:
// - Do NOT import this module in client components to avoid exposing secrets.
// - Client components should directly read NEXT_PUBLIC_* variables if needed.


