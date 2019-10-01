//  step 1
import graphql from 'babel-plugin-relay/macro';
import {commitMutation} from 'react-relay';
import environment from '../Environment';

//  step 2
const mutation = graphql`
    mutation createUserMutation($User: UserInput) {
        createUser(user: $User) {
            email
            _id
        }
    }
`

//  step 3

export default user => {
    return new Promise( (resolve, reject) => {
        const {firstname, lastname, email, password} = user;
        const variables = {
            User: {
                firstname,
                lastname,
                email,
                password,
            }
        };

        commitMutation(
            environment,
            {
                mutation,
                variables,
                onCompleted: (res, err) => {
                    if(err) {
                        console.error('Error in onCompleted in createUserMutation ---->', err);
                        return reject(err);
                    }
                    console.log('createUserMutation response n OnCompleted', res);
                    resolve(res);
                },
                onError: err => {
                    console.error('Error in onError in createUserMutation ---->', err);
                }
            })
    } )
}

/* export default (user, callback) => {
    const {firstname, lastname, email, password} = user;
    //  step 4
    const variables = {
        user: {
            firstname,
            lastname,
            email,
            password,
            clientMutationId:""
        }
    };
    console.log('variables', variables);
    //  step 6
    commitMutation(
        environment,
        {
            mutation,
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
 */
