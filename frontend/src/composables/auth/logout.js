import { useRouter } from "vue-router";

export function useLogout() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("token");

    router.push("/login");
  }

  return { logout };
}
