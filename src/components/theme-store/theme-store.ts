import {create} from "zustand"; 


export interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore> ((set)=> ({
  isDark : true,
  toggleTheme: () => set((state) => ({isDark: !state.isDark})),
}));