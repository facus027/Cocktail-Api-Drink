import { ReactNode } from "react";

export default function Alert({ children }: { children: ReactNode }) {
  return (
    <p className=" bg-red-700 mx-5 p-1 uppercase font-bold text-white text-sm text-center">
      {children}
    </p>
  );
}
