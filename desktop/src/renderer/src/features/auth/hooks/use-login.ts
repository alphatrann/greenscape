import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useUserStore } from '@renderer/features/users/store'
import { redirect, useSearchParams } from 'react-router-dom'
import { login } from '../api'

const formSchema = z.object({
  email: z.email({ error: 'Please provide a valid email' }),
  password: z.string().min(1, { error: 'Password must not be empty' })
})

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
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
      setCurrentUser(data)
      form.reset()
      toast.success('Login successfully')
      setTimeout(() => redirect(searchParams.get('callback') ?? '/'), 1000)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { form, loading, handleSubmit: form.handleSubmit(onSubmit) }
}
