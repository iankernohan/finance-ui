import { NavLink } from "react-router";
import "./navItem.css";

type NavItemProps = {
  to: string;
  children: React.ReactNode;
};

export default function NavItem({ to, children }: NavItemProps) {
  return (
    <NavLink className="nav-item" to={to}>
      {children}
    </NavLink>
  );
}
