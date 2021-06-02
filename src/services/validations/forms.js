import * as Yup from 'yup';

export const appointmentFormSchema = Yup.object({
  name: Yup.string().min(3).required('Preencha o Campo Corretamente'),
  birthday: Yup.date().required('Preencha o Campo Corretamente').nullable(),
  schedulingDate: Yup.date()
    .required('Preencha o Campo Corretamente')
    .nullable(),
});
