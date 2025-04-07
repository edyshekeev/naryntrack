"use client";
import { useLogin } from "@/hooks/queries/useLogin";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import LoginForm from "@/components/LoginForm";



export default function LoginPage() {
  return (
    <LoginForm ></LoginForm>
  );
}
