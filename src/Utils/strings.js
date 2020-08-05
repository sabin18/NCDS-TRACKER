const strings ={
    users:{
        success:{
            LOGIN_SUCCESS:'succesfully login',
            USER_ADDED:'user created successfully',
            SUCCESS_VERIFIED:'You have been verifiyed',
            SEND_EMAIL: 'please check your email to see the link for reseting password',
            PASSWORD_CHANGED: 'password changed successfully',
            ACTIVETED: 'user activate successfully',
            DISACTIVETED: 'user disactivate successfully',
            DELETED: 'user deleted successfully',
            },

        error:{
        USER_NOT_FOUND:'can not find user with that email',
        USER_NOT_EXIST:'user not found',  
        INCORRECT_PASSWORD:'incorrect password',
        UNVERIFIED: 'You are not verified ,verify first!',
        AUTHORIZED:`You don't have access to this page`,
        UNABLE_TO_PROCESS: 'Invalid token please sign again',
        SIGN_IN_FIRST: 'Please sign into the application first',
        USER_ALREADY_FOUND:'user with that email already exist',
        VERIFIED:'user already verified',
        PASSWORD_NOT_MATCH: 'Password and Confirm Password do not match',
        PASSWORD_ALREADY_EXISTS: 'you can not change password with old password',
        INVALID_TOKEN: 'Invalid token',
        EXPERED: 'Link expired request a new one',
        }
    },


    business:{
        success:{
            BUSINESS_ADDED:'pharmacy added successfully',

        },
        error:{
            BUSINESS_EXIT:'pharmacy with this name already exist',
            NO_ACCESS:"you don't have access to this pharmacy",
            BUSINESS_NOT_EXIST:"pharmacy doesn't exist",
        }
    },

    patient:{
        success:{
         PATIENT_CREATED:'patient added succefully',
         PATIENT_UPDATED:'patient updated succefully',
         PATIENT_DELETED:'patient deleted succefully',
        },
        error:{
            PATIENT_EXIT:'patient already exist',
            PATIENT_NOT_FOUND:"patient not found",
        }
    },

    record:{
        success:{
         RECORD_CREATED:'record saved succefully',
        },
        error:{
            RECORD_NOT_FOUND:'RECORD not found',
        }
    },

    payment:{
            success:{
             PAYMENT_CREATED:'payment saved succefully',
            },
            error:{
            NO_SUBSCRIPTION:"Your subscription has ended,Please contact service provider to renew your subscription"
            }  
    },
    medication:{
        success:{
         MEDICATION_CREATED:'medication saved succefully',
         MEDICATION_UPDATED:'medication updated succefully',
         MEDICATION_DELETED:'medication deleted succefully',
        },
        error:{
         MEDICATION_NOT_FOUND:'can not find  that medication',
         MEDICATION_ARLEARDY_EXIST:'medication already exist',
        }  
   },
   disease:{
    success:{
     DISEASE_CREATED:'disease saved succefully',
     DISEASE_UPDATED:'disease updated succefully',
     DISEASE_DELETED:'disease deleted succefully',
    },
    error:{
     DISEASE_NOT_FOUND:'can not find  that disease',
     DISEASE_ARLEARDY_EXIST:'disease already exist',
    }
},  
notifications:{
    error:{
     NOTIFICATION_NOT_FOUND:'notification not found',
    }  
}
}

export default strings