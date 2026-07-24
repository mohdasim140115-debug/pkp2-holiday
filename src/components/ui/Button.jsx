import Link from "next/link";
import clsx from "clsx";

const variants = {
  primary: "bg-navy text-white hover:bg-navy-dark shadow-lg shadow-navy/25",
  accent: "bg-sky text-white hover:bg-blue shadow-lg shadow-sky/30",
  outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  ghost: "bg-white/90 text-navy hover:bg-white",
  glass: "glass text-white hover:bg-white/25",
  gold: "bg-gold text-navy hover:brightness-95 shadow-lg shadow-gold/30",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
};

export default function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  icon: Icon,
  iconPosition = "right",
  ...props
}) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {content}
    </button>
  );
}
