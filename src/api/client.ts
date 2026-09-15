export async function request(url, options = {}) {
    const response = await fetch(`${url}`, {
        ...options,
        headers: {
            Accept: 'application/json',
            ...options.headers,
        },
    })

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
    }

    return response.json()
}