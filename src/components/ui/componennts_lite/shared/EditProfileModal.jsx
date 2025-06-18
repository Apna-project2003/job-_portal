import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog'
import { Label } from '../../label'

const EditProfileModal = ({open,setOpen}) => {
  return (
    <div>
      <Dialog open={open} setOpen={setOpen}>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
    
    </DialogHeader>
    <form>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>

                <input
                  type="text"
                  id="name"
                //   value={input.fullname}
                  name="name"
                //   onChange={changeEventHandler}
                  className="col-span-3 border border-gray-300 rounded-md p-2"
                />
            </div>
        </div>
    </form>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default EditProfileModal
