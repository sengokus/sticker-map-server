import type { User } from "@supabase/supabase-js";

declare global {
    namespace Express {
        export interface Request {
            reqBody?: any | null | undefined;
            isUserNewlyActivated?: boolean | null | undefined;
            fileHash?: string | null | undefined;
            user?: User;
        }
    }
}
