"use client";

import useAuthRedirect from "../../hooks/useAuthRedirect";

export default function ClientLayout({ children }) {
  useAuthRedirect();
  return <>{children}</>;
}
