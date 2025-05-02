'use client'
import { useState } from "react";
import IAdd from "../icons/add-icon";
import IClose from "../icons/close-icon";
import Subtitle from "../UI/subtitle";
import TagItem from "./tag-item";
import { useTranslations } from "next-intl";
import { useFormBuilder } from "@/app/context/form-builder-context";



const TagsComponent = () => {
  const { tags, setTags } = useFormBuilder()
  const [tagValue, setTagValue] = useState('')
  const t = useTranslations()

  const handleAddTag = (tag: string) => {
    if(tagValue.trim().length < 1) return
    setTags(prev => new Set([...prev, tag]))
    setTagValue('')
  }
  const handleRemoveTag = (tag: string) => {
    setTags(prev => {
      const newSet = new Set(prev);
      newSet.delete(tag);
      return newSet;
    })
  }
  const handleRemoveAll = () => {
    setTags(prev =>  new Set([]))
  }

  return (  
    <div className="">
      <Subtitle label={t('formBuilder.addTags')}/>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder={t('formBuilder.addTagsHint')}
          value={tagValue}
          onChange={e => setTagValue(prev => e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleAddTag(tagValue)
            }
          }}
        />
        <span 
          className="input-group-text cursor-pointer" 
          role="button"
          onClick={() => handleAddTag(tagValue)}
        >
          <IAdd/>
        </span>
        <span 
          className="input-group-text cursor-pointer" 
          role="button"
          onClick={() => setTagValue('')}
        >
          <IClose/>
        </span>
      </div>
      {tags.size > 0 && (
        <>
          <div className="d-flex flex-wrap gap-2">
            {Array.from(tags).map(tag => (
              <TagItem
              key={`tag-${tag}`} 
              label={tag}
              handleDelete={handleRemoveTag}
              />
            ))}
          </div>
          <div 
            className="
            mt-2
            align-self-center d-inline-block
            cursor-pointer text-danger
            "
            onClick={handleRemoveAll}
            >
            Delete all tags
          </div>
        </>
      )}
    </div>
  )
}
 
export default TagsComponent;