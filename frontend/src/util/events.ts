import { Events } from '/src/hooks/useEvent'

export const dispatchCustomEvent = <T extends keyof Events>(name: string, detail: Events[T]) => {
  document.dispatchEvent(new CustomEvent(name, { detail }))
}
