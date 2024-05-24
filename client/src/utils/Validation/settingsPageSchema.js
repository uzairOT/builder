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
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required().test('passwords-match', 'Passwords must match', function(value) {
        return this.parent.password === value;
    }),
})
export const signupSchemea = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    company: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required().test('passwords-match', 'Passwords must match', function(value) {
        return this.parent.password === value;
    }),
})
export const unitSchema = yup.object().shape({
    label: yup.string().required(),

})
export const loginSchemea = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})