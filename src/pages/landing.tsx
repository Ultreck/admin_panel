import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaPills, FaSpinner } from "react-icons/fa";
import { loginWithGoogle } from "../firebase/config";

export default function Landing() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <FaPills className="mx-auto text-primary text-4xl mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Pharmacy Course Admin</h2>
          <p className="mt-2 text-gray-600">Sign in to manage course content</p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <Button 
                onClick={() => {
                    loginWithGoogle();
                  setIsLoggingIn(true);
                }}
                className="w-full"
                size="lg"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in to Dashboard"
                )}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                <p>Secure access to pharmacy course management</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
