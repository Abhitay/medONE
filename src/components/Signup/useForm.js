import { useState, useEffect } from "react";
import Axios from "axios";
import emailjs from 'emailjs-com';
Axios.defaults.withCredentials = true;

const useForm = (callback, validate, setText) => {
    let rand = 0;

    const min = 1000;
    const max = 9999;
    rand = min + Math.random() * (max - min);
    rand = Math.round(rand);


    const [values, setValues] = useState({
        Pharmacy_name: "",
        Email: "",
        Password: "",
        Password2: "",
        Address: "",
        Phone_no: "",
        otp: rand,
    });

    const [OTPvalues, setOTPValues] = useState({
        OTP: 0,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        // console.log(localStorage.getItem("username"));

        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values, OTPvalues));
        setIsSubmitting(true);
    };

    const verifyOTP = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setOTPValues({ ...OTPvalues, [name]: value });
        // console.log(OTPvalues.OTP);
    }

    const verifiedOTP = e => {
        e.preventDefault();
        setErrors(validate(values, OTPvalues))
        OTPvalues.OTP == values.otp ? (
            // Axios.post("http://localhost:3001/create", {
            //   Pharmacy_name: values.Pharmacy_name,
            //   Email: values.Email,
            //   Password: values.Password,
            //   Address: values.Address,
            //   Phone_no: values.Phone_no,
            // }).then(() => {
            //   console.log("Success!");
            // });
            Axios.post("http://localhost:3001/create", {
                Pharmacy_name: values.Pharmacy_name,
                Email: values.Email,
                Password: values.Password,
                Address: values.Address,
                Phone_no: values.Phone_no,
            })
                // .then(() => (callback()))
                .then((res) => {
                    // console.log("myError:", res.data);
                    if (res.data == "error") {
                        // console.log("yes");
                        setErrors({ dbError: "There was some problem, try again" });
                    }
                    else {
                        // console.log("oh yeah");
                        callback();
                    }
                })
        ) : (console.log("Error wrong otp"));
    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && isSubmitting) {
            // console.log(values.otp);
            // console.log("hi");

            //IMPPPPPPPPPPPPPPPPP

            emailjs.send('service_ommyfrm', 'template_0co12v4', values, 'user_nR6wZZ3yOzHNODELoiMGE')
                .then(function (response) {
                    // console.log('SUCCESS!', response.status, response.text);
                }, function (error) {
                    // console.log('FAILED...', error);
                });




            // Axios.post("http://localhost:3001/create", {
            //   Pharmacy_name: values.Pharmacy_name,
            //   Email: values.Email,
            //   Password: values.Password,
            //   Address: values.Address,
            //   Phone_no: values.Phone_no,
            // }).then(() => {
            //   console.log("Success!");
            // });
            // callback();
            setText();
        }
    }, [errors]);

    return { handleChange, values, handleSubmit, errors, OTPvalues, verifyOTP, verifiedOTP };
};

export default useForm;