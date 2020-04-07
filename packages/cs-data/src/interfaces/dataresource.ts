// imported  with: https://app.quicktype.io/
import { TableSchema } from './tableschema';

/**
 * Data Resource.
 */
export interface DataResource {
    /**
     * The size of this resource in bytes.
     */
    bytes?: number;
    /**
     * Inline data for this resource.
     */
    data?: any;
    /**
     * A text description. Markdown is encouraged.
     */
    description?: string;
    /**
     * The file encoding of this resource.
     */
    encoding?: string;
    /**
     * The file format of this resource.
     */
    format?: string;
    /**
     * The MD5 hash of this resource. Indicate other hashing algorithms with the
     * {algorithm}:{hash} format.
     */
    hash?: string;
    /**
     * The home on the web that is related to this data package.
     */
    homepage?: string;
    /**
     * The license(s) under which the resource is published.
     */
    licenses?: License[];
    /**
     * The media type of this resource. Can be any valid media type listed with
     * [IANA](https://www.iana.org/assignments/media-types/media-types.xhtml).
     */
    mediatype?: string;
    /**
     * An identifier string. Lower case characters with `.`, `_`, `-` and `/` are allowed.
     */
    name: string;
    /**
     * A reference to the data for this resource, as either a path as a string, or an array of
     * paths as strings. of valid URIs.
     */
    path?: Path;
    /**
     * The profile of this descriptor.
     */
    profile?: string;
    /**
     * A schema for this resource.
     */
    schema?: TableSchema;
    /**
     * The raw sources for this resource.
     */
    sources?: Source[];
    /**
     * A human-readable title.
     */
    title?: string;
}

/**
 * A license for this descriptor.
 */
export interface License {
    /**
     * MUST be an Open Definition license identifier, see http://licenses.opendefinition.org/
     */
    name?: string;
    /**
     * A fully qualified URL, or a POSIX file path..
     */
    path?: string;
    /**
     * A human-readable title.
     */
    title?: string;
}

/**
 * A reference to the data for this resource, as either a path as a string, or an array of
 * paths as strings. of valid URIs.
 */
export type Path = string[] | string;

/**
 * A source file.
 */
export interface Source {
    /**
     * An email address.
     */
    email?: string;
    /**
     * A fully qualified URL, or a POSIX file path..
     */
    path?: string;
    /**
     * A human-readable title.
     */
    title: string;
}
