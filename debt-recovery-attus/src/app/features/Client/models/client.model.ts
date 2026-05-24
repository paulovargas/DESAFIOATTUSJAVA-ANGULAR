export interface Client {
    id: string
    companyName: string
    cnpj: string
    billingStreet: string
    billingNumber: string
    billingDistrict: string
    billingCity: string
    billingState: string
    billingZipCode: string
    email: string
    contactName: string
    phone: string
    debts?: []
}
