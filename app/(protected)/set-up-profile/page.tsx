import React from 'react'
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card'
import { Input} from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import SetUpProfileBtn from '@/components/dashboard/set-up-profile-btn'

const SetUpProfilePage = async () => {
  return (
    <div className='flex justify-center items-center h-screen'>

        <Card className='max-w-[600px] w-full'>
            <CardHeader>
                <CardTitle className='font-bold text-2xl'>Set Up Your Profile</CardTitle>
                <CardDescription>Please complete the fields below before proceeding.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action="" className='flex flex-col gap-4'>
                    
                    <div className="flex flex-col gap-1">
                        <Label>Username</Label>
                        <Input type='text' name='username' className='w-full' placeholder='Enter your new username' required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label>Bio (optional)</Label>
                        <Textarea name='bio' className='w-full' placeholder='Add your short bio' />
                    </div>

                    <SetUpProfileBtn />

                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default SetUpProfilePage