// src/composables/useAppInit.ts
import { Theme } from "@/stores/System/themes"
import { Load } from "@/stores/Load/load"
import { ColorThemeStore } from "@/stores/System/colorTheme"

export async function initApp() {
  // Initialize the app
  const themeStore = Theme()
  const loadStore = Load()
  const colorStore = ColorThemeStore()
  
  // Set the loading state to true
  loadStore.loadScreen = true
  
  // Check if the user has a theme preference
  themeStore.detectSystemTheme()
  
  // Load custom colors
  colorStore.loadColors()

  // Simulate a loading time of 2 seconds
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 2000)
  })

  // Set the loading state to false
  loadStore.loadScreen = false
}
