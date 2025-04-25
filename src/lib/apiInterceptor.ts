export function setupInterceptors() {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
        const [input, init] = args;
        const response = await originalFetch(input, init);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en la solicitud");
        }

        return response;
    };
}