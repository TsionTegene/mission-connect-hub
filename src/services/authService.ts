import { api } from "./api";

// export const loginAdmin = async (email: string, password: string) => {
//   try {
//     //const { data } = await api.post("/api/admin/login", { email, password });
//     const response = await api.post("/api/admin/login", { email, password });
//     const data = response.data;
//     if (!data?.token) throw new Error("No token in response");

//     const payloadBase64 = data.token.split(".")[1];
//     const decodedPayload = JSON.parse(atob(payloadBase64));
//     const role = decodedPayload.role || "unknown";

//     localStorage.setItem("adminToken", data.token);
//     localStorage.setItem("adminRole", role);

//     if (data.admin && data.admin.email) {
//       localStorage.setItem("adminUser", JSON.stringify(data.admin));
//     } else {
//       console.warn("No admin user returned in login response");
//     }

//     return { ...data, role };
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

export const loginAdmin = async (email: string, password: string) => {
  try {
    const  data  = await api.post("/api/admin/login", { email, password });
    if (!data ) {
      throw new Error("No token in response");
    }

    const payloadBase64 = data.token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const role = decodedPayload.role || "unknown";

    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminRole", role);

    if (data.admin && data.admin.email) {
      localStorage.setItem("adminUser", JSON.stringify(data.admin));
    }

    return { ...data, role };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signupAdmin = async (
  email: string,
  username: string,
  password: string,
  inviteCode: string
) => {
  try {
    const { data } = await api.post("/api/admin/signup", {
      email,
      username,
      password,
      invite_code: inviteCode,
    });
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};
