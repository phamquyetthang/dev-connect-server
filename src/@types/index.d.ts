declare namespace Express{
    interface Request{
        user: {
            id: string
        },
        file: any
    }
}