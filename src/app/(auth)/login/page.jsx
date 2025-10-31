// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function LoginPage() {
//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <Card className="w-full max-w-sm ">
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//           <CardAction>
//             <Button variant="link">Sign Up</Button>
//           </CardAction>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="flex flex-col gap-6">
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <div className="flex items-center">
//                   <Label htmlFor="password">Password</Label>
//                   <a
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input id="password" type="password" required />
//               </div>
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex-col gap-2">
//           <Button type="submit" className="w-full">
//             Login
//           </Button>
//           <Button variant="outline" className="w-full">
//             Login with Google
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push("/");
    });
  }, [router, supabase]);

  return (
    <div className="flex min-h-screen items-center justify-center p-24 bg-gradient-to-br from-orange-50 to-yellow-100">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center text-gem-gold">
          Desert Drift Gems
        </h1>
        <Auth
          supabaseClient={supabase}
          providers={["google", "email"]}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      </div>
    </div>
  );
}
