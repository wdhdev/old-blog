declare global {
    namespace NodeJS {
        interface ProcessEnv {
            database: string;
            from_email: string;
            from_name: string;
            port: number;
            sendgrid_api_key: string;
            sentry_dsn: string;
        }
    }
}

export {};
