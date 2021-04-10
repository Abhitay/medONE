export default function validateInfo(values, OTPvalues) {
    let errors = {}

    if (!values.Pharmacy_name.trim()) {
        errors.Pharmacy_name = "Pharmacy name required";
    }

    if(!values.Email) {
        errors.Email = "Email required";
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)){
        errors.Email = "Email address is invalid";
    }

    if(!values.Password) {
        errors.Password = "Password is required";
    } else if(values.Password.length < 6){
        errors.Password = "Password needs to be 6 characters or more";
    }

    if(!values.Password2) {
        errors.Password2 = "Password is required";
    } else if (values.Password2 !== values.Password){
        errors.Password2 = "Passwords do not match";
    }

    if(!values.Address) {
        errors.Address = "Address is required";
    }

    if(!values.Phone_no) {
        errors.Phone_no = "Phone number is required";
    } else if(values.Phone_no.length < 10) {
        errors.Phone_no = "Phone number is invalid";
    }

    if(OTPvalues.OTP != 0 && values.otp != OTPvalues.OTP){
        errors.otp = "Wrong OTP";
    }

    return errors;
}