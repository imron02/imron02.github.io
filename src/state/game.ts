import { atom } from "nanostores";

export type GameSection = "home" | "about" | "projects" | "skills" | "experience" | "contact";

export const $section = atom<GameSection>("home");
export const $selectedProject = atom<string | null>(null);
export const $progress = atom(0);
export const $isLoading = atom(true);

export const gameActions = {
  goTo(section: GameSection): void {
    $section.set(section);
    $selectedProject.set(null);
  },

  selectProject(id: string): void {
    $selectedProject.set(id);
    $section.set("projects");
  },

  clearProject(): void {
    $selectedProject.set(null);
  },

  setProgress(value: number): void {
    $progress.set(Math.min(1, Math.max(0, value)));
  },

  finishLoading(): void {
    $progress.set(1);
    $isLoading.set(false);
  },
};
