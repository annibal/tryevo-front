import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const LinkBehavior = forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <NavLink ref={ref} to={href} {...other} />;
});

export default LinkBehavior;
