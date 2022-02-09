function registerValidation(name, email, password) {
   const errors = {}

   if(name.trim() === ""){
      errors.name = "Name must not be empty"
   }

   if(email.trim() === ""){
      errors.email = "Email must not be empty"
   } else{
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      if(!email.match(regEx)){
         errors.email = 'Email is not valid'
      }
   }

   if(password.trim() === ""){
      errors.password = "Password must not be empty"
   } else{
      if(password.length <= 4) return errors.password = "Password is weak"
   }

   return{
      errors,
      valid: Object.keys(errors).length < 1
   }
}

function loginValidation(email, password) {
   const errors = {}

   if(email.trim() === ""){
      errors.email = "Email must not be empty"
   } else{
      const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      if(!email.match(regEx)){
         errors.email = 'Email is not valid'
      }
   }

   if(password.trim() === ""){
      errors.password = "Password must not be empty"
   } else{
      if(password.length <= 4) return errors.password = "Password is weak"
   }

   return{
      errors,
      valid: Object.keys(errors).length < 1
   }
}

export {
   registerValidation,
   loginValidation
}