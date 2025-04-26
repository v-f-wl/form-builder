'use client'
import Subtitle from "../UI/subtitle";
import { useFormBuilder } from "@/app/context/form-builder-context";

const ImageUpload = () => {
  const { setFormImage } = useFormBuilder()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormImage(file);
    }
  }

  return ( 
    <div className="mb-4">
      <Subtitle label="Add image"/>
      <div className="input-group">
        <input type="file" onChange={handleFileChange} className="form-control" id="uploadImage"/>
      </div>
    </div>
   );
}
 
export default ImageUpload;