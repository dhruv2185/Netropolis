
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
    const data = await res.json();
    if (!res.ok) {
        return {
            error: {
                message: "Please enter valid credentials",
                statusCode: res.status
            }
        }
    }

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
    const data = await res.json();
    if (!res.ok) {
        return {
            error: {
                message: "Failed to login. Please try again later.",
                statusCode: res.status
            }
        }
    }

    return data;
}

export const signUpRequest = async (userInfo) => {
    // console.log("userInfo", userInfo);
    const res = await fetch(`${baseUrl}/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
    const data = await res.json();
    if (!res.ok) {
        return {
            error: {
                message: data.message
            }
        }
    }

    return data;
}




