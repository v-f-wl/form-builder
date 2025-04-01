import Link from "next/link";
import ILogo from "../icons/logo-icon";

const Logo = () => {
  return ( 
    <Link  href='/' className="d-flex gap-2 align-items-center">
      <ILogo/>
      <h4 className="fs-3 mb-0">FormHelper</h4>
    </Link>
  )
}
 
export default Logo;

