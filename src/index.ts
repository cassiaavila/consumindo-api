import {Data} from "./data/data-type";
import * as dotenv from "dotenv";

dotenv.config();

async function login(username: string, password: string) {

    const response = await fetch(process.env.API_URL + `login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao fazer login: ${response.status} - ${response.statusText}. Detalhes: ${errorMessage}`);
    }
    const data = await response.json();
    return data;

}

async function listInvoices(filter: Data.Filter, token: string) {
    const queryString = new URLSearchParams(filter as any).toString();
    const url = `${process.env.API_URL}invoices?${queryString}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao trazer lista de invoice: ${response.status} - ${response.statusText}. Detalhes: ${errorMessage}`);
    }

    const data = await response.json();
    return data;

}


async function main() {
    try {
        const auth: Data.Token = await login(process.env.EMAIL!, process.env.PASSWORD!);
        const result: Data.Result = await listInvoices({limit: 10, offset: 0}, auth.token)
        console.log(result.data?.map((invoice) => invoice.fileName));
    } catch (e) {
        console.error(e);
    }

}

main()






