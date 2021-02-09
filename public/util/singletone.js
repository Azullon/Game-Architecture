export default function singletone(name, constructor) {
  if (!window['__singletones']) window['__singletones'] = {}
  if (!window['__singletones'][name])
    window['__singletones'][name] = constructor()
}
