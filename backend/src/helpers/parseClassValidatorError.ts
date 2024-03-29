// errors [
//     ValidationError {
//       target: Book { title: 'qs', description: 'qs', author: undefined },
//       value: 'qs',
//       property: 'description',
//       children: [],
//       constraints: { minLength: 'Description is too short' }
//     }
//   ]

import { ValidationError } from "class-validator"

//We choose to only return the first error
export const parseError = (errors: ValidationError[]) => {
  //No errors
  if (!(errors.length > 0)) return false

  const message = errors[0].constraints
    ? errors[0].constraints[Object.keys(errors[0].constraints)[0]]
    : "Something went wrong"

  return {
    field: errors[0].property,
    message
  };
};
