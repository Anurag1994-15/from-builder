import React, { useState, useEffect } from 'react';
import './App.css';
import { Form, TextField, SelectField, SubmitButton,NumberField,DatePickerField } from './components/FormElements';
import * as Yup from 'yup';


const formSchema = {
    name: {
        type: "text",
        label: "Full Name",
        required: true
    },
    phoneNumber: {
      type: "number",
      label: "Phone Number",
      required: true
  },
  dob: {
    type: "date",
    label: "DOB",
    required: true
},
    email: {
        type: "email",
        label: "Email",
        required: true
    },
    role: {
        type: "select",
        label: "Role",
        required: true,
        options: [
            {
                label: "Admin",
                value: "admin"
            },
            {
                label: "User",
                value: "user"
            }
        ]
    }
}

function App() {
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});

    useEffect(() => {   
        initForm(formSchema);
    }, []);

    const initForm = (formSchema) => {
        let _formData = {};
        let _validationSchema = {};

        for(var key of Object.keys(formSchema)){
            _formData[key] = "";

            if(formSchema[key].type === "text"){
                _validationSchema[key] = Yup.string();
            }else if(formSchema[key].type === "email"){
                _validationSchema[key] = Yup.string().email()
            }else if(formSchema[key].type === "select"){
                _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
            }
            else if(formSchema[key].type === "number"){
              _validationSchema[key] = Yup.string().length(10,"max 10 digit");
          }
          else if(formSchema[key].type === "date"){
            _validationSchema[key] = Yup.date().nullable()
            .test('dob', 'Should be greater than 18', function (value, ctx) {
              const dob = new Date(value);
              const validDate = new Date();
              const valid = validDate.getFullYear() - dob.getFullYear() >= 18;
              return !valid ? ctx.createError() : valid; 
            })
            .required('Required')
        }
            if(formSchema[key].required){
                _validationSchema[key] = _validationSchema[key].required('This field is required');
            }
        }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

    const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementName,
            label: elementSchema.label,
            options: elementSchema.options
        };

        if (elementSchema.type === "text" || elementSchema.type === "email") {
            return <TextField {...props} />
        }

        if (elementSchema.type === "select") {
            return <SelectField  {...props} />
        }

        if (elementSchema.type === "number") {
          return <NumberField  {...props} />
      }
      if (elementSchema.type === "date") {
      return <DatePickerField name="date" {...props} />
    }

    }

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        console.log(values);
        setSubmitting(false);
    }

    return (
        <div className="App">
            <Form
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                {Object.keys(formSchema).map( (key, ind) => (
                    <div key={key}>
                        {getFormElement(key, formSchema[key])}
                    </div>
                ))}
<SubmitButton
              title="Submit"
            />
            </Form>
        </div>
    );
}

export default App;