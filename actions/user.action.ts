"use server"

import User from "../modals/user.modal"
import { connect } from "../db"

export async function createdUser(user: any) {
    try {
        await connect()
        const newUser = await User.create(user)
        console.log("User created successfully")
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}