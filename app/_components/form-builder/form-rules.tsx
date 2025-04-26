const FormRules = () => {
  return ( 
    <div className="mb-4" role="alert">
      <h5 className="alert-heading">Прежде чем создать форму:</h5>
      <ul className="mb-0">
        <li>Название и описание формы обязательны для заполнения.</li>
        <li>Форма должна содержать хотя бы <strong>один обязательный вопрос</strong>.</li>
        <li>Вопросы без заголовка <strong>не будут сохранены</strong>.</li>
        <li>Для типа ответа <code>select one</code> (чекбокс) должно быть минимум <strong>2 непустых варианта ответа</strong>.</li>
        <li>Пустые поля ответа автоматически <strong>удаляются</strong>.</li>
      </ul>
    </div>
  );
}
 // todo: добавить перевод
export default FormRules;