import { create } from "zustand";

interface IStore {
    isClicked: boolean,
    setIsClicked: (arg0:boolean) => void,
}

export const loginModalStore = create<IStore>((set) => ({
    isClicked: false,
    setIsClicked: (c:boolean) => set(() => ({isClicked: c}))
}))