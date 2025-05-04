import yup from 'yup';

const registerValidation = (data: any) =>{
const schema = yup.object({
    name: yup.string()
    .min(3)
    .required(),

    email: yup.string()
    .email()
    .min(6)
    .required(),

    password: yup.string()
    .min(6)
    .required()
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")

})

return schema.validate(data)
}


const loginValidation = (data: any) =>{
    const schema = yup.object({
        email: yup.string()
        .email()
        .required(),

        password: yup.string()
        .min(6)
        .required()
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    })

    return schema.validate(data)
}


export {
    registerValidation, 
    loginValidation
}