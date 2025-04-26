'use client'
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import Loading from "../loading"

type User = {
  id: string,
  name: string,
  email: string,
  isBlocked: boolean,
  permission: string,
  createdAt: string
}

const UsersTable = () => {
  const { userId  } = useAuth()
  const [usersList, setUsersList] = useState<User[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  const locale = useLocale()
  const t = useTranslations()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/${locale}/api/users/get-all-users?offset=0`)
        setUsersList(res.data.users)
      } catch (err: any) {
        console.error('kjn',err)
      }finally{
        setIsLoaded(true)
      }
    }
    if (userId) {
      fetchUsers()
    }
  }, [userId])

  const toggleSelectAll = () => {
    if (selected.size === usersList.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(usersList.map((user) => user.id)))
    }
  }

  const toggleSelectOne = (id: string) => {
    const updated = new Set(selected)
    if (updated.has(id)) {
      updated.delete(id)
    } else {
      updated.add(id)
    }
    setSelected(updated)
  }

  const handleDelete = () => {
    setUsersList((prev) => prev.filter((form) => !selected.has(form.id)))
    setSelected(new Set())
  }
  if(!isLoaded){
    return (
      <div className="container">
        <Loading/>
      </div>
    )
  }
  if(usersList.length == 0) {
    return(
      <div className="container mt-4 ">
        Sorry you do not have forms 
      </div>
    )
  }
  return (
    <div className="table-responsive mt-4">
      <div className="d-flex mb-2 align-items-center gap-2">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={toggleSelectAll}
        >
          {selected.size === usersList.length ? t('ui.unselectAll') : t('ui.selectAll')}
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleDelete}
          disabled={selected.size === 0}
        >
          Block
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleDelete}
          disabled={selected.size === 0}
        >
          unblock
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleDelete}
          disabled={selected.size === 0}
        >
          admin
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleDelete}
          disabled={selected.size === 0}
        >
          not admin
        </button>
      </div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">{t('formBuilder.category')}</th>
            <th scope="col">Blocked</th>
            <th scope="col">Is admin</th>
            <th scope="col">Created At</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selected.has(user.id)}
                  onChange={() => toggleSelectOne(user.id)}
                />
              </td>
              <td>
                {user.name}
              </td>

              <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</td>
              <td>
                {user.isBlocked ? 'Blocked' : 'Active'}
              </td>
              <td>{user.permission}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
 
export default UsersTable;