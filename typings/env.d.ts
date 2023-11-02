declare global {
    namespace NodeJS {
        interface ProcessEnv {
            database: string;
            from_email: string;
            from_name: string;
            sendgrid_api_key: string;
            sentry_dsn: string;
        }
    }
}

export {};
