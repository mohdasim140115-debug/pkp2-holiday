import clsx from "clsx";

export default function Container({ children, className = "", as: Comp = "div" }) {
  return <Comp className={clsx("mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10", className)}>{children}</Comp>;
}
