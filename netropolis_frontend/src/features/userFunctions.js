
const baseUrl = import.meta.env.VITE_BASE_BACKEND_URL;
// Login with username and password
export const loginRequest = async (userData) => {
    const res = await fetch(`${baseUrl}/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    if (!res.ok) {
        return {
            error: {
                message: res.message
            }
        }
    }
    const data = await res.json();
    return data;
}

// Fetching user profile from own backend
export const fetchUserProfile = async (tokens) => {
    const res = await fetch(`${baseUrl}/fetch_user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokens.access}`,
        },
    });
    if (!res.ok) {
        return {
            error: {
                message: res.message
            }
        }
    }
    const data = await res.json();
    return data;
}

export const signUpRequest = async (userInfo) => {
    console.log("userInfo", userInfo);
    const res = await fetch(`${baseUrl}/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
    if (!res.ok) {
        return {
            error: {
                message: res.message
            }
        }
    }
    const data = await res.json();
    return data;
}




