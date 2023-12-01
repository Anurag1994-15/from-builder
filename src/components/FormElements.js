import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext,
  useField,
  useFormik,
} from "formik";
const formLabelStyle="col-sm-3 col-form-label";
const formFieldStyle="col-sm-6"

export function Form(props) {
  return (
    <Formik {...props}>
      <FormikForm className="needs-validation" novalidate="">
        {props.children}
      </FormikForm>
    </Formik>
  );
}

export function TextField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <>
      <div class="form-group row">
        {label && (
          <label class={formLabelStyle} for={name}>
            {label} : &nbsp;
          </label>
        )}
        <div class={formFieldStyle}>
          <Field
            className="form-control"
            type="text"
            name={name}
            id={name}
            placeholder={placeholder || `Enter ${name}...`}
            {...rest}
          />
        </div>
        <ErrorMessage
          name={name}
          render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
        />
      </div>
    </>
  );
}
export function NumberField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <>
      <div class="form-group row">
        {label && (
          <label class={formLabelStyle} for={name}>
            {label} : &nbsp;
          </label>
        )}
        <div class={formFieldStyle}>
          <Field
            className="form-control"
            type="number"
            name={name}
            id={name}
            placeholder={placeholder || "Enter Phone Number...."}
            {...rest}
          />
        </div>
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export function SelectField(props) {
  const { name, label, options } = props;
  return (
    <>
      <div class="form-group row">
        {label && (
          <label class={formLabelStyle} for={name}>
            {label} :&nbsp;
          </label>
        )}
        <div class={formFieldStyle}>
          <Field
            as="select"
            id={name}
            name={name}
            key={name}
            class="form-control"
          >
            <option value="">Select...</option>
            {options.map((optn, index) => (
              <option value={optn.value} label={optn.label || optn.value} />
            ))}
          </Field>
        </div>
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}
export function Checkbox(props) {
  const { name, label, placeholder, options, ...rest } = props;
  return (
    <>
      <div class="form-group row">
        {label && (
          <label class={formLabelStyle} for={name}>
            {label} : &nbsp;
          </label>
        )}
        <div class={formFieldStyle + " form-check"}>
          {options.map((optn, index) => (
            <label for={optn.value} class="form-check-label mx-3">
              <Field type="checkbox" name={optn.label} value={optn.value} id={optn.value} class="form-check-input"/>
              {optn.label}
            </label>
          ))}
        </div>
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
}

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  const { name, label } = props;

  return (
    <>
      <div class="form-group row">
        {label && (
          <label class={formLabelStyle} for={name}>
            {label} :&nbsp;
          </label>
        )}
        <div class={formFieldStyle}>
          <DatePicker
            id={name}
            placeholderText="Date of birth..."
            maxDate={new Date()}
            className="form-control"
            wrapperClassName="datepicker"
            selected={field.value || null}
            onChange={(val) => {
              setFieldValue(field.name, val);
            }}
          />
        </div>
      </div>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </>
  );
};

export function SubmitButton(props) {
  const { title, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <button
      type="submit"
      class="btn btn-outline-success"
      {...rest}
      disabled={isSubmitting}
    >
      {title}
    </button>
  );
}
