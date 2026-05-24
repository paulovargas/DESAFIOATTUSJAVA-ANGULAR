export interface Debtor {
id: number
name: string
cpfCnpj: string
email: string
phone: string
billingStreet: string
billingNumber: string
billingDistrict: string
billingCity: string
billingState: string
billingZipCode: string
debts?: []
}
