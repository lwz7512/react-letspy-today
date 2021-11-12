export const addEffect = (targetClass, effectClass) => {
  document.querySelector(targetClass).classList.add(effectClass)
}

export const removeEffect = (targetClass, effectClass) => {
  document.querySelector(targetClass).classList.remove(effectClass)
}