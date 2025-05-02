const ErrorSubtitle = ({errorLabel}: {errorLabel: string}) => {
  return ( 
    <div className="text-danger">{errorLabel}</div>
   );
}
 
export default ErrorSubtitle;