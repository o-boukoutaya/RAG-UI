// Pinia store (JavaScript)
import { defineStore } from 'pinia'

// Définition du store 'theme' : clair par défaut, sombre si l'utilisateur a choisi 'dark' (bouton toggle)
export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: localStorage.getItem('theme') === 'dark'
  }),
  actions: {
    toggle () {
      this.dark = !this.dark // inverse le thème
      localStorage.setItem('theme', this.dark ? 'dark' : 'light') // sauvegarde le choix dans le localStorage
      // Met à jour la classe sur l'élément <html> pour appliquer le thème
      // if (this.dark) {
      //   document.documentElement.classList.add('dark')
      // } else {
      //   document.documentElement.classList.remove('dark')
      // }
    }
  }
})
