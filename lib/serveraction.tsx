'use server'

import prisma from "./db"


export const getProfile = async (userId: string) => {
   if (!userId) {
       return null
    }

    try {
        const profile = await prisma.user.findUnique({
            where: { clerkUserId: userId }
        })
        return profile
    }
    catch (e) {
        return null
    }
}


export const updateProfile = async (userId: string, data: any) => {
    return await prisma.user.update({
        where: { clerkUserId: userId },
        data
    })
}


export const getUsers=async ()=>{
    try{
        const users=await prisma.user.findMany()
        return users
    }
    catch(e){
        return null
    }
}


export const getCampaigns = async (userId: string) => {
    if (!userId) {
        return null
    }

    try {
        const campaigns = await prisma.user.findMany({
            where: { clerkUserId:userId },
            include: { campaigns: true}
        })
        return campaigns
    }
    catch (e) {
        return null
    }
}


