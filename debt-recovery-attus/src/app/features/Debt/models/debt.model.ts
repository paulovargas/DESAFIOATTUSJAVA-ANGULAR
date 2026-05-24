import { Client } from "../../Client/models/client.model"
import { Debtor } from "../../Debtor/models/debtor.model"

export interface Debt {
    id: number
    description: string
    amount: number
    dueDate: string
    status: string
    client: Client
    debtor: Debtor
}