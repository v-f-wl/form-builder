'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ResponseFormData } from '@/types'
import { useLocale } from '@/app/context/locale-context'
import axios from 'axios'
import Loading from '../loading'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const CreatedFormsTable = () => {
  const { userId  } = useAuth()
  const locale= useLocale()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [formsData, setFormsData] = useState<ResponseFormData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null >('')
  const t = useTranslations()

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get(`/${locale}/api/forms/user-forms`)
        setFormsData(res.data.results)
        setError(null)
      } catch (err: any) {
        setError('Failed to fetch forms')
      } finally {
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchForms()
    }
  }, [userId])

  const toggleSelectAll = () => {
    if(!formsData || isDeleting) return
    if (selected.size === formsData.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(formsData.map((form) => form.id)))
    }
  }

  const toggleSelectOne = (id: string) => {
    if(isDeleting) return
    const updated = new Set(selected)
    if (updated.has(id)) {
      updated.delete(id)
    } else {
      updated.add(id)
    }
    setSelected(updated)
  }

  const handleDelete = async() => {
    setIsDeleting(true)
    try {
      const ids = Array.from(selected);
      await axios.delete(`/${locale}/api/forms/user-forms`, {
        data: { ids },
      });
      const res = await axios.get(`/${locale}/api/forms/user-forms`)
      setFormsData(res.data.results)
      setSelected(new Set())
      toast.success('Form deleted')
    } catch (error) {
      toast.error('Form was not deleted, please try again')
    } finally{
      setIsDeleting(false)
    }
  }

  if(isLoading){
    return(
      <div className="container">
        <Loading/>
      </div>
    )
  }
  if(!formsData) {
      return(
        <div className="container mt-4 ">
          Sorry you do not have forms 
        </div>
      )
  }
  return (
    <div className={`table-responsive mt-4 ${isDeleting && 'opacity-50'}`}>
      <div className="d-flex mb-2 align-items-center gap-2">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={toggleSelectAll}
        >
          {selected.size === formsData.length ? t('ui.unselectAll') : t('ui.selectAll')}
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={handleDelete}
          disabled={selected.size === 0 || isDeleting}
        >
          {t('ui.delete')}
        </button>
      </div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">{t('formBuilder.title')}</th>
            <th scope="col">{t('formBuilder.description')}</th>
            <th scope="col">{t('formBuilder.category')}</th>
            <th scope="col">{t('formBuilder.tags')}</th>
            <th scope="col">Created At</th>
          </tr>
        </thead>
        <tbody>
          {formsData.map((form) => (
            <tr key={form.id}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selected.has(form.id)}
                  onChange={() => toggleSelectOne(form.id)}
                />
              </td>
              <td>
                <Link href={`/form/${form.id}`} className="text-decoration-underline text-primary">
                  {form.title}
                </Link>
              </td>
              <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {form.description}
              </td>
              <td>{form.category}</td>
              <td></td>
              <td>{format(new Date(form.createdAt), 'dd.MM.yyyy')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CreatedFormsTable