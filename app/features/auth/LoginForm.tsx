import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginFormSchema } from '~/features/auth/schemas/loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { Title } from '~/shared/components/Title';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/shared/components/ui/form';
import { Input } from '~/shared/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '~/shared/components/ui/checkbox';
import { Button } from '~/shared/components/ui/button';
import travelImage from '~/assets/images/travelImage.jpg';
import { useLoginMutation } from '~/features/auth/__generated__/Login';
import { toast } from '~/hooks/use-toast';
import { useAuth } from '~/shared/providers/auth-provider';

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginMutation, { loading: logInLoading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login.token) {
        login(data.login.token);
        toast({
          title: 'Welcome! 🎉',
          description: 'Login successfull',
        });
        navigate('/tours');
      }
    },
    onError: () => {
      toast({
        title: 'Something went wrong 😞',
        description: 'Error while logging in',
        variant: 'destructive',
      });
    },
  });

  type Inputs = z.infer<typeof loginFormSchema>;

  const defaultValues = {
    email: '',
    password: '',
  };

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const { formState } = loginForm;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await loginMutation({
      variables: {
        input: data,
      },
    });
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPasswordIsVisible(!passwordIsVisible);
  };

  return (
    <div className="flex h-[100dvh]">
      <div className="w-full max-w-[425px] md:w-[50%] flex justify-center items-center mx-auto">
        <div className="w-full p-6 border border-slate-300 shadow-md rounded-md md:border-0 md:shadow-none">
          <Title type="h2" className="pb-2">
            Sign In
          </Title>
          <span className="text-sm text-slate-500">
            Enter Login and Password to Sign In
          </span>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter Password"
                          {...field}
                          type={passwordIsVisible ? 'text' : 'password'}
                        />
                        <button
                          className="absolute right-[13px] bottom-[6px]"
                          onClick={(e) => togglePasswordVisibility(e)}
                        >
                          {passwordIsVisible ? (
                            <Eye className="text-slate-500 cursor-pointer" />
                          ) : (
                            <EyeOff className=" text-slate-500 cursor-pointer" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={!formState.isValid || logInLoading}
              >
                Войти
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="w-[50%] relative hidden md:block">
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            src={travelImage}
            alt="Responsive"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[14px] items-center">
          <Title type="h2" className="font-michroma text-white">
            CMS
          </Title>
        </div>
      </div>
    </div>
  );
}
