const SearchInput = () => {
  return ( 
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Search on App" aria-label="Search on App" aria-describedby="button-addon2"/>
      <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
    </div>
   );
}
 
export default SearchInput;