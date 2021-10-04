
export class Link {    
    public direction?: string;
    public to?: string;
    public from?: string;
    public type?: string;
    public properties?: any;
    public limit?: number;    

    


    public isValid() {
        return (this.direction && this.to && this.from && this.type);
    }

    public static fromParam(from: string, to: string, classId: string, properties: any) {
        let l = new Link();
        l.to = to;
        l.from = from;
        l.type = classId;
        l.properties = properties;
        l.direction = 'to';
        return l;
    }

    public static fromRequest(req?: any, id?: string) : Link | undefined {        
        if (!req) { return; }
        const l = new Link();   
        
        // console.log(req);
        
        l.direction = req.query.linkDirection as string || undefined;
        switch(l.direction) {
            case 'to':
                l.from = id;
                l.to = req.query.linkId as string || undefined;
                break;
            case 'from':
                l.from = req.query.linkId as string || undefined;
                l.to = id;
        }        
        l.type = req.query.linkType as string || undefined;
        return l;
    }

}