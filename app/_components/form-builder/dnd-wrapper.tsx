import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { QuestionType } from '@/types'
import QuestionItem from './question-item'
import IDrag from '../icons/drag-icon'

interface SortableQuestionItemProps {
  id: string;
  order: number;
  title: string;
  typeOfAnswer: QuestionType;
  required: boolean;
}

const SortableQuestionItem = ({
  id,
  order,
  title,
  typeOfAnswer,
  required,
}: SortableQuestionItemProps) => {
  const { attributes, listeners,isDragging,  setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    zIndex: isDragging ? 1000 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} className='position-relative cursor-default'>
      <div
          className="p-2 text-xl select-none position-absolute top-2 start-50 translate-middle cursor-pointer z-3"
          {...listeners}
        >
          <IDrag/>
        </div>
      <QuestionItem
        id={id}
        order={order}
        title={title}
        typeOfAnswer={typeOfAnswer}
        required={required}
      />
    </div>
  )
}

export default SortableQuestionItem
