import Axios from 'axios';

export class CacheRequest {

    public static generateHash(text: string) {
        var hash = 0, i, chr;
        if (text.length === 0) return hash;
        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    public static Post( url: string, body: any, headers: any, cache = true) : Promise<any>
    {
        return new Promise((resolve, reject) => {
            const hash = url + '-' + CacheRequest.generateHash(JSON.stringify(body));            
            const local = localStorage.getItem(hash);
            if (local && cache) {
                resolve(JSON.parse(local))                
            } else {
                $cs.loader.addLoader(hash);
                Axios.post(url, body, { headers: headers }).then(d => {
                    localStorage.setItem(hash, JSON.stringify(d.data));
                    resolve(d.data);         
                }).catch(e => {
                    reject(e);                
                }).finally(()=>{
                    $cs.loader.removeLoader(hash);
                });
            }
        })

    }
    
}