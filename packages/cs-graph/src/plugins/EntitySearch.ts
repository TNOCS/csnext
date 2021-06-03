import { TextEntity } from '@csnext/cs-data';
import { IntelDocument } from '../classes/document/intel-document';
import { DocDatasource } from '../datasources/doc-datasource';
import { CacheRequest } from '../utils/cache-requests';
import { IIntelPlugin, IIntelPluginResult } from './intel-plugin';


export class EntitySearch implements IIntelPlugin
{
    public id = 'EntitySearch';
    public title = 'Entity Search';
    public description = this.title;
    public options = {
        url: 'http://localhost:5002'
    };

    public callDocument(doc: IntelDocument, source: DocDatasource): Promise<IIntelPluginResult>
    {
        return new Promise((resolve, reject) =>
        {
            let search = source.searchEntities?.filter(se => !JSON.stringify(se).includes('?'));
            let search2 = [
                {
                    "entity": "small arm",
                    "ent_class": "WEAPONS",
                    "id": "Q1058629",
                    "aka": ["personal firearm", "small arms"]
                },
                {
                    "entity": "rifle",
                    "ent_class": "WEAPONS",
                    "id": "Q124072",
                    "aka": ["infantry firearm"]
                },
                {
                    "entity": "machine gun",
                    "ent_class": "WEAPONS",
                    "id": "Q12800",
                    "aka": ["machinegun"]
                },
                {
                    "entity": "pistol",
                    "ent_class": "WEAPONS",
                    "id": "Q1907525",
                    "aka": []
                },
                {
                    "entity": "hand grenade",
                    "ent_class": "WEAPONS",
                    "id": "Q173517",
                    "aka": ["grenade"]
                },
                {
                    "entity": "improvised explosive device",
                    "ent_class": "WEAPONS",
                    "id": "Q1249453",
                    "aka": ["IED", "Improvised Explosive Device", "homemade bomb"]
                },
                {
                    "entity": "man-portable air-defense system",
                    "ent_class": "WEAPONS",
                    "id": "Q1465101",
                    "aka": ["MANPADS", "MANPADS", "MPADS"]
                },
                {
                    "entity": "man portable",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "air defense",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "rocket",
                    "ent_class": "WEAPONS",
                    "id": "Q41291",
                    "aka": []
                },
                {
                    "entity": "grenade launcher ",
                    "ent_class": "WEAPONS",
                    "id": "Q184613",
                    "aka": []
                },
                {
                    "entity": "rocket launcher",
                    "ent_class": "WEAPONS",
                    "id": "Q3216918",
                    "aka": []
                },
                {
                    "entity": "launcher",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "surface-to-air missile",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": ["surface-to-air", "SAM", "air defense missile", "ground-to-air missile", "ground to air missile", "surface to air missile", "GTAM"]
                },
                {
                    "entity": "rocket-propelled grenade",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": ["RPG", "anti-tank rocket launcher", "antitank rocket launcher", "ATRL", "disposable recoilless anti-tank weapon", "rocket-propelled grenades"]
                },
                {
                    "entity": "sa-7",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "sa-14",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "stinger",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "landmine",
                    "ent_class": "WEAPONS",
                    "id": "Q178795",
                    "aka": ["mine"]
                },
                {
                    "entity": "cwied",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "rcied",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "ppied",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "svbied",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "ambush",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "attack",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "aa",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "aaa",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "dshk",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "12.7",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "14.5",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "7.62",
                    "ent_class": "WEAPONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "suicide bomber",
                    "ent_class": "WEAPONS",
                    "id": "Q25553823",
                    "aka": []
                },
                {
                    "entity": "explosive belt",
                    "ent_class": "WEAPONS",
                    "id": "Q388553",
                    "aka": ["suicide belt", "suicide vest", "explosive vest"]
                },
                {
                    "entity": "shooting",
                    "ent_class": "WEAPONS",
                    "id": "Q2252077",
                    "aka": []
                },
                {
                    "entity": "armed groups",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "taliban",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "jihadists",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "fighters",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "opposing militant forces",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "militants",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "fighting age male",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "fam",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "afghan national army",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "afghan national security forces",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "afghan national police",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "ana",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "ansf",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "anp",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "spotter",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "local support",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "local natives",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "local nationals",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "ln",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "leader",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "leadership",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "shura",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "kia",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "wia",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "killed in action",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "wounded in action",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "killed",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "wounded",
                    "ent_class": "FACTORS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "weapons",
                    "ent_class": "MATERIAL",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "ammunition",
                    "ent_class": "MATERIAL",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "logistics",
                    "ent_class": "MATERIAL",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "vehicles",
                    "ent_class": "MATERIAL",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "gear",
                    "ent_class": "MATERIAL",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "armament ",
                    "ent_class": "MATERIAL",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "equipment",
                    "ent_class": "MATERIAL",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "storage",
                    "ent_class": "MATERIAL",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "baracks",
                    "ent_class": "MATERIAL",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "crossing",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "bridge",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "choke point",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "valley",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "green zone",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "village",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "mosque",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "religious building",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "stronghold",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "area",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "no-go zone",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "patrol",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                },
                {
                    "entity": "patrol area",
                    "ent_class": "LOCATIONS",
                    "id": "None",
                    "aka": []
                }
            ];
            console.log(search);
            console.log(JSON.stringify(search));

            const entities = [...doc.entities!.map(e => {delete e._node; return e; } ) ]


            CacheRequest.Post(this.options.url, { text: doc.originalText, entities_dtb: search, prerecognized_entities: entities }, { 'Content-Type': 'application/json' }).then(d =>
            {
                // Axios.post(this.options.url, { text: doc.originalText, entities_dtb: source.searchEntities, prerecognized_entities: doc.entities }, { headers: { 'Content-Type': 'application/json' } }).then(d => {                
                doc.entities = d as TextEntity[];
                for (const ent of doc.entities)
                {
                    if (source.graph && ent.id && ent.id !== 'None' && source.graph.hasOwnProperty(ent.id))
                    {
                        ent._node = source.graph[ent.id];
                        ent.node_id = ent._node.id;
                    }
                }
                resolve({ document: doc });
            }).catch(e =>
            {
                resolve({ error: JSON.stringify(e) });
            });
        });
    }

}
