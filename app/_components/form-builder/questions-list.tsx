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
  const { questionsForm, setQuestionsForm } = useFormBuilder()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = questionsForm.findIndex((q) => q.id === active.id)
      const newIndex = questionsForm.findIndex((q) => q.id === over?.id)
      setQuestionsForm((questions) => arrayMove(questions, oldIndex, newIndex))
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {questionsForm.length === 0 ? (
        <div className="text-gray-500">Add first question</div>
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
              {questionsForm.map((question, index) => (
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
