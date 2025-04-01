import Logo from "./UI/logo";

const Haeader = () => {
  return ( 
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col">
          <Logo/>
        </div>
        <div className="col d-flex">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search on App" aria-label="Search on App" aria-describedby="button-addon2"/>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
          </div>
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