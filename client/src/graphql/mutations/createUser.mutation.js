//  step 1
import {commitMutation, graphql} from 'react-relay';
import environment from '../../Environment';

//  step 2
const mutation = graphql`
    mutation {
        createUser(user:$UserInput){
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
            mutation,
            variables,
            //  step 6
            onCompleted: () => {
                callback();
            },
            onError: err => console.error(err)
        }
    )
}