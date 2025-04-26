'use client'

import { useLocale } from "@/app/context/locale-context";
import { FormCardProps } from "@/types";
import Link from "next/link";


const FormCard = ({
  title,
  description,
  author,
  previewUrl,
  id
}: FormCardProps) => {
  const locale = useLocale();

  return (
    <div className="card h-100 d-flex flex-column">
      <div className="ratio ratio-4x3">
        <img
          src={previewUrl}
          className="card-img-top object-fit-cover"
          alt={title || "Preview"}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate-2-lines">{title || '—'}</h5>
        <p className="card-text text-truncate-3-lines">{description || '—'}</p>

        <div className="mt-auto">
          <Link
            href={`${locale}/form/${id}`}
            className="btn btn-primary text-white w-100"
          >
            Open
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormCard;
