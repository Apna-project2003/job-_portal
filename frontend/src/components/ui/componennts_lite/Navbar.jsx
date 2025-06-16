// import React from 'react';
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
// import { Button } from '@/components/ui/button'; // adjust path as needed
// import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

// const Navbar = () => {
//   return (
//     <div className="bg-white">
//       <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
//         <div>
//           <h1 className="text-2xl font-bold">
//             Job <span className="text-[#022bf8]">Portal</span>
//           </h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <ul className="flex font-medium items-center gap-6">
//             <li>Home</li>
//             <li>Browse</li>
//             <li>Job</li>
//           </ul>
//           <Popover>
//             <PopoverTrigger asChild>
//              <Avatar className="cursor-pointer">

//                 {/* yaha par image set karna hai  */}
//                 <AvatarImage src="https://gitup.com/shadcn.png" alt="@shadcn" />
//                 <AvatarFallback>CN</AvatarFallback>
//              </Avatar>
//             </PopoverTrigger>

            
//             <PopoverContent className="bg-white p-4 rounded-md shadow-md border w-64">
//                 <div>   <Avatar className="cursor-pointer">

//                 {/* yaha par image set karna hai  */}
//                 <AvatarImage src="https://gitup.com/shadcn.png" alt="@shadcn" />
//                 <AvatarFallback>CN</AvatarFallback>
//              </Avatar>
// <div>
//     <h3 className="font-medium">Aryan Gupta</h3>
//     <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta minima aliquam mollitia repudiandae nihil molestiae voluptas autem alias! Temporibus necessitatibus fugiat laboriosam fuga accusantium repellendus illo consequatur, hic consequuntur amet? Debitis molestiae ea quasi.</p>
// </div>

// <div className="flex gap-4">
//   <a href="/profile" className="text-[#022bf8] text-sm hover:underline">
//   View Profile
// </a>

// </div>
//               <h3 className="font-medium">Aryan Gupta</h3> 
              
//               </div>
                 
//             </PopoverContent>
//           </Popover>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { LogOut, User2 } from 'lucide-react';
import { Button } from '../button';
const Navbar = () => {
    const user = true;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#022bf8]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex font-medium items-center gap-6">
            <li>Home</li>
            <li>Browse</li>
            <li>Job</li>
          </ul>
          { !user ? (
            <div className="flex items-center gap-2">
              <Button 
  variant="outline" 
  className="border-red-500 text-red-500 hover:bg-red-100 hover:border-red-700 hover:text-red-700 font-semibold py-2 px-4 rounded-md transition-colors duration-300"
>
  Login
</Button>
               <Button 
  className="bg-green-600 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
>
  Register
</Button>
                </div>
          ):(
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                {/* yaha par image set karna hai */}
                <AvatarImage src="https://gitup.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="bg-white p-4 rounded-md shadow-md border w-64 space-y-4">
              <Avatar>
                <AvatarImage src="https://gitup.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-medium">Aryan Gupta</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta minima aliquam mollitia repudiandae nihil molestiae voluptas autem alias!
                </p>
              </div>
<div className="flex flex-col text-gray-600 gap-4">
     <div className="flex w-fit  items-center gap-2 cursor-pointer">
        <User2 className="w-4 h-4" />
                <a href="/profile" className="text-[#022bf8] text-sm hover:underline">
                  Profile
                </a>

                
                <div className="flex w-fit  items-center gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    <a href="/logout" className="text-[#022bf8] text-sm hover:underline">
                  Logout
                </a>
                </div>
                 
              </div>
</div>
             
            </PopoverContent>
          </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
