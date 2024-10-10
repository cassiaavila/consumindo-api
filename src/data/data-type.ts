import {resolveAny} from "node:dns";

export namespace Data {
    export type Token = {
        token: string
        account: Account
    }

    export type Account = {
        id: string
        name: string
        username: string
        role: string
        isActive: boolean
        createdAt: Date
        updatedAt: Date
    }

    export type Filter = {
        search?: string
        isActive?: boolean
        limit: number
        offset: number
    }

    export type Invoice = {
        id: string
        note: string
        fileName: string
        status: string
        sourceCompanyId: string
        sourceCompany: any
        destinationPersonId: string
        destinationPerson: any
        createdAt: Date
        updatedAt: Date
        isActive: boolean

    }
    export type Result = {
        count: number
        offset: string
        limit: string
        data: Invoice[]


    }

}
