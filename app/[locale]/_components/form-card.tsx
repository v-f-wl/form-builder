'use client'

import { useLocale } from "@/app/context/locale-context";
import Link from "next/link";

interface FormCardProps{
  label: string;
  description: string;
  author: string;
  previewUrl: string;
  id: string;
}
const FormCard = ({
  label,
  description,
  author,
  previewUrl,
  id
}: FormCardProps) => {
  const locale = useLocale()
  return ( 
    <div className="card">
      <div className="ratio ratio-4x3">
        <img src={previewUrl} className="card-img-top object-fit-cover" alt="..."/>
      </div>
      <div className="card-body">
        <h5 className="card-title">Card title {locale}</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Link href={`${locale}/form/bsbdfs`} className="btn btn-primary text-white">Go somewhere</Link>
      </div>
    </div>
  )
}
 
export default FormCard;