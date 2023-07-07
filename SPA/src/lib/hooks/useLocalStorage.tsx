export const useLocalStorage = () => {
  return (name: string, data?: string | number | object) => {
    if (data) {
      localStorage.setItem(name, JSON.stringify(data))
    }
    return {
      results: data || JSON.parse(localStorage.getItem(name) as string),
    }
  }
}
