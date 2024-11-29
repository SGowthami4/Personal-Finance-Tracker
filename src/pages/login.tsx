import { Input } from "@/components/ui/input";
import { Lock, UserRound } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

function LabelDemo() {
  return (
    <div className="bg-[url('/bg4.jpg')] bg-no-repeat bg-cover h-screen w-screen flex items-center justify-center">
      <div className="absolute p-4 rounded-md flex flex-col gap-10 shadow-sm shadow-cyan-100  border-[3px_rgba(100,100,100,.5)] backdrop-brightness-110  bg-[rgba(255,255,255,.1)] w-[80%]  sm:w-4/6  md:w-1/2 lg:w-1/3 ">
        <h1 className="text-center font-semibold text-white text-2xl">Login</h1>
        <div className="flex border-none   text-xl text-gray-400 rounded-2xl items-center  gap-2 w-5/6 flex-1 relative m-2">
          <Input
            required
            type="email"
            placeholder="Username"
            className="rounded-2xl absolute shadow-sm shadow-cyan-200 border-cyan-200"
          />
          <UserRound className=" border-none text-gray-100 font-thin size-5 mr-2 absolute right-1 " />
        </div>
        <div className="flex border-none   text-xl text-gray-400 rounded-2xl items-center  gap-2 w-5/6 flex-1 relative m-2">
          <Input
            required
            type="password"
            placeholder="Password"
            className="rounded-2xl absolute shadow-sm shadow-cyan-200 border-cyan-200"
          />
          <Lock className=" border-none text-gray-100 font-thin size-5 mr-2 absolute right-1" />
        </div>
        <div className="flex justify-between mx-4 w-5/6 items-center">
          <div className="flex space-x-2 justify-start items-center">
            <Checkbox id="terms" className="border-cyan-200" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-cyan-50"
            >
              Remember Me
            </label>
          </div>
          <div className="flex justify-end mx-2 text-cyan-50 text-sm items-center font-medium">
            <a href="#">Forgot Password</a>
          </div>
        </div>
        <div className="flex justify-center w-5/6">
          <Button className="w-2/3 rounded-2xl bg-transparent border border-cyan-200 shadow-sm shadow-cyan-100 ">
            <a href="/dashboard">Login</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <LabelDemo />;
}
