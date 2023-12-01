import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Form,
  TextField,
  SelectField,
  SubmitButton,
  NumberField,
  DatePickerField,
} from "./components/FormElements";
import { useFormik, Field, FormikProvider } from "formik";

function Test() {

    const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
});

  return (
    <div className="Test">
      <h1>Form-Builder reusable test</h1>
      <FormikProvider value={formik}>
        <TextField
          label="Last Name"
          name="lastname"
          placeholder="your lastname"
        />
      </FormikProvider>
    </div>
  );
}

export default Test;
