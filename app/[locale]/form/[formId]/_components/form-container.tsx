'use client'
import { useLocale } from "@/app/context/locale-context";
import FormTabs from "./form-tabs";
import Link from "next/link";

const FormContainer = () => {
  const locale = useLocale()
  return (  
    <div className="container mt-4">
      <FormTabs/>
      <div className="mt-4">
        <h2 className="">Title of the test</h2>
        <div className="fw-medium text-body-tertiary">by Valentin Kim</div>
        <p className="mt-2">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Link className="btn btn-lg btn-primary text-white" href={`/${locale}/fill-form/14124`}>Start</Link>


        <div className="text-primary mt-4">213 likes</div>
        <div className="mt-2 d-flex flex-column gap-3">
          <h3 className="">Comments</h3>
          <div className="card">
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>A well-known quote, contained in a blockquote element.</p>
                <footer className="blockquote-footer">Valentin Kim</footer>
              </blockquote>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>A well-known quote, contained in a blockquote element.</p>
                <footer className="blockquote-footer">Valentin Kim</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default FormContainer;