export class ServerBasicAuthConfig
{
    public enabled?: boolean;
    public challenge: boolean = true;
    public users?: {
        [name: string]: string;
    };
}
