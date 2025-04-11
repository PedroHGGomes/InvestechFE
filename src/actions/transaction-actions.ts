import { redirect } from "next/navigation"

const API_URL = "http://localhost:8080/transactions"

interface TransactionFilters{
    page: number,
    size: number,
    sort: string,
    description?: string,
    startDate?: string,
    endDate?: string,
}

export async function getTransactions(filters: TransactionFilters) {
    //await new Promise(resolve => setTimeout(resolve, 2000))
    const params = new URLSearchParams(filters as any)
    const url = new URL(API_URL)
    url.search = params.toString()
    const response = await fetch(url.toString())
    const data = await response.json()
    return data
}




