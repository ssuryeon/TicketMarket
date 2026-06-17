import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
    email: string,
    nickname: string,
    token: string,
    wallet_address: string,
    signUp: (email: string, nickname: string, token: string, wallet_address: string) => void,
    logOut: () => void,
}

export const userStore = create<IUser>()(
    persist(
        (set) => ({
            email: '',
            nickname: '',
            token: '',
            wallet_address: '',
            signUp: (email: string, nickname: string, token: string, wallet_address: string) => set({
                email,
                nickname,
                token,
                wallet_address,
            }),
            logOut: () => set({
                token: '',
            })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
