export type ContactInfo = {
    fullName: string
    email: string
    phone: string
    homePhone: string
    address: string
}

export type RegisterFormInput = {
    email: string
    password: string
    firstName: string
    lastName: string
}

export type PersonalInfo = {
    gender: 'male' | 'female'
    birthDate: string
    patientId: string
    nationality: string
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed'
    emergencyContact: string
}

export type InsuranceInfo = {
    memberId: string
    insuranceProvider: string
}

export type ContactChannel = 'email' | 'mobilePhone' | 'mail'
export type ContactPreferences = Record<ContactChannel, boolean>

export type UserProfile = {
    uid: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
    contactInfo?: ContactInfo
    personalInfo?: PersonalInfo
    insuranceInfo?: InsuranceInfo
    contactPreferences?: ContactPreferences
}