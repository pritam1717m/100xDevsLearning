// interface User {
//   name: string;
//   age: number;
// }

// function sumOfAge(user1: User, user2: User) {
//   return user1.age + user2.age;
// }

// const age = sumOfAge(
//     {
//         name : "Pritam",
//         age : 22
//     },
//     {
//         name : "Santam",
//         age : 16
//     }
// );

// console.log(age)

//----------------------------------------------------------------------

// interface User {
//     id: string;
//     name : string;
//     age : number;
//     email : string;
//     password : string;
// }

// // interface UpdateProps {
// //     name : string;
// //     age : number;
// //     password: string;
// // }

// // Use Pick API -- allows to create new type by selecting a set of properties from a existing tyype or interface

// type UpdateProps = Pick<User, 'name' | 'age' | 'email'>

// function updateUser(updateProps : UpdateProps) {
//     // hit database to update the user
// }

//--------------------------------------------------------------------------

// interface User {
//     id: string;
//     name: string;
//     age: number;
//     email: string;
//     password: string;
// }

// // interface UpdateProps {
// //     name?: string;
// //     age?: number;
// //     email?:string;
// // }

// type UpdateProps = Pick<User, 'name' | 'age' | 'password'>;

// //Use Partial API -- Helps to make property optional of a type
// type UpdatePropsOptional = Partial<UpdateProps>;

// function updateUser (updateProps : UpdatePropsOptional){
//     // hit backend server to update the user
// }

//-------------------------------------------------------------------------

// type User = {
//     readonly id : string
//     name: string;
//     age: number;
//     readonly email : string;
//     password : string;
// }

// const user: Readonly<User> = {
//     id : "1",
//     name : "Pritam",
//     age: 22,
//     email : "pritam123@gmail.com",
//     password : "Pritam@123"
// }

// user.age = 21 // Can't do that becaues of the readonly API

//-----------------------------------------------------------------------------

// interface User {
//     id : string;
//     name: string;
// }

// // type Users = {[key : string]: User}

// // Use Record

// type Users = Record<string, User>

// const users:Users = {
//     'wer@dsf' : {
//         id : "wer@dsf",
//         name : "Pritam"
//     },
//     "sfs@hfg" : {
//         id : "sfs@hfg",
//         name : "Santam"
//     },
// }

// console.log(users["wer@dsf"])

//--------------------------------------------------------------------------

// interface User {
//     id : string;
//     name: string;
// }

// const users = new Map<string, User>();

// users.set('adsds@1', {id : "adsds@1", name: "Pritam"});
// users.set('adsds@2', {id : "adsds@2", name: "Santam"});

// console.log(users.get("adsds@2"));

//---------------------------------------------------------------------------

// type Events = 'click' | 'scroll' | 'mousemove';

// type excludeProp = Exclude<Events, 'scroll'>

// const handleEvent = (event : excludeProp) => {
//     console.log(event)
// }

// handleEvent('click')
// //handleEvent('scroll') // Error: Argument of type '"scroll"' is not assignable to parameter of type 'excludeProp'

//---------------------------------------------------------------------------

import {z} from 'zod'
import express, { json } from 'express'

const app = express();
app.use(express.json());

const userProfileSchema = z.object({
    name: z.string().min(1, {message : "Name can't be empty"}),
    email: z.string().email({message : "invalid Email Address"}),
    age: z.string().min(18, {message: "You must at least 18 years old"}).optional(),
})

// type UpdateProfile = {
//     name: string;
//     email: string;
//     age?: string;
// }

app.put("/user", (req, res) => {
    const {success} = userProfileSchema.safeParse(req.body);

    if(!success){
        res.status(401).json({});
        return;
    }

    type UpdateProfile = z.infer<typeof userProfileSchema>
    const updatedUser : UpdateProfile = req.body;

    res.json({
        message : "User Updated"
    })
})

app.listen(3000, () => {
    console.log("Server is started on PORT 3000.")
})