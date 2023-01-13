import { Schema, model } from "mongoose";

export type Role = 'admin' | 'user'
export interface UserDoc {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    isVerified: boolean
    role: Role
}
export interface UserAttributes {
    firstName?: string
    lastName?: string
    email: string
    password: string
}

const userSchema = new Schema<UserDoc>(
    {
        firstName: {
            type: String,
            required: [true, 'firstName is a must!'],
            trim: true,
            maxlength: [30, 'firstName must be shorter than 30 characters'],
            minlength: [2, 'firstName must be longer than 2 characters']
        },
        lastName: {
            type: String,
            required: [true, 'lastName is a must!'],
            trim: true,
            maxlength: [30, 'lastName must be shorter than 30 characters'],
            minlength: [3, 'lastName must be longer than 2 characters']
        },
        email: {
            type: String,
            required: [true, 'email is a must!'],
            unique: true,
            lowercase: true,
            trim: true,
            validate: {
                validator: function (el: string) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el.toString())
                },
                message: "Please provide a valid email."
            }
        },
        password: {
            type: String,
            required: [true, 'password is a must!'],
            trim: true,
            minlength: [8, 'password must be longer than 8 characters']
        },
        isVerified: {
            type: Boolean,
            default: false //TODO: After the email service is constructed, change it to false
        },
        role: {
            type: String,
            required: true,
            default: 'user'
        }
    },
    {
        timestamps: true,
        toObject: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        },
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        }
    }
);

const User = model<UserDoc>('User', userSchema);

export { User }