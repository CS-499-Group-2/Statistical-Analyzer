import {create} from "zustand"; 

// Also found this code here: https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
  const newColorScheme = event.matches ? "dark" : "light";
  useThemeStore.setState({ isDark: newColorScheme === "dark" });
});

export interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>(set => ({
  isDark: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches, // I found this code here: https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
  toggleTheme: () => set(state => ({ isDark: !state.isDark })),
  setTheme: (isDark: boolean) => set({ isDark }),
}));