import { ref } from "vue";

export function useAuth() {
  const alert = ref(false);
  const alertMessage = ref("");
  const alertType = ref(null);
  const loading = ref(false);

  async function login(data) {
    loading.value = true;

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alertMessage.value = errorData.message || "Erro ao fazer login.";
        alertType.value = "error";
        alert.value = true;
        return null;
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);

      alertMessage.value = "Login realizado com sucesso!";
      alertType.value = "success";
      alert.value = true;

      return result;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alertMessage.value = "Erro ao conectar ao servidor.";
      alertType.value = "error";
      alert.value = true;
      return null;
    } finally {
      loading.value = false;
    }
  }

  return {
    alert,
    alertMessage,
    alertType,
    loading,
    login,
  };
}
