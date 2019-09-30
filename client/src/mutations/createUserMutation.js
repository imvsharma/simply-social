//  step 1
import graphql from 'babel-plugin-relay/macro';
import {commitMutation} from 'react-relay';
import environment from '../Environment';

//  step 2
const createUserMutation = graphql`
    mutation createUserMutation($User: UserInput) {
        createUser(user: $User) {
            email
            _id
        }
    }
`

//  step 3
export default (user, callback) => {
    const {firstname, lastname, email, password} = user;
    //  step 4
    const variables = {
        user: {
            firstname,
            lastname,
            email,
            password
        }
    };

    //  step 6
    commitMutation(
        environment,
        {
            createUserMutation,
            variables,
            //  step 6
            onCompleted: () => {
                callback();
            },
            onError: err => {
                console.error("Error--------------------->", err);
            }
        }
    )
}

