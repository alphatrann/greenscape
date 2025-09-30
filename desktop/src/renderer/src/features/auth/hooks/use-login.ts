import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useUserStore } from '@renderer/features/users/store'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { login } from '../api'
import { AppRoute } from '@renderer/common/app-route'

const formSchema = z.object({
  email: z.email({ error: 'Please provide a valid email' }),
  password: z.string().min(1, { error: 'Password must not be empty' })
})

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const data = await login(values)
      await window.electronAPI.saveToken(data.accessToken)

      setCurrentUser(data.data)
      form.reset()
      toast.success('Login successfully')
      navigate(searchParams.get('callback') ?? AppRoute.Home)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) }
}
