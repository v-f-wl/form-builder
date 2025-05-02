import Link from "next/link";

const CompletedForm = () => {
  return ( 
    <div className="container d-flex flex-column justify-content-center align-items-center py-5">
      <h1 className="text-center mb-2">Ответ принят!</h1>
      <p className="text-center text-muted mb-4">
        Спасибо за ваш ответ. Вы можете вернуться на главную страницу или перейти в профиль.
      </p>
      <div className="d-flex gap-3">
        <Link href="/" className="btn btn-primary text-light">
          На главную
        </Link>
        <Link href="/profile" className="btn btn-outline-secondary">
          В профиль
        </Link>
      </div>
    </div>
  )

}
 
export default CompletedForm;