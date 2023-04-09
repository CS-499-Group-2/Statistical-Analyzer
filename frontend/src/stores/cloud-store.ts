import { create } from "zustand";
import { User } from "firebase/auth";

interface CloudStore {
  user: User | undefined,
  setUser: (user: User) => void,
  activeFile: string | undefined,
  setActiveFile: (file: string) => void,
}

const useCloudStore = create<CloudStore>()((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
  activeFile: undefined,
  setActiveFile: (file: string) => set({ activeFile: file })
}));

export default useCloudStore;