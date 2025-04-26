import Button from "./UI/button";

const CrashMessage = ({
  onClick
}:{
  onClick: () => void
}) => {
  return (  
    <div className="d-flex flex-column align-items-center">
      <h5 className="">Something went wrong, please try again</h5>
      <Button style="red" onClick={onClick} label="Reload"/>
    </div>
  );
}
 
export default CrashMessage;