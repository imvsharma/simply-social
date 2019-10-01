//  step 1
import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";
import environment from "../Environment";

//  step 2
const mutation = graphql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export default user => {
    return new Promise( (resolve, reject) => {
        const {email, password} = user;
        const variables = {
            email,
            password
        };

        commitMutation(
            environment,
            {
                mutation,
                variables,
                onCompleted: (res, err) => {
                    if(err) {
                        console.error('Error in onCompleted in loginMutation ---->', err);
                        return reject(err);
                    }
                    console.log('loginMutation response in OnCompleted', res);
                    resolve(res);
                },
                onError: err => {
                    console.error('Error in onError in loginMutation ---->', err);
                }
            })
    } )
}
