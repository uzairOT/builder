import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SUPPORTD_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const settingsSchema = yup.object().shape({
    name: yup.string().required(),
    project: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().matches(phoneRegExp, {message: 'Please enter valid Phone Number'}).required(),
    country: yup.string().required(),
    status: yup.string().required(),
    // image: yup.mixed().nullable().required().test("FILE_FORMAT", "Uploaded file has unsupported format.", (value)=> !value || (value && SUPPORTD_FORMATS.includes(value?.type))),
})