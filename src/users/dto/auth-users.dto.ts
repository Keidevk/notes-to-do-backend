/* eslint-disable prettier/prettier */
// import { ObjectId } from "mongoose";

import { Types } from "mongoose";
export class HandleLoginRequest {
    readonly email: string;
    readonly password: string;
    }
export class HandleAuthResponse {
    readonly httpCode: number;
    readonly message: string;
    readonly user_id: Types.ObjectId;
    readonly token: string | null;
    readonly user_name: string | null;
} 