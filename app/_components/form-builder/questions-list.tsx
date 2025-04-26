'use client'

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useFormBuilder } from "../../context/form-builder-context";
import SortableQuestionItem from './dnd-wrapper';

export const QuestionsList = () => {
  const { questionsForm, setQuestionsForm, isSubmitting } = useFormBuilder()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )
  const handleDragEnd = (event: any) => {
    if(isSubmitting) return
    
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = questionsForm.findIndex((q) => q.id === active.id)
      const newIndex = questionsForm.findIndex((q) => q.id === over?.id)
      setQuestionsForm((questions) => arrayMove(questions, oldIndex, newIndex))
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {questionsForm.length === 0 ? (
        <div className="text-center  fs-5 my-3 fw-semibold text-secondary">Add first question</div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={questionsForm.map((q) => q.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-4">
              {questionsForm.sort((a, b) => Number(a.id) - Number(b.id)).map((question, index) => (
                <SortableQuestionItem
                  key={question.id}
                  id={question.id}
                  order={index + 1}
                  title={question.title}
                  typeOfAnswer={question.typeOfAnswer}
                  required={question.required}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
