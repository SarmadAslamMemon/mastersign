import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/hooks/useSupabase'
import { useToast } from '@/hooks/use-toast'
import { LogOut, User, Mail, Building } from 'lucide-react'

export default function UserProfile() {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setSigningOut(true)
      const { error } = await signOut()
      
      if (error) {
        toast({
          title: 'Sign Out Failed',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Signed Out',
          description: 'You have been successfully signed out.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while signing out.',
        variant: 'destructive',
      })
    } finally {
      setSigningOut(false)
    }
  }

  if (!user) {
    return null
  }

  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
              {getUserInitials(user.email || '')}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>
          Manage your account and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <User className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500">Full Name</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user.email}
              </p>
              <p className="text-xs text-gray-500">Email Address</p>
            </div>
          </div>
          
          {user.user_metadata?.company && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Building className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {user.user_metadata.company}
                </p>
                <p className="text-xs text-gray-500">Company</p>
              </div>
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleSignOut}
          disabled={signingOut}
          variant="outline"
          className="w-full"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {signingOut ? 'Signing Out...' : 'Sign Out'}
        </Button>
      </CardContent>
    </Card>
  )
}
