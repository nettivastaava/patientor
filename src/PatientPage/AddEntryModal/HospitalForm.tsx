import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { Props } from "./AddEntryForm";
import { TextField, DiagnosisSelection } from '../../AddPatientModal/FormField';
import { useStateValue } from '../../state';

const HospitalForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }, ] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        }
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

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="MM-DD-YYYY"
              name="date"
              component={TextField}
            />
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
            <Field
              label="Discharge date"
              placeholder="Discharge date (MM-DD-YYYY)"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <DiagnosisSelection 
              diagnoses={diagnoses}
              setFieldValue={setFieldValue} 
              setFieldTouched={setFieldTouched}
            />
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

export default HospitalForm;