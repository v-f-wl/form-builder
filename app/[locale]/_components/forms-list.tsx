'use client'
import Title from "@/app/_components/UI/title";
import FormCard from "./form-card";
import { useRouter } from "next/navigation";

const FormsList = () => {
  return ( 
    <div className="mt-4 container">
      <Title label="All forms"/>
      <div className="grid-container mt-4">
        <FormCard 
          id="vdfv34"
          label="vdfvsdfv" 
          description="vsdfvdf" 
          author="vsdfvds"
          previewUrl="https://images.pexels.com/photos/31387106/pexels-photo-31387106/free-photo-of-vibrant-yellow-cosmos-flower-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <FormCard 
          id="vdfv34"
          label="vdfvsdfv" 
          description="vsdfvdf" 
          author="vsdfvds"
          previewUrl="https://images.pexels.com/photos/31387106/pexels-photo-31387106/free-photo-of-vibrant-yellow-cosmos-flower-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <FormCard 
          id="vdfv34"
          label="vdfvsdfv" 
          description="vsdfvdf" 
          author="vsdfvds"
          previewUrl="https://images.pexels.com/photos/31387106/pexels-photo-31387106/free-photo-of-vibrant-yellow-cosmos-flower-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <FormCard 
          id="vdfv34"
          label="vdfvsdfv" 
          description="vsdfvdf" 
          author="vsdfvds"
          previewUrl="https://images.pexels.com/photos/31387106/pexels-photo-31387106/free-photo-of-vibrant-yellow-cosmos-flower-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <FormCard 
          id="vdfv34"
          label="vdfvsdfv" 
          description="vsdfvdf" 
          author="vsdfvds"
          previewUrl="https://images.pexels.com/photos/31387106/pexels-photo-31387106/free-photo-of-vibrant-yellow-cosmos-flower-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
      </div> 
    </div>
  )
}
 
export default FormsList;