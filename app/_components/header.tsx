import Logo from "./UI/logo";
import SearchInput from "./UI/search-input";

const Haeader = () => {
  return ( 
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col">
          <Logo/>
        </div>
        <div className="col d-flex">
          <SearchInput/>
        </div>
        <div className="col d-flex gap-3 justify-content-end">
          <div className="btn btn-outline-primary">LogIn</div>
          <div className="btn btn-primary">SignUp</div>
        </div>
      </div>
    </div>
  )
}
 
export default Haeader;