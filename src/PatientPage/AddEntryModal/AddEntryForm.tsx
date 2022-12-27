import React from 'react';
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, DiagnosisSelection, TypeOption } from '../../AddPatientModal/FormField';
import { Entry } from '../../types';
import { useStateValue } from '../../state';


export type EntryFormValues = Omit<Entry, "id" | "type">;


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: TypeOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low risk" },
  { value: 2, label: "High risk" },
  { value: 3, label: "Critical risk"}
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props)  => {
  const [{ diagnoses }, ] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection 
              diagnoses={diagnoses}
              setFieldValue={setFieldValue} 
              setFieldTouched={setFieldTouched}
            />
            <SelectField label="Health check rating" name="healthCheckRating" options={healthCheckRatingOptions} />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;