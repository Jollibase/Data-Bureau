import { useLoaderData } from 'react-router-dom'

export const AuthDashboardLayout = () => {
  const data = useLoaderData()

  console.log(data)

  return (
    <div style={{ background: 'blue', height: '100vh', width: '100px' }}>
      asdjsjd
    </div>
  )
}
