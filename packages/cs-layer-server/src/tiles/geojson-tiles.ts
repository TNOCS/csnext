// import geojsonvt from 'geojson-vt';
// import { LayerSource } from '../classes';


// export interface IGeojsonVTOptions {
//     /** max zoom to preserve detail on; can't be higher than 24 */
//     maxZoom?: number;
//     /** simplification tolerance (higher means simpler) */
//     tolerance?: number;
//     /** tile extent (both width and height) - this needs to match the value that is used in vt2geojson.ts */
//     extent?: number;
//     /** tile buffer on each side */
//     buffer?: number;
//     /** logging level (0 to disable, 1 or 2) */
//     debug?: 0 | 1 | 2;
//     /** max zoom in the initial tile index?: if indexMaxZoom === maxZoom, and indexMaxPoints === 0, pre-generate all tiles */
//     indexMaxZoom?: number;
//     /** max number of points per tile in the index */
//     indexMaxPoints?: number;
//     /** whether to include solid tile children in the index */
//     solidChildren?: boolean;
//   }
  
//   /**
//    * Create a tile index using geojson-vt
//    *
//    * @param {string} filename
//    * @returns
//    */
//   export const createTileIndex = async (geoJSON: LayerSource, options?: IGeojsonVTOptions) => {
    
    
//     return geojsonvt(geoJSON, Object.assign({
//       /** max zoom to preserve detail on; can't be higher than 24 */
//       maxZoom: 20,
//       /** simplification tolerance (higher means simpler) */
//       tolerance: 3,
//       /** tile extent (both width and height) - this needs to match the value that is used in vt2geojson.ts */
//       extent: 4096,
//       /** tile buffer on each side */
//       buffer: 64,
//       /** logging level (0 to disable, 1 or 2) */
//       debug: 0,
//       /** max zoom in the initial tile index: if indexMaxZoom === maxZoom, and indexMaxPoints === 0, pre-generate all tiles */
//       indexMaxZoom: 4,
//       /** max number of points per tile in the index */
//       indexMaxPoints: 100000,
//       /** whether to include solid tile children in the index */
//       solidChildren: false
//     }, options));
//   };