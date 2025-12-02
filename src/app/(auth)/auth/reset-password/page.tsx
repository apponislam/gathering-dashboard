import ResetPassword_Form from "@/components/forms/ResetPassword_Form";
import Image from "next/image";

const page = () => {
    return (
        <div className="min-h-screen flex">
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <ResetPassword_Form />
            </div>
            <div className="hidden md:block md:w-1/2 relative">
                <Image src="/authImage.svg" alt="Login Background" fill className="object-cover" priority />
            </div>
        </div>
    );
};

export default page;
