import { ErrorMessage, Field } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput(props) {
  const { label, name, ...rest } = props;

  return (
    <div className="form-group form-focus">
      <label className="focus-label" htmlFor={name}>
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { value } = field;
          const { setFieldValue } = form;
          return (
            <DatePicker
              className="form-control floating"
              autoComplete="off"
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              dateFormat={
                rest.showTimeSelect ? 'dd/MM/yyyy - HH:mm' : 'dd/MM/yyyy'
              }
              timeIntervals={30}
            />
          );
        }}
      </Field>
      <ErrorMessage component="span" className="error" name={name} />
    </div>
  );
}
