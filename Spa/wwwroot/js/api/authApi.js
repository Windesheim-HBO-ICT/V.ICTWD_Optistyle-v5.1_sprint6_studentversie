export async function login(email, password) {
    const response = await fetch("/api/auth/login?useCookies=true&useSessionCookies=true", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include", // no same-origin, because Identity usually use a 302 redirect. This may cause strange behaviour (such as a 401 when the user is actually authenticated)
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        let message = "Inloggen mislukt.";
        try {
            const problem = await response.json();
            if (problem && problem.title) {
                message = problem.title;
            }
        } catch {
        }
        throw new Error(message);
    }

    // Notify SPA that user is now authenticated
    window.dispatchEvent(
        new CustomEvent("auth-changed", { detail: { isAuthenticated: true } })
    );
}

export async function isAuthenticated() {
    const response = await fetch("/api/auth/status", {
        method: "GET",
        credentials: "include"
    });

    return response.status === 200;
}

export async function logout() {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Logout failed with status " + response.status);
    }

    // Notify SPA that user is now unauthenticated
    window.dispatchEvent(
        new CustomEvent("auth-changed", { detail: { isAuthenticated: false } })
    );
}