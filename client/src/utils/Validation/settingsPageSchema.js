import { Password } from '@mui/icons-material';
import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SUPPORTD_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const settingsSchema = yup.object().shape({
    project: yup.string().required(),
    email: yup.string().email().required(),
    // image: yup.mixed().nullable().required().test("FILE_FORMAT", "Uploaded file has unsupported format.", (value)=> !value || (value && SUPPORTD_FORMATS.includes(value?.type))),
})
export const projectSchema = yup.object().shape({
    name: yup.string().required(),
    project: yup.string(),
    phoneNumber: yup.string().matches(phoneRegExp, {message: 'Please enter valid Phone Number'}),
    status: yup.string(),
    // image: yup.mixed().nullable().required().test("FILE_FORMAT", "Uploaded file has unsupported format.", (value)=> !value || (value && SUPPORTD_FORMATS.includes(value?.type))),
})
export const inviteSchemea = yup.object().shape({
    firstName: yup.string()
      .required('First name is required')
      .trim(),  // Optional: Trim whitespace for cleaner validation
    lastName: yup.string()
      .required('Last name is required')
      .trim(),
    email: yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),  // Enforce minimum password length
    confirmPassword: yup.string()
      .required('Confirm password is required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
  });
export const signupSchemea = yup.object().shape({
  firstName: yup.string()
    .required('First name is required')
    .trim(),  // Optional: Trim whitespace for cleaner validation
  lastName: yup.string()
    .required('Last name is required')
    .trim(),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  company: yup.string()
    .required('Company name is required')
    .trim(),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),  // Enforce minimum password length
  confirmPassword: yup.string()
    .required('Confirm password is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});
export const unitSchema = yup.object().shape({
    label: yup.string().required(),

})
export const loginSchemea = yup.object().shape({
    email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
    password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),  // Enforce minimum password length
})