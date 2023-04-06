import { create } from "zustand";
import { User } from "firebase/auth";

interface UserStore {
  user?: User,
  setUser: (user: User) => void,
}

const useUserStore = create<UserStore>()((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
}));

export default useUserStore;