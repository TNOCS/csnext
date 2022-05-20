
export class RelationType
{
    public type?: string;
    public multiple?: boolean;
    public objectType?: string;
    public subjectType?: string;
}

export type RelationCollection = RelationType[];
