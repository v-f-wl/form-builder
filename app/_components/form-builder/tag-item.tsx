import IClose from "../icons/close-icon"

const TagItem = ({
  label,
  handleDelete
}:{
  label: string,
  handleDelete: (tag: string) => void,
}) => {
  return(
    <div 
      className="
        py-1 px-2 
        d-flex gap-1 align-center
        bg-body-secondary 
        cursor-default 
        rounded-2
      "
      onClick={() => handleDelete(label)}
    >
      {label} 
        <span className="cursor-pointer"><IClose size={16}/></span>
    </div>
  )
}
export default TagItem