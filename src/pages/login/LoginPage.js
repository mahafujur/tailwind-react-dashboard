import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import UserManager from "../../auth/UserManager";
import {homePageUrl} from "../../routes/routeUrls";
import {useFormik} from "formik";
import Warning from "../../utils/notification/Warning";
import peopleIcon from "../../icons/people.svg";
import passwordIcon from "../../icons/passwrod.svg";
import ApiContainer  from "../../apis/auth";
import CustomLoader from "../../components/Loader/customLoader";
import Logo from "../../icons/logo.svg";

const title="   This is a sign in page,hurrray,yahoo,yahoo ";

const validate = values => {
    const errors = {};
    const {username, password} = values;
    if (!password) {
        errors.password = 'Write strong password';
    }
    if (!username) {
        errors.email = 'Write your username';
    }
    return errors;
};

export default function LoginPage(props) {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    let user = UserManager.getLoggedInUser();


    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            UserManager.removeLoggedInUser()
            setLoading(true);
            ApiContainer.login(values)
                .then(response => {
                    if (!response.ok) {
                        Swal.fire({
                            title: "Login Request Failed",
                            text: response.data.msg,
                            confirmButtonColor: '#ff8c00',
                            confirmButtonText: 'Back',
                        })
                    } else {
                        let tokens = response.data;
                        UserManager.setLoggedInUserToken('access-token', tokens.access_token,30)  //set 15 min exp time (remove 30)
                        UserManager.setLoggedInUserToken('refresh_token', tokens.refresh_token, 30)
                        UserManager.setLoggedInUser({name: values.username});
                        redirectAfterLogin(user);
                    }
                })
                .catch(err => {
                    console.log(err)
                    Swal.fire('Error', err.msg, 'error');
                })
                .finally(() => {
                    setLoading(false)
                });

        }
    });

    function redirectAfterLogin(user) {
        history.push(homePageUrl);
    }

    if (user) {
        redirectAfterLogin(user);
        return <></>
    }

    return (
        <div>
            {loading && <CustomLoader />  }
            <div className=" flex items-center justify-center h-screen bg-gray-50">

                <form onSubmit={formik.handleSubmit}>
                        <div  className=" max-w-lg items-center justify-center mx-auto  ">

                            <div  className="border-2 p-4">

                                <div className="flex-cols md:flex justify-between mt-8 mb-16">
                                    <h4 className="break-words text-2xl flex items-center mx-4 text-center ">
                                        {title}
                                    </h4>
                                   <div className="flex  items-center mx-auto">
                                  <img
                                        src={Logo}
                                        className="w-48  h-auto mx-auto "/>
                                   </div>


                                </div>

                                <div className="w-full">
                                    <div
                                        className="bg-gray-200 relative text-gray-600 focus-within:text-gray-400">
                  <span
                      className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <div className="p-1 focus:outline-none focus:shadow-outline"
                         tabIndex="-1">

                      <img src={peopleIcon}  className="w-6  h-6 "/>
                    </div>
                  </span>
                                        <input type="text"
                                               onChange={formik.handleChange}
                                               value={formik.values.username}
                                               className="border-2 py-2 w-full text-sm text-black bg-white rounded-md pl-12 focus:outline-none focus:bg-white focus:text-gray-900"
                                               name="username"
                                               id="username"
                                               placeholder="Enter your username"
                                               autoComplete="off"/>
                                    </div>
                                    {formik.touched.username && formik.errors.username && (
                                        <Warning
                                            message={formik.errors.username}/>)}
                                </div>
                                <div className="w-full pt-4">

                                    <div
                                        className="relative  bg-gray-200 text-gray-600 focus-within:text-gray-400">
                  <span
                      className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <div className="p-1 focus:outline-none focus:shadow-outline"
                         tabIndex="-1">
                      <img src={passwordIcon} className="w-6  h-6 "/>
                    </div>
                  </span>
                                        <input type="password"
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               value={formik.values.password}
                                               className="border-2 py-2 w-full text-sm text-black bg-white rounded-md pl-12 focus:outline-none focus:bg-white focus:text-gray-900"
                                               name="password"
                                               id="password"
                                               aria-describedby="sign-in-password"
                                               placeholder="Enter your password"/>
                                    </div>

                                    {formik.touched.password && formik.errors.password && (
                                        <Warning
                                            message={formik.errors.password}/>)}
                                </div>


                                <div
                                    className="text-center items-center justify-center mb-16">
                                    <button
                                        type="submit"
                                        className="focus:outline-none w-full mt-8  py-1.5  border text-gray-800 hover:text-white uppercase hover:bg-site-theme text-white text-lg hover:shadow-xl ">
                                 Login
                                    </button>
                                </div>
                            </div>


                        </div>


                </form>
            </div>


        </div>
    )

}
