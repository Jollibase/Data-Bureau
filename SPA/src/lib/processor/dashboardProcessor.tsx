export type dashboard = {
  id: string
  name: string
  settings: object
  owner: string
  sharee: string
  created: string
  updated: string
}

export const dashboardListProcessor = (data: dashboard[]) => {
  return data.map(item => {
    let created = new Date(item.created)
    let updated = new Date(item.updated)
    return {
      ...item,
      owner: item.sharee ? item.owner : 'Me✨',
      created: created.toDateString(),
      updated: updated.toDateString(),
    }
  })
}
