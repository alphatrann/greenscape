import { LoginForm } from '@renderer/features/auth/components/login-form'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/features/ui/card'
import { useUserGuard } from '../features/users/hooks/use-user-guard'

export default function LoginPage() {
  useUserGuard()
  return (
    <div className="flex h-full items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Log in to admin dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
